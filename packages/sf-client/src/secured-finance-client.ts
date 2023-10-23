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
} from './contracts';
import { SecuredFinanceClientConfig } from './entities';
import {
    CHAINS,
    NETWORKS,
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

// TODO: get those from the contracts
export const ITAYOSE_PERIOD = 60 * 60; // 1 hour in seconds
export const PRE_ORDER_PERIOD = 60 * 60 * 24 * 7; // 7 days in seconds

const CLIENT_NOT_INITIALIZED = 'Client is not initialized';

function assertNonNullish<TValue>(
    value: TValue | undefined,
    message = CLIENT_NOT_INITIALIZED
): asserts value is NonNullable<TValue> {
    if (!value) {
        throw new Error(message);
    }
}

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
        return (amount * 11n) / 10n;
    }

    private _config: SecuredFinanceClientConfig | undefined;
    private _walletClient: WalletClient | undefined;
    private _publicClient: PublicClient | undefined;

    async init(
        publicClient: PublicClient,
        walletClient?: WalletClient,
        options?: {
            defaultGas?: number;
            defaultGasPrice?: number;
        }
    ) {
        const chainId = await publicClient.getChainId();
        const networkName = NETWORKS[chainId] as NetworkName;

        if (!networkNames.includes(networkName)) {
            throw new Error(`${networkName} is not supported.`);
        }

        const env = getContractEnvironment(networkName) || 'production';

        this._config = {
            defaultGas: options?.defaultGas || 6000000,
            defaultGasPrice: options?.defaultGasPrice || 1000000000000,
            networkId: chainId,
            network: networkName,
            env: env,
            chain: CHAINS[chainId],
        };

        this._walletClient = walletClient;
        this._publicClient = publicClient;
    }

    get config() {
        assertNonNullish(this._config);
        return this._config;
    }

    get publicClient() {
        assertNonNullish(this._publicClient);
        return this._publicClient;
    }

    get walletClient() {
        assertNonNullish(this._walletClient);
        return this._walletClient;
    }

    async getCollateralParameters() {
        let result: readonly [bigint, bigint, bigint];
        if (this.config.env === 'development') {
            result = await this.publicClient.readContract({
                ...tokenVaultDevContract,
                functionName: 'getLiquidationConfiguration',
            });
        } else {
            result = await this.publicClient.readContract({
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
        additionalDepositAmount = 0n,
        ignoreBorrowedAmount = false
    ) {
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
            return this.publicClient.readContract({
                ...lendingMarketControllerDevContract,
                functionName: 'getOrderEstimation',
                args: [args],
            });
        } else {
            return this.publicClient.readContract({
                ...lendingMarketControllerStgContract,
                functionName: 'getOrderEstimation',
                args: [args],
            });
        }
    }

    async getWithdrawableCollateral(ccy: Currency, account: string) {
        if (this.config.env === 'development') {
            return this.publicClient.readContract({
                ...tokenVaultDevContract,
                functionName: 'getWithdrawableCollateral',
                args: [this.convertCurrencyToBytes32(ccy), account as Hex],
            });
        } else {
            return this.publicClient.readContract({
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
        const [address] = await this.walletClient.getAddresses();
        const isApproved = await this.approveTokenTransfer(ccy, amount);
        await onApproved?.(isApproved);

        const payableOverride: PayableOverrides = ccy.equals(
            Ether.onChain(this.config.networkId)
        )
            ? { value: amount }
            : {};

        if (this.config.env === 'development') {
            return this.walletClient.writeContract({
                ...tokenVaultDevContract,
                account: address,
                chain: this.config.chain,
                functionName: 'deposit',
                args: [this.convertCurrencyToBytes32(ccy), amount],
                ...payableOverride,
            });
        } else {
            return this.walletClient.writeContract({
                ...tokenVaultStgContract,
                account: address,
                chain: this.config.chain,
                functionName: 'deposit',
                args: [this.convertCurrencyToBytes32(ccy), amount],
                ...payableOverride,
            });
        }
    }

    async withdrawCollateral(ccy: Currency, amount: bigint) {
        const [address] = await this.walletClient.getAddresses();

        if (this.config.env === 'development') {
            const estimatedGas = await this.publicClient.estimateContractGas({
                ...tokenVaultDevContract,
                account: address,
                functionName: 'withdraw',
                args: [this.convertCurrencyToBytes32(ccy), amount],
            });
            return this.walletClient.writeContract({
                ...tokenVaultDevContract,
                account: address,
                chain: this.config.chain,
                functionName: 'withdraw',
                args: [this.convertCurrencyToBytes32(ccy), amount],
                gas: this.calculateAdjustedGas(estimatedGas),
            });
        } else {
            const estimatedGas = await this.publicClient.estimateContractGas({
                ...tokenVaultStgContract,
                account: address,
                functionName: 'withdraw',
                args: [this.convertCurrencyToBytes32(ccy), amount],
            });
            return this.walletClient.writeContract({
                ...tokenVaultStgContract,
                account: address,
                chain: this.config.chain,
                functionName: 'withdraw',
                args: [this.convertCurrencyToBytes32(ccy), amount],
                gas: this.calculateAdjustedGas(estimatedGas),
            });
        }
    }

    async getBestLendUnitPrices(ccy: Currency) {
        if (this.config.env === 'development') {
            return this.publicClient.readContract({
                ...lendingMarketReaderDevContract,
                functionName: 'getBestLendUnitPrices',
                args: [this.convertCurrencyToBytes32(ccy)],
            });
        } else {
            return this.publicClient.readContract({
                ...lendingMarketReaderStgContract,
                functionName: 'getBestLendUnitPrices',
                args: [this.convertCurrencyToBytes32(ccy)],
            });
        }
    }

    async getBestBorrowUnitPrices(ccy: Currency) {
        if (this.config.env === 'development') {
            return this.publicClient.readContract({
                ...lendingMarketReaderDevContract,
                functionName: 'getBestBorrowUnitPrices',
                args: [this.convertCurrencyToBytes32(ccy)],
            });
        } else {
            return this.publicClient.readContract({
                ...lendingMarketReaderStgContract,
                functionName: 'getBestBorrowUnitPrices',
                args: [this.convertCurrencyToBytes32(ccy)],
            });
        }
    }

    async getMaturities(ccy: Currency) {
        if (this.config.env === 'development') {
            return this.publicClient.readContract({
                ...lendingMarketControllerDevContract,
                functionName: 'getMaturities',
                args: [this.convertCurrencyToBytes32(ccy)],
            });
        } else {
            return this.publicClient.readContract({
                ...lendingMarketControllerStgContract,
                functionName: 'getMaturities',
                args: [this.convertCurrencyToBytes32(ccy)],
            });
        }
    }

    async getOrderBookDetail(ccy: Currency, maturity: number) {
        if (this.config.env === 'development') {
            return this.publicClient.readContract({
                ...lendingMarketReaderDevContract,
                functionName: 'getOrderBookDetail',
                args: [this.convertCurrencyToBytes32(ccy), BigInt(maturity)],
            });
        } else {
            return this.publicClient.readContract({
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
        let orderBookDetails;
        if (this.config.env === 'development') {
            orderBookDetails = await this.publicClient.readContract({
                ...lendingMarketReaderDevContract,
                functionName: 'getOrderBookDetails',
                args: [this.convertCurrencyArrayToBytes32Array(ccys)],
            });
        } else {
            orderBookDetails = await this.publicClient.readContract({
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

    /**
     *
     * @param ccy the Currency object of the selected market
     * @param maturity the maturity of the selected market
     * @param side Order position type, 0 for lend, 1 for borrow
     * @param amount Amount of funds the maker wants to borrow/lend
     * @param unitPrice Unit price the taker is willing to pay/receive. 0 for placing a market order
     * @param onApproved callback function to be called after the approval transaction is mined
     * @returns a `ContractTransaction`
     */
    async placeOrder(
        ccy: Currency,
        maturity: number,
        side: OrderSide,
        amount: bigint,
        sourceWallet: WalletSource,
        unitPrice?: number,
        onApproved?: (isApproved: boolean) => Promise<void> | void
    ) {
        const [address] = await this.walletClient.getAddresses();

        if (side === OrderSide.LEND && sourceWallet === WalletSource.METAMASK) {
            const overrides: PayableOverrides = {};

            if (ccy.equals(Ether.onChain(this.config.networkId))) {
                overrides.value = amount;
            } else {
                const isApproved = await this.approveTokenTransfer(ccy, amount);
                await onApproved?.(isApproved);
            }

            if (this.config.env === 'development') {
                const estimatedGas =
                    await this.publicClient.estimateContractGas({
                        ...lendingMarketControllerDevContract,
                        account: address,
                        functionName: 'depositAndExecuteOrder',
                        args: [
                            this.convertCurrencyToBytes32(ccy),
                            BigInt(maturity),
                            side,
                            amount,
                            BigInt(unitPrice ?? 0),
                        ],
                        ...overrides,
                    });

                overrides.gas = this.calculateAdjustedGas(estimatedGas);

                return this.walletClient.writeContract({
                    ...lendingMarketControllerDevContract,
                    account: address,
                    chain: this.config.chain,
                    functionName: 'depositAndExecuteOrder',
                    args: [
                        this.convertCurrencyToBytes32(ccy),
                        BigInt(maturity),
                        side,
                        amount,
                        BigInt(unitPrice ?? 0),
                    ],
                    ...overrides,
                });
            } else {
                const estimatedGas =
                    await this.publicClient.estimateContractGas({
                        ...lendingMarketControllerStgContract,
                        account: address,
                        functionName: 'depositAndExecuteOrder',
                        args: [
                            this.convertCurrencyToBytes32(ccy),
                            BigInt(maturity),
                            side,
                            amount,
                            BigInt(unitPrice ?? 0),
                        ],
                        ...overrides,
                    });

                overrides.gas = this.calculateAdjustedGas(estimatedGas);

                return this.walletClient.writeContract({
                    ...lendingMarketControllerStgContract,
                    account: address,
                    chain: this.config.chain,
                    functionName: 'depositAndExecuteOrder',
                    args: [
                        this.convertCurrencyToBytes32(ccy),
                        BigInt(maturity),
                        side,
                        amount,
                        BigInt(unitPrice ?? 0),
                    ],
                    ...overrides,
                });
            }
        } else {
            if (this.config.env === 'development') {
                const estimatedGas =
                    await this.publicClient.estimateContractGas({
                        ...lendingMarketControllerDevContract,
                        account: address,
                        functionName: 'executeOrder',
                        args: [
                            this.convertCurrencyToBytes32(ccy),
                            BigInt(maturity),
                            side,
                            amount,
                            BigInt(unitPrice ?? 0),
                        ],
                    });

                return this.walletClient.writeContract({
                    ...lendingMarketControllerDevContract,
                    account: address,
                    chain: this.config.chain,
                    functionName: 'executeOrder',
                    args: [
                        this.convertCurrencyToBytes32(ccy),
                        BigInt(maturity),
                        side,
                        amount,
                        BigInt(unitPrice ?? 0),
                    ],
                    gas: this.calculateAdjustedGas(estimatedGas),
                });
            } else {
                const estimatedGas =
                    await this.publicClient.estimateContractGas({
                        ...lendingMarketControllerStgContract,
                        account: address,
                        functionName: 'executeOrder',
                        args: [
                            this.convertCurrencyToBytes32(ccy),
                            BigInt(maturity),
                            side,
                            amount,
                            BigInt(unitPrice ?? 0),
                        ],
                    });

                return this.walletClient.writeContract({
                    ...lendingMarketControllerStgContract,
                    account: address,
                    chain: this.config.chain,
                    functionName: 'executeOrder',
                    args: [
                        this.convertCurrencyToBytes32(ccy),
                        BigInt(maturity),
                        side,
                        amount,
                        BigInt(unitPrice ?? 0),
                    ],
                    gas: this.calculateAdjustedGas(estimatedGas),
                });
            }
        }
    }

    async placePreOrder(
        ccy: Currency,
        maturity: number,
        side: OrderSide,
        amount: bigint,
        sourceWallet: WalletSource,
        unitPrice: number,
        onApproved?: (isApproved: boolean) => Promise<void> | void
    ) {
        const [address] = await this.walletClient.getAddresses();

        if (side === OrderSide.LEND && sourceWallet === WalletSource.METAMASK) {
            const overrides: PayableOverrides = {};

            if (ccy.equals(Ether.onChain(this.config.networkId))) {
                overrides.value = amount;
            } else {
                const isApproved = await this.approveTokenTransfer(ccy, amount);
                await onApproved?.(isApproved);
            }

            if (this.config.env === 'development') {
                const estimatedGas =
                    await this.publicClient.estimateContractGas({
                        ...lendingMarketControllerDevContract,
                        account: address,
                        functionName: 'depositAndExecutesPreOrder',
                        args: [
                            this.convertCurrencyToBytes32(ccy),
                            BigInt(maturity),
                            side,
                            amount,
                            BigInt(unitPrice),
                        ],
                        ...overrides,
                    });

                overrides.gas = this.calculateAdjustedGas(estimatedGas);

                return this.walletClient.writeContract({
                    ...lendingMarketControllerDevContract,
                    account: address,
                    chain: this.config.chain,
                    functionName: 'depositAndExecutesPreOrder',
                    args: [
                        this.convertCurrencyToBytes32(ccy),
                        BigInt(maturity),
                        side,
                        amount,
                        BigInt(unitPrice),
                    ],
                    ...overrides,
                });
            } else {
                const estimatedGas =
                    await this.publicClient.estimateContractGas({
                        ...lendingMarketControllerStgContract,
                        account: address,
                        functionName: 'depositAndExecutesPreOrder',
                        args: [
                            this.convertCurrencyToBytes32(ccy),
                            BigInt(maturity),
                            side,
                            amount,
                            BigInt(unitPrice),
                        ],
                        ...overrides,
                    });

                overrides.gas = this.calculateAdjustedGas(estimatedGas);

                return this.walletClient.writeContract({
                    ...lendingMarketControllerStgContract,
                    account: address,
                    chain: this.config.chain,
                    functionName: 'depositAndExecutesPreOrder',
                    args: [
                        this.convertCurrencyToBytes32(ccy),
                        BigInt(maturity),
                        side,
                        amount,
                        BigInt(unitPrice),
                    ],
                    ...overrides,
                });
            }
        } else {
            if (this.config.env === 'development') {
                const estimatedGas =
                    await this.publicClient.estimateContractGas({
                        ...lendingMarketControllerDevContract,
                        account: address,
                        functionName: 'executePreOrder',
                        args: [
                            this.convertCurrencyToBytes32(ccy),
                            BigInt(maturity),
                            side,
                            amount,
                            BigInt(unitPrice),
                        ],
                    });

                return this.walletClient.writeContract({
                    ...lendingMarketControllerDevContract,
                    account: address,
                    chain: this.config.chain,
                    functionName: 'executePreOrder',
                    args: [
                        this.convertCurrencyToBytes32(ccy),
                        BigInt(maturity),
                        side,
                        amount,
                        BigInt(unitPrice),
                    ],
                    gas: this.calculateAdjustedGas(estimatedGas),
                });
            } else {
                const estimatedGas =
                    await this.publicClient.estimateContractGas({
                        ...lendingMarketControllerStgContract,
                        account: address,
                        functionName: 'executePreOrder',
                        args: [
                            this.convertCurrencyToBytes32(ccy),
                            BigInt(maturity),
                            side,
                            amount,
                            BigInt(unitPrice),
                        ],
                    });

                return this.walletClient.writeContract({
                    ...lendingMarketControllerStgContract,
                    account: address,
                    chain: this.config.chain,
                    functionName: 'executePreOrder',
                    args: [
                        this.convertCurrencyToBytes32(ccy),
                        BigInt(maturity),
                        side,
                        amount,
                        BigInt(unitPrice),
                    ],
                    gas: this.calculateAdjustedGas(estimatedGas),
                });
            }
        }
    }

    async cancelLendingOrder(ccy: Currency, maturity: number, orderID: number) {
        const [address] = await this.walletClient.getAddresses();

        if (this.config.env === 'development') {
            return this.walletClient.writeContract({
                ...lendingMarketControllerDevContract,
                account: address,
                chain: this.config.chain,
                functionName: 'cancelOrder',
                args: [
                    this.convertCurrencyToBytes32(ccy),
                    BigInt(maturity),
                    orderID,
                ],
            });
        } else {
            return this.walletClient.writeContract({
                ...lendingMarketControllerStgContract,
                account: address,
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
        if (this.config.env === 'development') {
            return this.publicClient.readContract({
                ...currencyControllerDevContract,
                functionName: 'convertToBaseCurrency',
                args: [this.convertCurrencyToBytes32(ccy), amount],
            });
        } else {
            return this.publicClient.readContract({
                ...currencyControllerStgContract,
                functionName: 'convertToBaseCurrency',
                args: [this.convertCurrencyToBytes32(ccy), amount],
            });
        }
    }

    async getUsedCurrencies(account: string) {
        if (this.config.env === 'development') {
            return this.publicClient.readContract({
                ...tokenVaultDevContract,
                functionName: 'getUsedCurrencies',
                args: [account as Hex],
            });
        } else {
            return this.publicClient.readContract({
                ...tokenVaultStgContract,
                functionName: 'getUsedCurrencies',
                args: [account as Hex],
            });
        }
    }

    async getTokenAllowance(token: Token, owner: string) {
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
        let result: readonly [
            readonly bigint[],
            readonly bigint[],
            readonly bigint[]
        ];
        if (this.config.env === 'development') {
            result = await this.publicClient.readContract({
                ...lendingMarketReaderDevContract,
                functionName: 'getBorrowOrderBook',
                args: [
                    this.convertCurrencyToBytes32(currency),
                    BigInt(maturity),
                    BigInt(limit),
                ],
            });
        } else {
            result = await this.publicClient.readContract({
                ...lendingMarketReaderStgContract,
                functionName: 'getBorrowOrderBook',
                args: [
                    this.convertCurrencyToBytes32(currency),
                    BigInt(maturity),
                    BigInt(limit),
                ],
            });
        }
        return {
            unitPrices: result[0],
            amounts: result[1],
            quantitites: result[2],
        };
    }

    async getLendOrderBook(
        currency: Currency,
        maturity: number,
        limit: number
    ) {
        let result: readonly [
            readonly bigint[],
            readonly bigint[],
            readonly bigint[]
        ];
        if (this.config.env === 'development') {
            result = await this.publicClient.readContract({
                ...lendingMarketReaderDevContract,
                functionName: 'getLendOrderBook',
                args: [
                    this.convertCurrencyToBytes32(currency),
                    BigInt(maturity),
                    BigInt(limit),
                ],
            });
        } else {
            result = await this.publicClient.readContract({
                ...lendingMarketReaderStgContract,
                functionName: 'getLendOrderBook',
                args: [
                    this.convertCurrencyToBytes32(currency),
                    BigInt(maturity),
                    BigInt(limit),
                ],
            });
        }
        return {
            unitPrices: result[0],
            amounts: result[1],
            quantitites: result[2],
        };
    }

    // Mock ERC20 token related functions
    async mintERC20Token(token: Token) {
        const [address] = await this.walletClient.getAddresses();

        if (this.config.env === 'development') {
            return this.walletClient.writeContract({
                ...tokenFaucetDevContract,
                account: address,
                chain: this.config.chain,
                functionName: 'mint',
                args: [this.convertCurrencyToBytes32(token)],
            });
        } else {
            return this.walletClient.writeContract({
                ...tokenFaucetStgContract,
                account: address,
                chain: this.config.chain,
                functionName: 'mint',
                args: [this.convertCurrencyToBytes32(token)],
            });
        }
    }

    async getERC20TokenContractAddress(token: Token) {
        if (this.config.env === 'development') {
            return this.publicClient.readContract({
                ...tokenFaucetDevContract,
                functionName: 'getCurrencyAddress',
                args: [this.convertCurrencyToBytes32(token)],
            });
        } else {
            return this.publicClient.readContract({
                ...tokenFaucetStgContract,
                functionName: 'getCurrencyAddress',
                args: [this.convertCurrencyToBytes32(token)],
            });
        }
    }

    async getCurrencies() {
        if (this.config.env === 'development') {
            return this.publicClient.readContract({
                ...currencyControllerDevContract,
                functionName: 'getCurrencies',
            });
        } else {
            return this.publicClient.readContract({
                ...currencyControllerStgContract,
                functionName: 'getCurrencies',
            });
        }
    }

    async currencyExists(ccy: Currency) {
        if (this.config.env === 'development') {
            return this.publicClient.readContract({
                ...currencyControllerDevContract,
                functionName: 'currencyExists',
                args: [this.convertCurrencyToBytes32(ccy)],
            });
        } else {
            return this.publicClient.readContract({
                ...currencyControllerStgContract,
                functionName: 'currencyExists',
                args: [this.convertCurrencyToBytes32(ccy)],
            });
        }
    }

    async getCollateralCurrencies() {
        if (this.config.env === 'development') {
            return this.publicClient.readContract({
                ...tokenVaultDevContract,
                functionName: 'getCollateralCurrencies',
            });
        } else {
            return this.publicClient.readContract({
                ...tokenVaultStgContract,
                functionName: 'getCollateralCurrencies',
            });
        }
    }

    async getERC20Balance(token: Token, account: string) {
        const tokenContract = await this.getTokenContract(token);
        return tokenContract.read.balanceOf([account as Hex]);
    }

    async getCollateralBook(account: string) {
        const currencies = await this.getUsedCurrencies(account);
        let collateral: Record<string, bigint> = {};

        if (currencies && currencies.length) {
            await Promise.all(
                currencies.map(async ccy => {
                    if (this.config.env === 'development') {
                        const balance = await this.publicClient.readContract({
                            ...tokenVaultDevContract,
                            functionName: 'getDepositAmount',
                            args: [account as Hex, ccy],
                        });
                        collateral = {
                            ...collateral,
                            [this.parseBytes32String(ccy)]: balance,
                        };
                    } else {
                        const balance = await this.publicClient.readContract({
                            ...tokenVaultStgContract,
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
        if (this.config.env === 'development') {
            return this.publicClient.readContract({
                ...tokenVaultDevContract,
                functionName: 'getCoverage',
                args: [account as Hex],
            });
        } else {
            return this.publicClient.readContract({
                ...tokenVaultStgContract,
                functionName: 'getCoverage',
                args: [account as Hex],
            });
        }
    }

    private async approveTokenTransfer(ccy: Currency, amount: bigint) {
        const [address] = await this.walletClient.getAddresses();

        if (ccy.isToken) {
            const tokenContract = await this.getTokenContract(ccy);
            const owner = address;
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
                    [spender, amount],
                    {
                        account: owner,
                        chain: this.config.chain,
                    }
                );
                await this.publicClient.waitForTransactionReceipt({
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
            publicClient: this.publicClient,
            walletClient: this.walletClient,
        });
    }

    async getTotalDepositAmount(currency: Currency) {
        if (this.config.env === 'development') {
            return this.publicClient.readContract({
                ...tokenVaultDevContract,
                functionName: 'getTotalDepositAmount',
                args: [this.convertCurrencyToBytes32(currency)],
            });
        } else {
            return this.publicClient.readContract({
                ...tokenVaultStgContract,
                functionName: 'getTotalDepositAmount',
                args: [this.convertCurrencyToBytes32(currency)],
            });
        }
    }

    async getProtocolDepositAmount() {
        const currencyList = await this.getCurrencies();
        let totalDepositAmounts;

        if (this.config.env === 'development') {
            totalDepositAmounts = await Promise.allSettled(
                currencyList.map(currency =>
                    this.publicClient.readContract({
                        ...tokenVaultDevContract,
                        functionName: 'getTotalDepositAmount',
                        args: [currency],
                    })
                )
            );
        } else {
            totalDepositAmounts = await Promise.allSettled(
                currencyList.map(currency =>
                    this.publicClient.readContract({
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
        const [address] = await this.walletClient.getAddresses();

        if (this.config.env === 'development') {
            const estimatedGas = await this.publicClient.estimateContractGas({
                ...lendingMarketControllerDevContract,
                account: address,
                functionName: 'unwindPosition',
                args: [
                    this.convertCurrencyToBytes32(currency),
                    BigInt(maturity),
                ],
            });

            return this.walletClient.writeContract({
                ...lendingMarketControllerDevContract,
                account: address,
                chain: this.config.chain,
                functionName: 'unwindPosition',
                args: [
                    this.convertCurrencyToBytes32(currency),
                    BigInt(maturity),
                ],
                gas: this.calculateAdjustedGas(estimatedGas),
            });
        } else {
            const estimatedGas = await this.publicClient.estimateContractGas({
                ...lendingMarketControllerStgContract,
                account: address,
                functionName: 'unwindPosition',
                args: [
                    this.convertCurrencyToBytes32(currency),
                    BigInt(maturity),
                ],
            });

            return this.walletClient.writeContract({
                ...lendingMarketControllerStgContract,
                account: address,
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
        const [address] = await this.walletClient.getAddresses();

        if (this.config.env === 'development') {
            return this.walletClient.writeContract({
                ...lendingMarketControllerDevContract,
                account: address,
                chain: this.config.chain,
                functionName: 'executeRepayment',
                args: [
                    this.convertCurrencyToBytes32(currency),
                    BigInt(maturity),
                ],
            });
        } else {
            return this.walletClient.writeContract({
                ...lendingMarketControllerStgContract,
                account: address,
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
        const [address] = await this.walletClient.getAddresses();

        if (this.config.env === 'development') {
            return this.walletClient.writeContract({
                ...lendingMarketControllerDevContract,
                account: address,
                chain: this.config.chain,
                functionName: 'executeRedemption',
                args: [
                    this.convertCurrencyToBytes32(currency),
                    BigInt(maturity),
                ],
            });
        } else {
            return this.walletClient.writeContract({
                ...lendingMarketControllerStgContract,
                account: address,
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
        if (this.config.env === 'development') {
            return this.publicClient.readContract({
                ...lendingMarketControllerDevContract,
                functionName: 'getOrderFeeRate',
                args: [this.convertCurrencyToBytes32(currency)],
            });
        } else {
            return this.publicClient.readContract({
                ...lendingMarketControllerStgContract,
                functionName: 'getOrderFeeRate',
                args: [this.convertCurrencyToBytes32(currency)],
            });
        }
    }

    async getOrderBookId(currency: Currency, maturity: number) {
        if (this.config.env === 'development') {
            return this.publicClient.readContract({
                ...lendingMarketControllerDevContract,
                functionName: 'getOrderBookId',
                args: [
                    this.convertCurrencyToBytes32(currency),
                    BigInt(maturity),
                ],
            });
        } else {
            return this.publicClient.readContract({
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
        let res;
        if (this.config.env === 'development') {
            res = await this.publicClient.readContract({
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
            res = await this.publicClient.readContract({
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
        if (this.config.env === 'development') {
            return this.publicClient.readContract({
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
            return this.publicClient.readContract({
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
        if (this.config.env === 'development') {
            return this.publicClient.readContract({
                ...lendingMarketControllerDevContract,
                functionName: 'getUsedCurrencies',
                args: [account as Hex],
            });
        } else {
            return this.publicClient.readContract({
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
        const [address] = await this.walletClient.getAddresses();

        if (this.config.env === 'development') {
            return this.walletClient.writeContract({
                ...lendingMarketControllerDevContract,
                account: address,
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
            return this.walletClient.writeContract({
                ...lendingMarketControllerStgContract,
                account: address,
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
        if (this.config.env === 'development') {
            return this.publicClient.readContract({
                ...currencyControllerDevContract,
                functionName: 'getLastPrice',
                args: [this.convertCurrencyToBytes32(currency)],
            });
        } else {
            return this.publicClient.readContract({
                ...currencyControllerStgContract,
                functionName: 'getLastPrice',
                args: [this.convertCurrencyToBytes32(currency)],
            });
        }
    }

    async getTotalCollateralAmount(account: string) {
        if (this.config.env === 'development') {
            return this.publicClient.readContract({
                ...tokenVaultDevContract,
                functionName: 'getTotalCollateralAmount',
                args: [account as Hex],
            });
        } else {
            return this.publicClient.readContract({
                ...tokenVaultStgContract,
                functionName: 'getTotalCollateralAmount',
                args: [account as Hex],
            });
        }
    }

    /*
     * Global Emergency Settlement
     */
    async isTerminated() {
        if (this.config.env === 'development') {
            return this.publicClient.readContract({
                ...lendingMarketControllerDevContract,
                functionName: 'isTerminated',
            });
        } else {
            return this.publicClient.readContract({
                ...lendingMarketControllerStgContract,
                functionName: 'isTerminated',
            });
        }
    }

    async getMarketTerminationDate() {
        if (this.config.env === 'development') {
            return this.publicClient.readContract({
                ...lendingMarketControllerDevContract,
                functionName: 'getMarketTerminationDate',
            });
        } else {
            return 0n;
        }
    }

    async getMarketTerminationRatio(currency: Currency) {
        if (this.config.env === 'development') {
            return this.publicClient.readContract({
                ...lendingMarketControllerDevContract,
                functionName: 'getMarketTerminationRatio',
                args: [this.convertCurrencyToBytes32(currency)],
            });
        } else {
            return 0n;
        }
    }

    async getMarketTerminationPrice(currency: Currency) {
        if (this.config.env === 'development') {
            return this.publicClient.readContract({
                ...lendingMarketControllerDevContract,
                functionName: 'getMarketTerminationPrice',
                args: [this.convertCurrencyToBytes32(currency)],
            });
        } else {
            return 0n;
        }
    }

    async isRedemptionRequired(account: string) {
        if (this.config.env === 'development') {
            return this.publicClient.readContract({
                ...lendingMarketControllerDevContract,
                functionName: 'isRedemptionRequired',
                args: [account as Hex],
            });
        } else {
            return this.publicClient.readContract({
                ...lendingMarketControllerStgContract,
                functionName: 'isRedemptionRequired',
                args: [account as Hex],
            });
        }
    }

    async executeEmergencySettlement() {
        const [address] = await this.walletClient.getAddresses();

        if (this.config.env === 'development') {
            return this.walletClient.writeContract({
                ...lendingMarketControllerDevContract,
                account: address,
                chain: this.config.chain,
                functionName: 'executeEmergencySettlement',
            });
        } else {
            return this.walletClient.writeContract({
                ...lendingMarketControllerStgContract,
                account: address,
                chain: this.config.chain,
                functionName: 'executeEmergencySettlement',
            });
        }
    }
}
