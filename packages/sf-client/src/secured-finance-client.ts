import {
    Currency,
    Ether,
    Token,
    getUTCMonthYear,
} from '@secured-finance/sf-core';
import {
    Hex,
    PublicClient,
    WalletClient,
    getContract,
    hexToString,
    maxInt256,
    stringToHex,
} from 'viem';
import { ERC20Abi } from './ERC20Abi';
import {
    currencyControllerDevContract,
    currencyControllerStgContract,
    lendingMarketControllerDevContract,
    lendingMarketControllerStgContract,
    lendingMarketReaderDevContract,
    lendingMarketReaderStgContract,
    tokenFaucetDevContract,
    tokenFaucetStgContract,
    tokenVaultDevContract,
    tokenVaultStgContract,
} from './contracts-instance';
import { SecuredFinanceClientConfig } from './entities';
import {
    CHAINS,
    Network,
    NetworkName,
    getContractEnvironment,
    networkNames,
} from './utils';

export interface PayableOverrides {
    value?: bigint;
    gas?: bigint;
}

export enum OrderSide {
    LEND = 0,
    BORROW = 1,
}

export enum WalletSource {
    METAMASK = 'Metamask',
    SF_VAULT = 'SF Vault',
}

const CLIENT_NOT_INITIALIZED = 'Client is not initialized';

function assertNonNullish<TValue>(
    value: TValue | undefined,
    message = CLIENT_NOT_INITIALIZED
): asserts value is NonNullable<TValue> {
    if (!value) {
        throw new Error(message);
    }
}

// TODO: get those from the contracts
const ITAYOSE_PERIOD = 60 * 60; // 1 hour
const PRE_ORDER_PERIOD = 60 * 60 * 24 * 7; // 7 days

export class SecuredFinanceClient {
    private convertCurrencyToBytes32(ccy: Currency) {
        if (ccy.isNative) {
            return stringToHex(ccy.symbol, { size: 32 });
        } else {
            return stringToHex(ccy.wrapped.symbol, { size: 32 });
        }
    }

    private convertCurrencyArrayToBytes32Array(currencies: Currency[]) {
        return currencies.map(currency =>
            this.convertCurrencyToBytes32(currency)
        );
    }

    private parseBytes32String(ccy: string) {
        return hexToString(ccy as Hex, { size: 32 });
    }

    private calculateAdjustedGas(amount: bigint) {
        // NOTE: This adjustment is for the function that executes the collateral coverage check.
        // Without this adjustment, the transaction often fails due to out-of-gas error.
        return BigInt(Math.round(Number(amount) * 1.1));
    }

    private _config: SecuredFinanceClientConfig | null = null;

    async init(
        network: Network,
        publicClient: PublicClient,
        walletClient?: WalletClient,
        options?: {
            defaultGas?: number;
            defaultGasPrice?: number;
        }
    ) {
        const networkName = network.name as NetworkName;
        const env = getContractEnvironment(networkName) || 'production';
        let walletAddress: Hex | undefined = undefined;
        if (walletClient) {
            const [address] = await walletClient.getAddresses();
            walletAddress = address;
        }

        if (!networkNames.includes(networkName)) {
            throw new Error(`${networkName} is not supported.`);
        }

        this._config = {
            defaultGas: options?.defaultGas || 6000000,
            defaultGasPrice: options?.defaultGasPrice || 1000000000000,
            networkId: network.chainId,
            network: networkName,
            env: env,
            publicClient: publicClient,
            walletClient: walletClient,
            chain: CHAINS[network.chainId],
            walletAddress: walletAddress,
        };
    }

    get config() {
        assertNonNullish(this._config);
        return this._config;
    }

    async getCollateralParameters() {
        assertNonNullish(this.config);
        let result: readonly [bigint, bigint, bigint];
        if (this.config.env === 'development') {
            result = await this.config.publicClient.readContract({
                ...tokenVaultDevContract,
                functionName: 'getLiquidationConfiguration',
            });
        } else {
            result = await this.config.publicClient.readContract({
                ...tokenVaultStgContract,
                functionName: 'getLiquidationConfiguration',
            });
        }

        return {
            liquidationThresholdRate: result[0],
            liquidationProtocolFeeRate: result[1],
            liquidatorFeeRate: result[2],
        };
    }

    async getOrderEstimation(
        ccy: Currency,
        maturity: number,
        account: string,
        side: OrderSide,
        amount: bigint,
        unitPrice: number,
        additionalDepositAmount = BigInt(0),
        ignoreBorrowedAmount = false
    ) {
        assertNonNullish(this.config);
        const args = {
            ccy: this.convertCurrencyToBytes32(ccy),
            maturity: BigInt(maturity),
            user: account as Hex,
            side,
            amount,
            unitPrice: BigInt(unitPrice),
            additionalDepositAmount,
            ignoreBorrowedAmount,
        };
        if (this.config.env === 'development') {
            return this.config.publicClient.readContract({
                ...lendingMarketControllerDevContract,
                functionName: 'getOrderEstimation',
                args: [args],
            });
        } else {
            return this.config.publicClient.readContract({
                ...lendingMarketControllerStgContract,
                functionName: 'getOrderEstimation',
                args: [args],
            });
        }
    }

    async getWithdrawableCollateral(ccy: Currency, account: string) {
        assertNonNullish(this.config);
        if (this.config.env === 'development') {
            return this.config.publicClient.readContract({
                ...tokenVaultDevContract,
                functionName: 'getWithdrawableCollateral',
                args: [this.convertCurrencyToBytes32(ccy), account as Hex],
            });
        } else {
            return this.config.publicClient.readContract({
                ...tokenVaultStgContract,
                functionName: 'getWithdrawableCollateral',
                args: [this.convertCurrencyToBytes32(ccy), account as Hex],
            });
        }
    }

    async depositCollateral(
        ccy: Currency,
        amount: bigint,
        onApproved?: (isApproved: boolean) => Promise<void> | void
    ) {
        assertNonNullish(this.config);
        assertNonNullish(this.config.walletClient);
        assertNonNullish(this.config.walletAddress);

        const isApproved = await this.approveTokenTransfer(ccy, amount);
        await onApproved?.(isApproved);

        const payableOverride: PayableOverrides = ccy.equals(
            Ether.onChain(this.config.networkId)
        )
            ? { value: amount }
            : {};

        if (this.config.env === 'development') {
            return this.config.walletClient.writeContract({
                ...tokenVaultDevContract,
                account: this.config.walletAddress,
                chain: this.config.chain,
                functionName: 'deposit',
                args: [this.convertCurrencyToBytes32(ccy), amount],
                ...payableOverride,
            });
        } else {
            return this.config.walletClient.writeContract({
                ...tokenVaultStgContract,
                account: this.config.walletAddress,
                chain: this.config.chain,
                functionName: 'deposit',
                args: [this.convertCurrencyToBytes32(ccy), amount],
                ...payableOverride,
            });
        }
    }

    async withdrawCollateral(ccy: Currency, amount: bigint) {
        assertNonNullish(this.config);
        assertNonNullish(this.config.walletClient);
        assertNonNullish(this.config.walletAddress);

        if (this.config.env === 'development') {
            const estimatedGas =
                await this.config.publicClient.estimateContractGas({
                    ...tokenVaultDevContract,
                    account: this.config.walletAddress,
                    functionName: 'withdraw',
                    args: [this.convertCurrencyToBytes32(ccy), amount],
                });
            return this.config.walletClient.writeContract({
                ...tokenVaultDevContract,
                account: this.config.walletAddress,
                chain: this.config.chain,
                functionName: 'withdraw',
                args: [this.convertCurrencyToBytes32(ccy), amount],
                gas: this.calculateAdjustedGas(estimatedGas),
            });
        } else {
            const estimatedGas =
                await this.config.publicClient.estimateContractGas({
                    ...tokenVaultStgContract,
                    account: this.config.walletAddress,
                    functionName: 'withdraw',
                    args: [this.convertCurrencyToBytes32(ccy), amount],
                });
            return this.config.walletClient.writeContract({
                ...tokenVaultStgContract,
                account: this.config.walletAddress,
                chain: this.config.chain,
                functionName: 'withdraw',
                args: [this.convertCurrencyToBytes32(ccy), amount],
                gas: this.calculateAdjustedGas(estimatedGas),
            });
        }
    }

    async getBestLendUnitPrices(ccy: Currency) {
        assertNonNullish(this.config);
        if (this.config.env === 'development') {
            return this.config.publicClient.readContract({
                ...lendingMarketReaderDevContract,
                functionName: 'getBestLendUnitPrices',
                args: [this.convertCurrencyToBytes32(ccy)],
            });
        } else {
            return this.config.publicClient.readContract({
                ...lendingMarketReaderStgContract,
                functionName: 'getBestLendUnitPrices',
                args: [this.convertCurrencyToBytes32(ccy)],
            });
        }
    }

    async getBestBorrowUnitPrices(ccy: Currency) {
        assertNonNullish(this.config);
        if (this.config.env === 'development') {
            return this.config.publicClient.readContract({
                ...lendingMarketReaderDevContract,
                functionName: 'getBestBorrowUnitPrices',
                args: [this.convertCurrencyToBytes32(ccy)],
            });
        } else {
            return this.config.publicClient.readContract({
                ...lendingMarketReaderStgContract,
                functionName: 'getBestBorrowUnitPrices',
                args: [this.convertCurrencyToBytes32(ccy)],
            });
        }
    }

    async getMaturities(ccy: Currency) {
        assertNonNullish(this.config);
        if (this.config.env === 'development') {
            return this.config.publicClient.readContract({
                ...lendingMarketControllerDevContract,
                functionName: 'getMaturities',
                args: [this.convertCurrencyToBytes32(ccy)],
            });
        } else {
            return this.config.publicClient.readContract({
                ...lendingMarketControllerStgContract,
                functionName: 'getMaturities',
                args: [this.convertCurrencyToBytes32(ccy)],
            });
        }
    }

    async getOrderBookDetail(ccy: Currency, maturity: number) {
        assertNonNullish(this.config);
        if (this.config.env === 'development') {
            return this.config.publicClient.readContract({
                ...lendingMarketReaderDevContract,
                functionName: 'getOrderBookDetail',
                args: [this.convertCurrencyToBytes32(ccy), BigInt(maturity)],
            });
        } else {
            return this.config.publicClient.readContract({
                ...lendingMarketReaderStgContract,
                functionName: 'getOrderBookDetail',
                args: [this.convertCurrencyToBytes32(ccy), BigInt(maturity)],
            });
        }
    }

    async getOrderBookDetailsPerCurrency(ccy: Currency) {
        return this.getOrderBookDetails([ccy]);
    }

    async getOrderBookDetails(ccys: Currency[]) {
        assertNonNullish(this.config);
        let orderBookDetails;
        if (this.config.env === 'development') {
            orderBookDetails = await this.config.publicClient.readContract({
                ...lendingMarketReaderDevContract,
                functionName: 'getOrderBookDetails',
                args: [this.convertCurrencyArrayToBytes32Array(ccys)],
            });
        } else {
            orderBookDetails = await this.config.publicClient.readContract({
                ...lendingMarketReaderStgContract,
                functionName: 'getOrderBookDetails',
                args: [this.convertCurrencyArrayToBytes32Array(ccys)],
            });
        }

        const timestamp = Math.floor(Date.now() / 1000);
        return orderBookDetails.map(orderBook => {
            const maturity = Number(orderBook.maturity);
            const openingDate = Number(orderBook.openingDate);
            const isReady = orderBook.isReady;
            const isMatured = timestamp >= maturity;
            const isOpened = isReady && !isMatured && timestamp >= openingDate;

            return {
                ...orderBook,
                name: getUTCMonthYear(maturity),
                isMatured,
                isOpened,
                isItayosePeriod:
                    !isReady && timestamp >= openingDate - ITAYOSE_PERIOD,
                isPreOrderPeriod:
                    timestamp >= openingDate - PRE_ORDER_PERIOD &&
                    timestamp < openingDate - ITAYOSE_PERIOD,
            };
        });
    }

    // /**
    //  *
    //  * @param ccy the Currency object of the selected market
    //  * @param maturity the maturity of the selected market
    //  * @param side Order position type, 0 for lend, 1 for borrow
    //  * @param amount Amount of funds the maker wants to borrow/lend
    //  * @param unitPrice Unit price the taker is willing to pay/receive. 0 for placing a market order
    //  * @param onApproved callback function to be called after the approval transaction is mined
    //  * @returns a `ContractTransaction`
    //  */
    // async placeOrder(
    //     ccy: Currency,
    //     maturity: number,
    //     side: OrderSide,
    //     amount: bigint,
    //     sourceWallet: WalletSource,
    //     unitPrice?: number,
    //     onApproved?: (isApproved: boolean) => Promise<void> | void
    // ) {
    //     assertNonNullish(this.config);
    //     assertNonNullish(this.config.walletClient);
    //     assertNonNullish(this.config.walletAddress);

    //     if (side === OrderSide.LEND && sourceWallet === WalletSource.METAMASK) {
    //         const overrides: PayableOverrides = {};

    //         if (ccy.equals(Ether.onChain(this.config.networkId))) {
    //             overrides.value = amount;
    //         } else {
    //             const isApproved = await this.approveTokenTransfer(ccy, amount);
    //             await onApproved?.(isApproved);
    //         }

    //         if (this.config.env === 'development') {
    //             const estimatedGas =
    //                 await this.config.publicClient.estimateContractGas({
    //                     ...lendingMarketControllerDevContract,
    //                     account: this.config.walletAddress,
    //                     functionName: 'depositAndExecuteOrder',
    //                     args: [
    //                         this.convertCurrencyToBytes32(ccy),
    //                         BigInt(maturity),
    //                         side,
    //                         amount,
    //                         BigInt(unitPrice ?? 0),
    //                     ],
    //                     ...overrides,
    //                 });
    //             overrides.gas = this.calculateAdjustedGas(estimatedGas);
    //             return this.config.walletClient.writeContract({
    //                 ...lendingMarketControllerDevContract,
    //                 account: this.config.walletAddress,
    //                 chain: this.config.chain,
    //                 functionName: 'depositAndExecuteOrder',
    //                 args: [
    //                     this.convertCurrencyToBytes32(ccy),
    //                     BigInt(maturity),
    //                     side,
    //                     amount,
    //                     BigInt(unitPrice ?? 0),
    //                 ],
    //                 ...overrides,
    //             });
    //         } else {
    //             const estimatedGas =
    //                 await this.config.publicClient.estimateContractGas({
    //                     ...tokenVaultStgContract,
    //                     account: this.config.walletAddress,
    //                     functionName: 'withdraw',
    //                     args: [this.convertCurrencyToBytes32(ccy), amount],
    //                 });
    //             return this.config.walletClient.writeContract({
    //                 ...tokenVaultStgContract,
    //                 account: this.config.walletAddress,
    //                 chain: this.config.chain,
    //                 functionName: 'withdraw',
    //                 args: [this.convertCurrencyToBytes32(ccy), amount],
    //                 gas: this.calculateAdjustedGas(estimatedGas),
    //             });
    //         }

    //         const estimatedGas =
    //             await this.lendingMarketController.contract.estimateGas.depositAndExecuteOrder(
    //                 this.convertCurrencyToBytes32(ccy),
    //                 maturity,
    //                 side,
    //                 amount,
    //                 unitPrice ?? 0,
    //                 overrides
    //             );

    //         overrides.gasLimit = this.calculateAdjustedGas(estimatedGas);

    //         return this.lendingMarketController.contract.depositAndExecuteOrder(
    //             this.convertCurrencyToBytes32(ccy),
    //             maturity,
    //             side,
    //             amount,
    //             unitPrice ?? 0,
    //             overrides
    //         );
    //     } else {
    //         const estimatedGas =
    //             await this.lendingMarketController.contract.estimateGas.executeOrder(
    //                 this.convertCurrencyToBytes32(ccy),
    //                 maturity,
    //                 side,
    //                 amount,
    //                 unitPrice ?? 0
    //             );

    //         return this.lendingMarketController.contract.executeOrder(
    //             this.convertCurrencyToBytes32(ccy),
    //             maturity,
    //             side,
    //             amount,
    //             unitPrice ?? 0,
    //             {
    //                 gasLimit: this.calculateAdjustedGas(estimatedGas),
    //             }
    //         );
    //     }
    // }

    // async placePreOrder(
    //     ccy: Currency,
    //     maturity: number,
    //     side: OrderSide,
    //     amount: number | BigNumber,
    //     sourceWallet: WalletSource,
    //     unitPrice: number,
    //     onApproved?: (isApproved: boolean) => Promise<void> | void
    // ) {
    //     assertNonNullish(this.lendingMarketController);

    //     if (side === OrderSide.LEND && sourceWallet === WalletSource.METAMASK) {
    //         const overrides: PayableOverrides = {};

    //         if (ccy.equals(Ether.onChain(this.config.networkId))) {
    //             overrides.value = amount;
    //         } else {
    //             const isApproved = await this.approveTokenTransfer(ccy, amount);
    //             await onApproved?.(isApproved);
    //         }

    //         const estimatedGas =
    //             await this.lendingMarketController.contract.estimateGas.depositAndExecutesPreOrder(
    //                 this.convertCurrencyToBytes32(ccy),
    //                 maturity,
    //                 side,
    //                 amount,
    //                 unitPrice,
    //                 overrides
    //             );

    //         overrides.gasLimit = this.calculateAdjustedGas(estimatedGas);

    //         return this.lendingMarketController.contract.depositAndExecutesPreOrder(
    //             this.convertCurrencyToBytes32(ccy),
    //             maturity,
    //             side,
    //             amount,
    //             unitPrice,
    //             overrides
    //         );
    //     } else {
    //         const estimatedGas =
    //             await this.lendingMarketController.contract.estimateGas.executePreOrder(
    //                 this.convertCurrencyToBytes32(ccy),
    //                 maturity,
    //                 side,
    //                 amount,
    //                 unitPrice
    //             );

    //         return this.lendingMarketController.contract.executePreOrder(
    //             this.convertCurrencyToBytes32(ccy),
    //             maturity,
    //             side,
    //             amount,
    //             unitPrice,
    //             {
    //                 gasLimit: this.calculateAdjustedGas(estimatedGas),
    //             }
    //         );
    //     }
    // }

    async cancelLendingOrder(ccy: Currency, maturity: number, orderID: number) {
        assertNonNullish(this.config);
        assertNonNullish(this.config.walletClient);
        assertNonNullish(this.config.walletAddress);

        if (this.config.env === 'development') {
            return this.config.walletClient.writeContract({
                ...lendingMarketControllerDevContract,
                account: this.config.walletAddress,
                chain: this.config.chain,
                functionName: 'cancelOrder',
                args: [
                    this.convertCurrencyToBytes32(ccy),
                    BigInt(maturity),
                    orderID,
                ],
            });
        } else {
            return this.config.walletClient.writeContract({
                ...lendingMarketControllerStgContract,
                account: this.config.walletAddress,
                chain: this.config.chain,
                functionName: 'cancelOrder',
                args: [
                    this.convertCurrencyToBytes32(ccy),
                    BigInt(maturity),
                    orderID,
                ],
            });
        }
    }

    async convertToBaseCurrency(ccy: Currency, amount: bigint) {
        assertNonNullish(this.config);
        if (this.config.env === 'development') {
            return this.config.publicClient.readContract({
                ...currencyControllerDevContract,
                functionName: 'convertToBaseCurrency',
                args: [this.convertCurrencyToBytes32(ccy), amount],
            });
        } else {
            return this.config.publicClient.readContract({
                ...currencyControllerStgContract,
                functionName: 'convertToBaseCurrency',
                args: [this.convertCurrencyToBytes32(ccy), amount],
            });
        }
    }

    async getUsedCurrencies(account: string) {
        assertNonNullish(this.config);
        if (this.config.env === 'development') {
            return this.config.publicClient.readContract({
                ...tokenVaultDevContract,
                functionName: 'getUsedCurrencies',
                args: [account as Hex],
            });
        } else {
            return this.config.publicClient.readContract({
                ...tokenVaultStgContract,
                functionName: 'getUsedCurrencies',
                args: [account as Hex],
            });
        }
    }

    async getTokenAllowance(token: Token, owner: string) {
        assertNonNullish(this.config);
        const tokenContract = await this.getTokenContract(token);
        const spender =
            this.config.env === 'development'
                ? tokenVaultDevContract.address
                : tokenVaultStgContract.address;
        return tokenContract.read.allowance([owner as Hex, spender]);
    }

    async getBorrowOrderBook(
        currency: Currency,
        maturity: number,
        limit: number
    ) {
        assertNonNullish(this.config);
        if (this.config.env === 'development') {
            return this.config.publicClient.readContract({
                ...lendingMarketReaderDevContract,
                functionName: 'getBorrowOrderBook',
                args: [
                    this.convertCurrencyToBytes32(currency),
                    BigInt(maturity),
                    BigInt(limit),
                ],
            });
        } else {
            return this.config.publicClient.readContract({
                ...lendingMarketReaderStgContract,
                functionName: 'getBorrowOrderBook',
                args: [
                    this.convertCurrencyToBytes32(currency),
                    BigInt(maturity),
                    BigInt(limit),
                ],
            });
        }
    }

    async getLendOrderBook(
        currency: Currency,
        maturity: number,
        limit: number
    ) {
        assertNonNullish(this.config);
        if (this.config.env === 'development') {
            return this.config.publicClient.readContract({
                ...lendingMarketReaderDevContract,
                functionName: 'getLendOrderBook',
                args: [
                    this.convertCurrencyToBytes32(currency),
                    BigInt(maturity),
                    BigInt(limit),
                ],
            });
        } else {
            return this.config.publicClient.readContract({
                ...lendingMarketReaderStgContract,
                functionName: 'getLendOrderBook',
                args: [
                    this.convertCurrencyToBytes32(currency),
                    BigInt(maturity),
                    BigInt(limit),
                ],
            });
        }
    }

    // Mock ERC20 token related functions
    async mintERC20Token(token: Token) {
        assertNonNullish(this.config);
        assertNonNullish(this.config.walletClient);
        assertNonNullish(this.config.walletAddress);

        if (this.config.env === 'development') {
            return this.config.walletClient.writeContract({
                ...tokenFaucetDevContract,
                account: this.config.walletAddress,
                chain: this.config.chain,
                functionName: 'mint',
                args: [this.convertCurrencyToBytes32(token)],
            });
        } else {
            return this.config.walletClient.writeContract({
                ...tokenFaucetDevContract,
                account: this.config.walletAddress,
                chain: this.config.chain,
                functionName: 'mint',
                args: [this.convertCurrencyToBytes32(token)],
            });
        }
    }

    async getERC20TokenContractAddress(token: Token) {
        assertNonNullish(this.config);
        if (this.config.env === 'development') {
            return this.config.publicClient.readContract({
                ...tokenFaucetDevContract,
                functionName: 'getCurrencyAddress',
                args: [this.convertCurrencyToBytes32(token)],
            });
        } else {
            return this.config.publicClient.readContract({
                ...tokenFaucetStgContract,
                functionName: 'getCurrencyAddress',
                args: [this.convertCurrencyToBytes32(token)],
            });
        }
    }

    async getCurrencies() {
        assertNonNullish(this.config);
        if (this.config.env === 'development') {
            return this.config.publicClient.readContract({
                ...currencyControllerDevContract,
                functionName: 'getCurrencies',
            });
        } else {
            return this.config.publicClient.readContract({
                ...currencyControllerStgContract,
                functionName: 'getCurrencies',
            });
        }
    }

    async currencyExists(ccy: Currency) {
        assertNonNullish(this.config);
        if (this.config.env === 'development') {
            return this.config.publicClient.readContract({
                ...currencyControllerDevContract,
                functionName: 'currencyExists',
                args: [this.convertCurrencyToBytes32(ccy)],
            });
        } else {
            return this.config.publicClient.readContract({
                ...currencyControllerStgContract,
                functionName: 'currencyExists',
                args: [this.convertCurrencyToBytes32(ccy)],
            });
        }
    }

    async getCollateralCurrencies() {
        assertNonNullish(this.config);
        if (this.config.env === 'development') {
            return this.config.publicClient.readContract({
                ...tokenVaultDevContract,
                functionName: 'getCollateralCurrencies',
            });
        } else {
            return this.config.publicClient.readContract({
                ...tokenVaultStgContract,
                functionName: 'getCollateralCurrencies',
            });
        }
    }

    async getERC20Balance(token: Token, account: string) {
        assertNonNullish(this.config);
        const tokenContract = await this.getTokenContract(token);
        return tokenContract.read.balanceOf([account as Hex]);
    }

    async getCollateralBook(account: string) {
        assertNonNullish(this.config);
        const currencies = await this.getUsedCurrencies(account);
        let collateral: Record<string, bigint> = {};

        if (currencies && currencies.length) {
            await Promise.all(
                currencies.map(async ccy => {
                    if (this.config.env === 'development') {
                        const balance =
                            await this.config.publicClient.readContract({
                                ...tokenVaultDevContract,
                                functionName: 'getDepositAmount',
                                args: [account as Hex, ccy],
                            });
                        collateral = {
                            ...collateral,
                            [this.parseBytes32String(ccy)]: balance,
                        };
                    } else {
                        const balance =
                            await this.config.publicClient.readContract({
                                ...tokenVaultDevContract,
                                functionName: 'getDepositAmount',
                                args: [account as Hex, ccy],
                            });
                        collateral = {
                            ...collateral,
                            [this.parseBytes32String(ccy)]: balance,
                        };
                    }
                })
            );
        }

        const collateralCoverage = await this.getCoverage(account);

        return {
            collateral,
            collateralCoverage,
        };
    }

    async getCoverage(account: string) {
        assertNonNullish(this.config);
        if (this.config.env === 'development') {
            return this.config.publicClient.readContract({
                ...tokenVaultDevContract,
                functionName: 'getCoverage',
                args: [account as Hex],
            });
        } else {
            return this.config.publicClient.readContract({
                ...tokenVaultStgContract,
                functionName: 'getCoverage',
                args: [account as Hex],
            });
        }
    }

    private async approveTokenTransfer(ccy: Currency, amount: bigint) {
        assertNonNullish(this.config);
        if (!this.config.walletClient) {
            throw new Error('WalletClient is not set');
        }
        assertNonNullish(this.config.walletAddress);

        if (ccy.isToken) {
            const tokenContract = await this.getTokenContract(ccy);
            const owner = this.config.walletAddress;
            const spender =
                this.config.env === 'development'
                    ? tokenVaultDevContract.address
                    : tokenVaultStgContract.address;
            const allowance = await tokenContract.read.allowance([
                owner,
                spender,
            ]);

            if (allowance <= amount) {
                const tx = await tokenContract.write.approve(
                    [spender, maxInt256 - amount],
                    {
                        account: owner,
                        chain: this.config.chain,
                    }
                );
                await this.config.publicClient.waitForTransactionReceipt({
                    hash: tx,
                });
                return true;
            }
        }
        return false;
    }

    private async getTokenContract(token: Token) {
        return getContract({
            abi: ERC20Abi,
            address: token.address as Hex,
            publicClient: this.config.publicClient,
            walletClient: this.config.walletClient,
        });
    }

    async getTotalDepositAmount(currency: Currency) {
        assertNonNullish(this.config);
        if (this.config.env === 'development') {
            return this.config.publicClient.readContract({
                ...tokenVaultDevContract,
                functionName: 'getTotalDepositAmount',
                args: [this.convertCurrencyToBytes32(currency)],
            });
        } else {
            return this.config.publicClient.readContract({
                ...tokenVaultStgContract,
                functionName: 'getTotalDepositAmount',
                args: [this.convertCurrencyToBytes32(currency)],
            });
        }
    }

    async getProtocolDepositAmount() {
        assertNonNullish(this.config);
        const currencyList = await this.getCurrencies();
        let totalDepositAmounts;

        if (this.config.env === 'development') {
            totalDepositAmounts = await Promise.allSettled(
                currencyList.map(currency =>
                    this.config.publicClient.readContract({
                        ...tokenVaultDevContract,
                        functionName: 'getTotalDepositAmount',
                        args: [currency],
                    })
                )
            );
        } else {
            totalDepositAmounts = await Promise.allSettled(
                currencyList.map(currency =>
                    this.config.publicClient.readContract({
                        ...tokenVaultStgContract,
                        functionName: 'getTotalDepositAmount',
                        args: [currency],
                    })
                )
            );
        }

        return totalDepositAmounts.reduce((acc, cur, index) => {
            if (cur.status === 'fulfilled') {
                if (cur.value) {
                    acc[this.parseBytes32String(currencyList[index])] =
                        cur.value;
                }
            }
            return acc;
        }, {} as Record<string, bigint>);
    }

    async unwindPosition(currency: Currency, maturity: number) {
        assertNonNullish(this.config);
        assertNonNullish(this.config.walletClient);
        assertNonNullish(this.config.walletAddress);

        if (this.config.env === 'development') {
            const estimatedGas =
                await this.config.publicClient.estimateContractGas({
                    ...lendingMarketControllerDevContract,
                    account: this.config.walletAddress,
                    functionName: 'unwindPosition',
                    args: [
                        this.convertCurrencyToBytes32(currency),
                        BigInt(maturity),
                    ],
                });

            return this.config.walletClient.writeContract({
                ...lendingMarketControllerDevContract,
                account: this.config.walletAddress,
                chain: this.config.chain,
                functionName: 'unwindPosition',
                args: [
                    this.convertCurrencyToBytes32(currency),
                    BigInt(maturity),
                ],
                gas: this.calculateAdjustedGas(estimatedGas),
            });
        } else {
            const estimatedGas =
                await this.config.publicClient.estimateContractGas({
                    ...lendingMarketControllerStgContract,
                    account: this.config.walletAddress,
                    functionName: 'unwindPosition',
                    args: [
                        this.convertCurrencyToBytes32(currency),
                        BigInt(maturity),
                    ],
                });

            return this.config.walletClient.writeContract({
                ...lendingMarketControllerStgContract,
                account: this.config.walletAddress,
                chain: this.config.chain,
                functionName: 'unwindPosition',
                args: [
                    this.convertCurrencyToBytes32(currency),
                    BigInt(maturity),
                ],
                gas: this.calculateAdjustedGas(estimatedGas),
            });
        }
    }

    async executeRepayment(currency: Currency, maturity: number) {
        assertNonNullish(this.config);
        assertNonNullish(this.config.walletClient);
        assertNonNullish(this.config.walletAddress);

        if (this.config.env === 'development') {
            return this.config.walletClient.writeContract({
                ...lendingMarketControllerDevContract,
                account: this.config.walletAddress,
                chain: this.config.chain,
                functionName: 'executeRepayment',
                args: [
                    this.convertCurrencyToBytes32(currency),
                    BigInt(maturity),
                ],
            });
        } else {
            return this.config.walletClient.writeContract({
                ...lendingMarketControllerDevContract,
                account: this.config.walletAddress,
                chain: this.config.chain,
                functionName: 'executeRepayment',
                args: [
                    this.convertCurrencyToBytes32(currency),
                    BigInt(maturity),
                ],
            });
        }
    }

    async executeRedemption(currency: Currency, maturity: number) {
        assertNonNullish(this.config);
        assertNonNullish(this.config.walletClient);
        assertNonNullish(this.config.walletAddress);

        if (this.config.env === 'development') {
            return this.config.walletClient.writeContract({
                ...lendingMarketControllerDevContract,
                account: this.config.walletAddress,
                chain: this.config.chain,
                functionName: 'executeRedemption',
                args: [
                    this.convertCurrencyToBytes32(currency),
                    BigInt(maturity),
                ],
            });
        } else {
            return this.config.walletClient.writeContract({
                ...lendingMarketControllerDevContract,
                account: this.config.walletAddress,
                chain: this.config.chain,
                functionName: 'executeRedemption',
                args: [
                    this.convertCurrencyToBytes32(currency),
                    BigInt(maturity),
                ],
            });
        }
    }

    async getOrderFeeRate(currency: Currency) {
        assertNonNullish(this.config);
        if (this.config.env === 'development') {
            return this.config.publicClient.readContract({
                ...lendingMarketControllerDevContract,
                functionName: 'getOrderFeeRate',
                args: [this.convertCurrencyToBytes32(currency)],
            });
        } else {
            return this.config.publicClient.readContract({
                ...lendingMarketControllerStgContract,
                functionName: 'getOrderFeeRate',
                args: [this.convertCurrencyToBytes32(currency)],
            });
        }
    }

    async getOrderBookId(currency: Currency, maturity: number) {
        assertNonNullish(this.config);
        if (this.config.env === 'development') {
            return this.config.publicClient.readContract({
                ...lendingMarketControllerDevContract,
                functionName: 'getOrderBookId',
                args: [
                    this.convertCurrencyToBytes32(currency),
                    BigInt(maturity),
                ],
            });
        } else {
            return this.config.publicClient.readContract({
                ...lendingMarketControllerStgContract,
                functionName: 'getOrderBookId',
                args: [
                    this.convertCurrencyToBytes32(currency),
                    BigInt(maturity),
                ],
            });
        }
    }

    async getOrderList(account: string, usedCurrenciesForOrders: Currency[]) {
        assertNonNullish(this.config);
        let res;
        if (this.config.env === 'development') {
            res = await this.config.publicClient.readContract({
                ...lendingMarketReaderDevContract,
                functionName: 'getOrders',
                args: [
                    this.convertCurrencyArrayToBytes32Array(
                        usedCurrenciesForOrders
                    ),
                    account as Hex,
                ],
            });
        } else {
            res = await this.config.publicClient.readContract({
                ...lendingMarketReaderStgContract,
                functionName: 'getOrders',
                args: [
                    this.convertCurrencyArrayToBytes32Array(
                        usedCurrenciesForOrders
                    ),
                    account as Hex,
                ],
            });
        }

        return { activeOrders: res[0], inactiveOrders: res[1] };
    }

    async getPositions(account: string, usedCurrenciesForOrders: Currency[]) {
        assertNonNullish(this.config);
        if (this.config.env === 'development') {
            return this.config.publicClient.readContract({
                ...lendingMarketReaderDevContract,
                functionName: 'getPositions',
                args: [
                    this.convertCurrencyArrayToBytes32Array(
                        usedCurrenciesForOrders
                    ),
                    account as Hex,
                ],
            });
        } else {
            return this.config.publicClient.readContract({
                ...lendingMarketReaderStgContract,
                functionName: 'getPositions',
                args: [
                    this.convertCurrencyArrayToBytes32Array(
                        usedCurrenciesForOrders
                    ),
                    account as Hex,
                ],
            });
        }
    }

    async getUsedCurrenciesForOrders(account: string) {
        assertNonNullish(this.config);
        if (this.config.env === 'development') {
            return this.config.publicClient.readContract({
                ...lendingMarketControllerDevContract,
                functionName: 'getUsedCurrencies',
                args: [account as Hex],
            });
        } else {
            return this.config.publicClient.readContract({
                ...lendingMarketControllerStgContract,
                functionName: 'getUsedCurrencies',
                args: [account as Hex],
            });
        }
    }

    async executeLiquidationCall(
        collateralCcy: Currency,
        debtCcy: Currency,
        debtMaturity: number,
        account: string
    ) {
        assertNonNullish(this.config);
        assertNonNullish(this.config.walletClient);
        assertNonNullish(this.config.walletAddress);

        if (this.config.env === 'development') {
            return this.config.walletClient.writeContract({
                ...lendingMarketControllerDevContract,
                account: this.config.walletAddress,
                chain: this.config.chain,
                functionName: 'executeLiquidationCall',
                args: [
                    this.convertCurrencyToBytes32(collateralCcy),
                    this.convertCurrencyToBytes32(debtCcy),
                    BigInt(debtMaturity),
                    account as Hex,
                ],
            });
        } else {
            return this.config.walletClient.writeContract({
                ...lendingMarketControllerStgContract,
                account: this.config.walletAddress,
                chain: this.config.chain,
                functionName: 'executeLiquidationCall',
                args: [
                    this.convertCurrencyToBytes32(collateralCcy),
                    this.convertCurrencyToBytes32(debtCcy),
                    BigInt(debtMaturity),
                    account as Hex,
                ],
            });
        }
    }

    async getLastPrice(currency: Currency) {
        assertNonNullish(this.config);
        if (this.config.env === 'development') {
            return this.config.publicClient.readContract({
                ...currencyControllerDevContract,
                functionName: 'getLastPrice',
                args: [this.convertCurrencyToBytes32(currency)],
            });
        } else {
            return this.config.publicClient.readContract({
                ...currencyControllerStgContract,
                functionName: 'getLastPrice',
                args: [this.convertCurrencyToBytes32(currency)],
            });
        }
    }

    async getTotalCollateralAmount(account: string) {
        assertNonNullish(this.config);
        if (this.config.env === 'development') {
            return this.config.publicClient.readContract({
                ...tokenVaultDevContract,
                functionName: 'getTotalCollateralAmount',
                args: [account as Hex],
            });
        } else {
            return this.config.publicClient.readContract({
                ...tokenVaultStgContract,
                functionName: 'getTotalCollateralAmount',
                args: [account as Hex],
            });
        }
    }
}
