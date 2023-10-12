import { Currency, Ether } from '@secured-finance/sf-core';
import {
    Hex,
    PublicClient,
    WalletClient,
    hexToString,
    stringToHex,
} from 'viem';
import {
    lendingMarketControllerDevAbi,
    lendingMarketControllerDevAddress,
    lendingMarketControllerStgAbi,
    lendingMarketControllerStgAddress,
    tokenVaultDevAbi,
    tokenVaultDevAddress,
} from './contracts-instance';
import { SecuredFinanceClientConfig } from './entities';
import { CHAINS, Network, NetworkName, getContractEnvironment, networkNames } from './utils';

export enum OrderSide {
    LEND = '0',
    BORROW = '1',
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
// const ITAYOSE_PERIOD = 60 * 60; // 1 hour
// const PRE_ORDER_PERIOD = 60 * 60 * 24 * 7; // 7 days

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

    // private calculateAdjustedGas(amount: BigNumber) {
    //     // NOTE: This adjustment is for the function that executes the collateral coverage check.
    //     // Without this adjustment, the transaction often fails due to out-of-gas error.
    //     return amount.mul(11).div(10);
    // }

    private _config: SecuredFinanceClientConfig | null = null;

    ether: Ether | null = null;

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
        // const address = walletClient ? await walletClient.getAddresses() : undefined;

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
            walletAddress: '0x',
        };
    }

    get config() {
        assertNonNullish(this._config);
        return this._config;
    }

    // async getCollateralParameters() {
    //     assertNonNullish(this.devContracts);

    //     const result = this.config.publicClient.readContract({
    //         abi: this.devContracts.tokenVault['abi'],
    //         address: this.devContracts.tokenVault.address,
    //         functionName: 'getLiquidationConfiguration',
    //     });

    //     return result;
    //     // return this.tokenVault.contract.getLiquidationConfiguration();
    // }

    // async getOrderEstimation(
    //     ccy: Currency,
    //     maturity: number,
    //     account: string,
    //     side: OrderSide,
    //     amount: number | BigNumber,
    //     unitPrice: number,
    //     additionalDepositAmount: number | BigNumber = 0,
    //     ignoreBorrowedAmount = false
    // ) {
    //     assertNonNullish(this.lendingMarketController);
    //     return this.lendingMarketController.contract.getOrderEstimation({
    //         ccy: this.convertCurrencyToBytes32(ccy),
    //         maturity,
    //         user: account,
    //         side,
    //         amount,
    //         unitPrice,
    //         additionalDepositAmount,
    //         ignoreBorrowedAmount,
    //     });
    // }

    // async getWithdrawableCollateral(ccy: Currency, account: string) {
    //     assertNonNullish(this.tokenVault);
    //     return this.tokenVault.contract[
    //         'getWithdrawableCollateral(bytes32,address)'
    //     ](this.convertCurrencyToBytes32(ccy), account);
    // }

    // async depositCollateral(
    //     ccy: Currency,
    //     amount: number | BigNumber,
    //     onApproved?: (isApproved: boolean) => Promise<void> | void
    // ) {
    //     assertNonNullish(this.config);
    //     assertNonNullish(this.tokenVault);

    //     const isApproved = await this.approveTokenTransfer(ccy, amount);
    //     await onApproved?.(isApproved);

    //     const payableOverride = ccy.equals(Ether.onChain(this.config.networkId))
    //         ? { value: amount }
    //         : {};
    //     return this.tokenVault.contract.deposit(
    //         this.convertCurrencyToBytes32(ccy),
    //         amount,
    //         payableOverride
    //     );
    // }

    // async withdrawCollateral(ccy: Currency, amount: number | BigNumber) {
    //     assertNonNullish(this.tokenVault);

    //     const estimatedGas =
    //         await this.tokenVault.contract.estimateGas.withdraw(
    //             this.convertCurrencyToBytes32(ccy),
    //             amount
    //         );

    //     return this.tokenVault.contract.withdraw(
    //         this.convertCurrencyToBytes32(ccy),
    //         amount,
    //         { gasLimit: this.calculateAdjustedGas(estimatedGas) }
    //     );
    // }

    // async getBestLendUnitPrices(ccy: Currency) {
    //     assertNonNullish(this.lendingMarketReader);
    //     return this.lendingMarketReader.contract.getBestLendUnitPrices(
    //         this.convertCurrencyToBytes32(ccy)
    //     );
    // }

    // async getBestBorrowUnitPrices(ccy: Currency) {
    //     assertNonNullish(this.lendingMarketReader);
    //     return this.lendingMarketReader.contract.getBestBorrowUnitPrices(
    //         this.convertCurrencyToBytes32(ccy)
    //     );
    // }

    async getMaturities(ccy: Currency) {
        assertNonNullish(this.config);
        let result: Promise<bigint[]>;

        if (this.config.env === 'development') {
            result = this.config.publicClient.readContract({
                abi: lendingMarketControllerDevAbi,
                address: lendingMarketControllerDevAddress,
                functionName: 'getMaturities',
                args: [this.convertCurrencyToBytes32(ccy)],
            }) as Promise<bigint[]>;
        } else {
            result = this.config.publicClient.readContract({
                abi: lendingMarketControllerStgAbi,
                address: lendingMarketControllerStgAddress,
                functionName: 'getMaturities',
                args: [this.convertCurrencyToBytes32(ccy)],
            }) as Promise<bigint[]>;
        }

        return result;
    }

    // async getOrderBookDetail(ccy: Currency, maturity: number) {
    //     assertNonNullish(this.lendingMarketReader);
    //     return this.lendingMarketReader.contract.getOrderBookDetail(
    //         this.convertCurrencyToBytes32(ccy),
    //         maturity
    //     );
    // }

    // async getOrderBookDetailsPerCurrency(ccy: Currency) {
    //     return this.getOrderBookDetails([ccy]);
    // }

    // async getOrderBookDetails(ccys: Currency[]) {
    //     assertNonNullish(this.lendingMarketReader);
    //     const orderBookDetails = await this.lendingMarketReader.contract[
    //         'getOrderBookDetails(bytes32[])'
    //     ](this.convertCurrencyArrayToBytes32Array(ccys));
    //     const timestamp = Math.floor(Date.now() / 1000);
    //     return orderBookDetails.map(orderBook => {
    //         const maturity = orderBook.maturity.toNumber();
    //         const openingDate = orderBook.openingDate.toNumber();
    //         const isReady = orderBook.isReady;
    //         const isMatured = timestamp >= maturity;
    //         const isOpened = isReady && !isMatured && timestamp >= openingDate;

    //         return {
    //             ...orderBook,
    //             name: getUTCMonthYear(maturity),
    //             isMatured,
    //             isOpened,
    //             isItayosePeriod:
    //                 !isReady && timestamp >= openingDate - ITAYOSE_PERIOD,
    //             isPreOrderPeriod:
    //                 timestamp >= openingDate - PRE_ORDER_PERIOD &&
    //                 timestamp < openingDate - ITAYOSE_PERIOD,
    //         };
    //     });
    // }

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
    //     amount: number | BigNumber,
    //     sourceWallet: WalletSource,
    //     unitPrice?: number,
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

    // async cancelLendingOrder(
    //     ccy: Currency,
    //     maturity: number,
    //     orderID: number | BigNumber
    // ) {
    //     assertNonNullish(this.lendingMarketController);
    //     return this.lendingMarketController.contract.cancelOrder(
    //         this.convertCurrencyToBytes32(ccy),
    //         maturity,
    //         orderID
    //     );
    // }

    // async sendEther(
    //     amount: number | BigNumber,
    //     to: string,
    //     gasPrice?: number | BigNumber
    // ) {
    //     let signer: Signer;
    //     assertNonNullish(this.config, 'Client is not initialized');

    //     if (Signer.isSigner(this.config.signerOrProvider)) {
    //         signer = this.config.signerOrProvider;
    //     } else {
    //         console.error('signer is required for sending transaction');
    //         return;
    //     }

    //     return sendEther(signer, amount, to, gasPrice);
    // }

    // async convertToBaseCurrency(ccy: Currency, amount: number | BigNumber) {
    //     assertNonNullish(this.currencyController);
    //     return this.currencyController?.contract[
    //         'convertToBaseCurrency(bytes32,int256)'
    //     ](this.convertCurrencyToBytes32(ccy), amount);
    // }

    // async getUsedCurrencies(account: string) {
    //     assertNonNullish(this.tokenVault);
    //     return this.tokenVault.contract.getUsedCurrencies(account);
    // }

    // async getTokenAllowance(token: Token, owner: string) {
    //     assertNonNullish(this.tokenVault);

    //     const tokenContract = await this.getTokenContract(token);
    //     const spender = this.tokenVault.contract.address;
    //     return tokenContract.allowance(owner, spender);
    // }

    // async getBorrowOrderBook(
    //     currency: Currency,
    //     maturity: number,
    //     limit: number
    // ) {
    //     assertNonNullish(this.lendingMarketReader);
    //     return this.lendingMarketReader.contract.getBorrowOrderBook(
    //         this.convertCurrencyToBytes32(currency),
    //         maturity,
    //         limit
    //     );
    // }

    // async getLendOrderBook(
    //     currency: Currency,
    //     maturity: number,
    //     limit: number
    // ) {
    //     assertNonNullish(this.lendingMarketReader);
    //     return this.lendingMarketReader.contract.getLendOrderBook(
    //         this.convertCurrencyToBytes32(currency),
    //         maturity,
    //         limit
    //     );
    // }

    // // Mock ERC20 token related functions
    // async mintERC20Token(token: Token) {
    //     assertNonNullish(this.tokenFaucet);
    //     return this.tokenFaucet.contract.mint(
    //         this.convertCurrencyToBytes32(token)
    //     );
    // }

    // async getERC20TokenContractAddress(token: Token) {
    //     assertNonNullish(this.tokenFaucet);
    //     return this.tokenFaucet.contract.getCurrencyAddress(
    //         this.convertCurrencyToBytes32(token)
    //     );
    // }

    // async getCurrencies() {
    //     assertNonNullish(this.currencyController);
    //     return this.currencyController.contract.getCurrencies();
    // }

    // async currencyExists(ccy: Currency) {
    //     assertNonNullish(this.currencyController);
    //     return this.currencyController.contract.currencyExists(
    //         this.convertCurrencyToBytes32(ccy)
    //     );
    // }

    async getCollateralCurrencies() {
        assertNonNullish(this.config);

        const result = this.config.publicClient.readContract({
            abi: tokenVaultDevAbi,
            address: tokenVaultDevAddress,
            functionName: 'getCollateralCurrencies',
        });

        return result;
    }

    // async getERC20Balance(token: Token, account: string) {
    //     const tokenContract = await this.getTokenContract(token);
    //     return tokenContract.balanceOf(account);
    // }

    // async getCollateralBook(account: string) {
    //     assertNonNullish(this.tokenVault);
    //     const currencies = await this.getCurrencies();
    //     let collateral: Record<string, BigNumber> = {};

    //     if (currencies && currencies.length) {
    //         await Promise.all(
    //             currencies.map(async ccy => {
    //                 assertNonNullish(this.tokenVault);
    //                 const balance =
    //                     await this.tokenVault.contract.getDepositAmount(
    //                         account,
    //                         ccy
    //                     );
    //                 collateral = {
    //                     ...collateral,
    //                     [this.parseBytes32String(ccy)]: balance,
    //                 };
    //             })
    //         );
    //     }

    //     const collateralCoverage = await this.getCoverage(account);

    //     return {
    //         collateral,
    //         collateralCoverage,
    //     };
    // }

    // async getCoverage(account: string) {
    //     assertNonNullish(this.tokenVault);
    //     return await this.tokenVault.contract.getCoverage(account);
    // }

    // private async approveTokenTransfer(
    //     ccy: Currency,
    //     amount: number | BigNumber
    // ) {
    //     assertNonNullish(this.tokenVault);
    //     if (!Signer.isSigner(this.config.signerOrProvider)) {
    //         throw new Error('Signer is not set');
    //     }

    //     if (ccy.isToken) {
    //         const tokenContract = await this.getTokenContract(ccy);
    //         const owner = await this.config.signerOrProvider.getAddress();
    //         const spender = this.tokenVault.contract.address;
    //         const allowance = await tokenContract.allowance(owner, spender);

    //         if (allowance.lte(amount)) {
    //             await tokenContract
    //                 .approve(spender, constants.MaxUint256.sub(amount))
    //                 .then(tx => tx.wait());
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    // private async getTokenContract(token: Token) {
    //     return new Contract(
    //         token.address,
    //         ERC20.abi,
    //         this.config.signerOrProvider
    //     ) as MockERC20;
    // }

    // async getTotalDepositAmount(currency: Currency) {
    //     assertNonNullish(this.tokenVault);
    //     return this.tokenVault.contract.getTotalDepositAmount(
    //         this.convertCurrencyToBytes32(currency)
    //     );
    // }

    // async getProtocolDepositAmount() {
    //     assertNonNullish(this.tokenVault);
    //     const currencyList = await this.getCurrencies();

    //     const totalDepositAmounts = await Promise.allSettled(
    //         currencyList.map(currency =>
    //             this.tokenVault?.contract.getTotalDepositAmount(currency)
    //         )
    //     );

    //     return totalDepositAmounts.reduce((acc, cur, index) => {
    //         if (cur.status === 'fulfilled') {
    //             if (cur.value) {
    //                 acc[this.parseBytes32String(currencyList[index])] =
    //                     cur.value;
    //             }
    //         }
    //         return acc;
    //     }, {} as Record<string, BigNumber>);
    // }

    // async unwindPosition(currency: Currency, maturity: number) {
    //     assertNonNullish(this.lendingMarketController);

    //     const estimatedGas =
    //         await this.lendingMarketController.contract.estimateGas.unwindPosition(
    //             this.convertCurrencyToBytes32(currency),
    //             maturity
    //         );

    //     return this.lendingMarketController.contract.unwindPosition(
    //         this.convertCurrencyToBytes32(currency),
    //         maturity,
    //         {
    //             gasLimit: this.calculateAdjustedGas(estimatedGas),
    //         }
    //     );
    // }

    // async executeRepayment(currency: Currency, maturity: number) {
    //     assertNonNullish(this.lendingMarketController);
    //     return this.lendingMarketController.contract.executeRepayment(
    //         this.convertCurrencyToBytes32(currency),
    //         maturity
    //     );
    // }

    // async executeRedemption(currency: Currency, maturity: number) {
    //     assertNonNullish(this.lendingMarketController);
    //     return this.lendingMarketController.contract.executeRedemption(
    //         this.convertCurrencyToBytes32(currency),
    //         maturity
    //     );
    // }

    // async getOrderFeeRate(currency: Currency) {
    //     assertNonNullish(this.lendingMarketController);
    //     return this.lendingMarketController.contract.getOrderFeeRate(
    //         this.convertCurrencyToBytes32(currency)
    //     );
    // }

    // async getLendingMarket(currency: Currency) {
    //     assertNonNullish(this.lendingMarketController);
    //     assertNonNullish(this.lendingMarkets);

    //     const address =
    //         await this.lendingMarketController.contract.getLendingMarket(
    //             this.convertCurrencyToBytes32(currency)
    //         );

    //     return (await this.lendingMarkets.get(address)).contract;
    // }

    // async getOrderBookId(currency: Currency, maturity: number) {
    //     assertNonNullish(this.lendingMarketController);
    //     assertNonNullish(this.lendingMarkets);

    //     return this.lendingMarketController.contract.getOrderBookId(
    //         this.convertCurrencyToBytes32(currency),
    //         maturity
    //     );
    // }

    // async getOrderList(account: string, usedCurrenciesForOrders: Currency[]) {
    //     assertNonNullish(this.lendingMarketReader);

    //     const { activeOrders, inactiveOrders } =
    //         await this.lendingMarketReader.contract[
    //             'getOrders(bytes32[],address)'
    //         ](
    //             this.convertCurrencyArrayToBytes32Array(
    //                 usedCurrenciesForOrders
    //             ),
    //             account
    //         );

    //     return { activeOrders, inactiveOrders };
    // }

    // async getPositions(account: string, usedCurrenciesForOrders: Currency[]) {
    //     assertNonNullish(this.lendingMarketReader);
    //     return this.lendingMarketReader.contract[
    //         'getPositions(bytes32[],address)'
    //     ](
    //         this.convertCurrencyArrayToBytes32Array(usedCurrenciesForOrders),
    //         account
    //     );
    // }

    // async getUsedCurrenciesForOrders(account: string) {
    //     assertNonNullish(this.lendingMarketController);
    //     return this.lendingMarketController.contract.getUsedCurrencies(account);
    // }

    // async executeLiquidationCall(
    //     collateralCcy: Currency,
    //     debtCcy: Currency,
    //     debtMaturity: number,
    //     account: string
    // ) {
    //     assertNonNullish(this.lendingMarketController);
    //     return this.lendingMarketController.contract.executeLiquidationCall(
    //         this.convertCurrencyToBytes32(collateralCcy),
    //         this.convertCurrencyToBytes32(debtCcy),
    //         debtMaturity,
    //         account
    //     );
    // }

    // async getLastPrice(currency: Currency) {
    //     assertNonNullish(this.currencyController);
    //     return this.currencyController.contract.getLastPrice(
    //         this.convertCurrencyToBytes32(currency)
    //     );
    // }

    // async getTotalCollateralAmount(account: string) {
    //     assertNonNullish(this.tokenVault);
    //     return this.tokenVault.contract.getTotalCollateralAmount(account);
    // }
}
