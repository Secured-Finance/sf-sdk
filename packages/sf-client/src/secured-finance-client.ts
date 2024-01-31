import { Currency, Token, getUTCMonthYear } from '@secured-finance/sf-core';
import {
    Hex,
    PublicClient,
    WalletClient,
    hexToString,
    stringToHex,
} from 'viem';
import { ERC20Abi } from './ERC20Abi';
import {
    getCurrencyControllerContract,
    getLendingMarketControllerContract,
    getLendingMarketReaderContract,
    getTokenFaucetContract,
    getTokenVaultContract,
} from './contracts';
import { TokenVault } from './contracts/TokenVault';
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

export type OrderBookDetails = {
    ccy: Currency;
    maturity: bigint;
    bestLendUnitPrice: bigint;
    bestBorrowUnitPrice: bigint;
    marketUnitPrice: bigint;
    blockUnitPriceHistory: bigint[];
    lastBlockUnitPriceTimestamp: bigint;
    maxLendUnitPrice: bigint;
    minBorrowUnitPrice: bigint;
    openingUnitPrice: bigint;
    openingDate: bigint;
    preOpeningDate: bigint;
    currentMinDebtUnitPrice: bigint;
    isReady: boolean;
};

export type Order = {
    orderId: bigint;
    ccy: Currency;
    maturity: bigint;
    side: OrderSide;
    unitPrice: bigint;
    amount: bigint;
    timestamp: bigint;
    isPreOrder: boolean;
};

export type Position = {
    ccy: Currency;
    maturity: bigint;
    presentValue: bigint;
    futureValue: bigint;
};

// TODO: get those from the contracts
export const ITAYOSE_PERIOD = 60 * 60; // 1 hour in seconds

const CLIENT_NOT_INITIALIZED = 'Client is not initialized';
const maxUint256 = 2n ** 256n - 1n;

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
    private _tokenVault: TokenVault | undefined;

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
            throw new Error(`ChainId ${chainId} is not supported.`);
        }

        const env = getContractEnvironment(networkName);

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
        this._tokenVault = new TokenVault(
            this._config,
            publicClient,
            walletClient
        );
    }

    /**
     *
     *
     * @readonly
     * @memberof SecuredFinanceClient
     */
    get config() {
        assertNonNullish(this._config);
        return this._config;
    }

    /**
     *
     *
     * @readonly
     * @type {PublicClient}
     * @memberof SecuredFinanceClient
     */
    get publicClient(): PublicClient {
        assertNonNullish(this._publicClient);
        return this._publicClient;
    }

    /**
     *
     *
     * @readonly
     * @type {WalletClient}
     * @memberof SecuredFinanceClient
     */
    get walletClient(): WalletClient {
        assertNonNullish(this._walletClient);
        return this._walletClient;
    }

    /**
     *
     *
     * @readonly
     * @memberof SecuredFinanceClient
     */
    get tokenVault() {
        assertNonNullish(this._tokenVault);
        return this._tokenVault;
    }

    /**
     * Gets the estimated order result by calculating the amount to be filled when executing an order in the order books.
     *
     * @param {Currency} ccy - Native currency of the selected market.
     * @param {number} maturity - Maturity term of the order.
     * @param {string} account - Wallet address of the user.
     * @param {OrderSide} side - Type of order placed (LEND or BORROW).
     * @param {bigint} amount - Amount of funds the maker wants to borrow/lend.
     * @param {number} unitPrice - Amount of unit price taker wishes to borrow/lend.
     * @param {number} [additionalDepositAmount=0] - Optional parameter for additional deposit amount.
     * @param {boolean} [ignoreBorrowedAmount=false] - Boolean indicating if the borrowed amount is to be used as collateral or not.
     * @return {Promise<{
     *   lastUnitPrice: bigint,
     *   filledAmount: bigint,
     *   filledAmountInFV: bigint,
     *   orderFeeInFV: bigint,
     *   placedAmount: bigint,
     *   coverage: bigint,
     *   isInsufficientDepositAmount: boolean
     * }>} Estimated order result.
     * @memberof SecuredFinanceClient
     */
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

        const result = await this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'getOrderEstimation',
            args: [args],
        });

        return {
            lastUnitPrice: result[0],
            filledAmount: result[1],
            filledAmountInFV: result[2],
            orderFeeInFV: result[3],
            placedAmount: result[4],
            coverage: result[5],
            isInsufficientDepositAmount: result[6],
        };
    }

    /**
     * Deposits collateral to the protocol.
     *
     * @param {Currency} ccy - Native currency of the collateral user wants to deposit.
     * @param {bigint} amount - Amount of collateral the user wants to deposit.
     * @param {((isApproved: boolean) => Promise<void> | void)} [onApproved] - Function to be called when the transaction is approved by the user.
     * @return a `Contract Transaction`
     * @memberof SecuredFinanceClient
     */
    async depositCollateral(
        ccy: Currency,
        amount: bigint,
        onApproved?: (isApproved: boolean) => Promise<void> | void
    ) {
        const [address] = await this.walletClient.getAddresses();
        const isApproved = await this.approveTokenTransfer(ccy, amount);
        await onApproved?.(isApproved);

        const payableOverride: PayableOverrides = ccy.isNative
            ? { value: amount }
            : {};

        return this.walletClient.writeContract({
            ...getTokenVaultContract(this.config.env),
            account: address,
            chain: this.config.chain,
            functionName: 'deposit',
            args: [this.convertCurrencyToBytes32(ccy), amount],
            ...payableOverride,
        });
    }

    /**
     * Gets the best lending unit price array for a given currency.
     *
     * @param {Currency} ccy - Native currency for which lending unit prices are requested
     * @return {Promise<{
     *   bigint[], - An array of the best price for lending
     * }>}
     * @memberof SecuredFinanceClient
     */
    async getBestLendUnitPrices(ccy: Currency) {
        return this.publicClient.readContract({
            ...getLendingMarketReaderContract(this.config.env),
            functionName: 'getBestLendUnitPrices',
            args: [this.convertCurrencyToBytes32(ccy)],
        });
    }

    /**
     * Gets the best borrowing unit price array for a given currency.
     *
     * @param {Currency} ccy - Native currency for which lending unit prices are requested
     * @return {Promise<{
     *   bigint[], // - An array of the best price for borrowing
     * }>}
     * @memberof SecuredFinanceClient
     */
    async getBestBorrowUnitPrices(ccy: Currency) {
        return this.publicClient.readContract({
            ...getLendingMarketReaderContract(this.config.env),
            functionName: 'getBestBorrowUnitPrices',
            args: [this.convertCurrencyToBytes32(ccy)],
        });
    }

    /**
     * Gets market maturities for a currency
     *
     * @param {Currency} ccy - Native currency selected to fetch related maturities
     * @return {Promise<{
     *   bigint[], // - An array with market maturities
     * }>}
     * @memberof SecuredFinanceClient
     */
    async getMaturities(ccy: Currency) {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'getMaturities',
            args: [this.convertCurrencyToBytes32(ccy)],
        });
    }

    /**
     * Gets the order book detail.
     *
     * @param {Currency} ccy - Native currency selected for getting order book details
     * @param {number} maturity - Market maturity selected for getting order book details
     * @return {Promise<{
     * OrderBookDetails
     * }>}
     * @memberof SecuredFinanceClient
     */
    async getOrderBookDetail(ccy: Currency, maturity: number) {
        return this.publicClient.readContract({
            ...getLendingMarketReaderContract(this.config.env),
            functionName: 'getOrderBookDetail',
            args: [this.convertCurrencyToBytes32(ccy), BigInt(maturity)],
        });
    }

    /**
     * Retrieves order book for a currency
     *
     * @param {Currency} ccy - Currency for which order book details are fetched
     * @return {Promise<{
     * OrderBookDetails,
     * maturity - Maturity of orderbook
     * openingDate - opening date of market
     * preOpeningDate - pre-opening date of market
     * isReady - flag for if market is ready
     * isMatured - flag for if market is matured
     * isOpened - flag for if market is open
     * }>}
     * @memberof SecuredFinanceClient
     */
    async getOrderBookDetailsPerCurrency(ccy: Currency) {
        return this.getOrderBookDetails([ccy]);
    }

    /**
     *
     *
     * @param {Currency[]} ccys - List of currencies for which orderbook details are requested
     * @return {Promise<[
     * OrderBookDetails,
     * maturity - Maturity of orderbook
     * openingDate - opening date of market
     * preOpeningDate - pre-opening date of market
     * isReady - flag for if market is ready
     * isMatured - flag for if market is matured
     * isOpened - flag for if market is open
     * ]>}
     * @memberof SecuredFinanceClient
     */
    async getOrderBookDetails(ccys: Currency[]) {
        const orderBookDetails = await this.publicClient.readContract({
            ...getLendingMarketReaderContract(this.config.env),
            functionName: 'getOrderBookDetails',
            args: [this.convertCurrencyArrayToBytes32Array(ccys)],
        });

        const timestamp = Math.floor(Date.now() / 1000);
        return orderBookDetails.map(orderBook => {
            const maturity = Number(orderBook.maturity);
            const openingDate = Number(orderBook.openingDate);
            const preOpeningDate = Number(orderBook.preOpeningDate);
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
                    timestamp >= preOpeningDate &&
                    timestamp < openingDate - ITAYOSE_PERIOD,
            };
        });
    }

    /**
     * Places an order
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
        const contract = getLendingMarketControllerContract(this.config.env);

        if (side === OrderSide.LEND && sourceWallet === WalletSource.METAMASK) {
            const overrides: PayableOverrides = {};

            if (ccy.isNative) {
                overrides.value = amount;
            } else {
                const isApproved = await this.approveTokenTransfer(ccy, amount);
                await onApproved?.(isApproved);
            }

            const estimatedGas = await this.publicClient.estimateContractGas({
                ...contract,
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
                ...contract,
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
            const estimatedGas = await this.publicClient.estimateContractGas({
                ...contract,
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
                ...contract,
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

    /**
     * Places a pre-order
     *
     * @param ccy - the Currency object of the selected market
     * @param maturity - the maturity of the selected market
     * @param side - Order position type, 0 for lend, 1 for borrow
     * @param amount - Amount of funds the maker wants to borrow/lend
     * @param {WalletSource} sourceWallet - Source of fund used for transaction
     * @param {number} unitPrice - Unit price the taker is willing to pay/receive. 0 for placing a market order
     * @param {((isApproved: boolean) => Promise<void> | void)} [onApproved] - callback function to be called after the approval transaction is mined
     * @return `Contract Transaction`
     * @memberof SecuredFinanceClient
     */
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
        const contract = getLendingMarketControllerContract(this.config.env);

        if (side === OrderSide.LEND && sourceWallet === WalletSource.METAMASK) {
            const overrides: PayableOverrides = {};

            if (ccy.isNative) {
                overrides.value = amount;
            } else {
                const isApproved = await this.approveTokenTransfer(ccy, amount);
                await onApproved?.(isApproved);
            }

            const estimatedGas = await this.publicClient.estimateContractGas({
                ...contract,
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
                ...contract,
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
            const estimatedGas = await this.publicClient.estimateContractGas({
                ...contract,
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
                ...contract,
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

    /**
     * Cancels an open order
     *
     * @param {Currency} ccy - Native currency of the open order
     * @param {number} maturity - Maturity of the open order
     * @param {number} orderID - order ID of the open order
     * @return a `Contract Transaction`
     * @memberof SecuredFinanceClient
     */
    async cancelLendingOrder(ccy: Currency, maturity: number, orderID: number) {
        const [address] = await this.walletClient.getAddresses();
        return this.walletClient.writeContract({
            ...getLendingMarketControllerContract(this.config.env),
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

    /**
     * Gets the converted amount in the base currency.
     *
     * @param {Currency} ccy - Native currency object
     * @param {bigint} amount - Amount to be converted
     * @return {Promise<{
     *  amount - bigint
     * }>}
     * @memberof SecuredFinanceClient
     */
    async convertToBaseCurrency(ccy: Currency, amount: bigint) {
        return this.publicClient.readContract({
            ...getCurrencyControllerContract(this.config.env),
            functionName: 'convertToBaseCurrency',
            args: [this.convertCurrencyToBytes32(ccy), amount],
        });
    }

    /**
     * Gets the converted amount between currencies
     *
     * @param {Currency} fromCcy - Original native currency of amount
     * @param {Currency} toCcy - Currency to which amount has to be converted
     * @param {bigint} amount - Amount to be converted
     * @return {Promise<{
     *  amount - bigint
     * }>}
     * @memberof SecuredFinanceClient
     */
    async convert(fromCcy: Currency, toCcy: Currency, amount: bigint) {
        return this.publicClient.readContract({
            ...getCurrencyControllerContract(this.config.env),
            functionName: 'convert',
            args: [
                this.convertCurrencyToBytes32(fromCcy),
                this.convertCurrencyToBytes32(toCcy),
                amount,
            ],
        });
    }

    /**
     * Gets the order book of borrow orders for specified currency and maturity.
     *
     * @param {Currency} currency - Native currency of requested orderbook
     * @param {number} maturity - Maturity of requested orderbook
     * @param {number} start - The starting unit price to get order book
     * @param {number} limit - The max limit for getting unit prices
     * @return {
     *  unitPrices: - An array of order unit prices
     *  amounts: - An array of order amounts
     *  quantities: - An array of order quantities
     *  next: - The next starting unit price to get order book,
     * }
     * @memberof SecuredFinanceClient
     */
    async getBorrowOrderBook(
        currency: Currency,
        maturity: number,
        start: number,
        limit: number
    ) {
        const result = await this.publicClient.readContract({
            ...getLendingMarketReaderContract(this.config.env),
            functionName: 'getBorrowOrderBook',
            args: [
                this.convertCurrencyToBytes32(currency),
                BigInt(maturity),
                BigInt(start),
                BigInt(limit),
            ],
        });

        return {
            unitPrices: result[0],
            amounts: result[1],
            quantities: result[2],
            next: result[3],
        };
    }

    /**
     * Gets the order book of lend orders for specified currency and maturity.
     *
     * @param {Currency} currency - Native currency of requested orderbook
     * @param {number} maturity - Maturity of requested orderbook
     * @param {number} start - The starting unit price to get order book
     * @param {number} limit - The max limit for getting unit prices
     * @return {
     *  unitPrices: - An array of order unit prices
     *  amounts: - An array of order amounts
     *  quantities: - An array of order quantities
     *  next: - The next starting unit price to get order book,
     * }
     * @memberof SecuredFinanceClient
     */
    async getLendOrderBook(
        currency: Currency,
        maturity: number,
        start: number,
        limit: number
    ) {
        const result = await this.publicClient.readContract({
            ...getLendingMarketReaderContract(this.config.env),
            functionName: 'getLendOrderBook',
            args: [
                this.convertCurrencyToBytes32(currency),
                BigInt(maturity),
                BigInt(start),
                BigInt(limit),
            ],
        });

        return {
            unitPrices: result[0],
            amounts: result[1],
            quantities: result[2],
            next: result[3],
        };
    }

    /**
     * MockERC20 related function
     * Mints ERC20 tokens for specified token for user
     *
     * @param {Token} token - Token to be minted
     * @return a `Contract Transaction`
     * @memberof SecuredFinanceClient
     */
    async mintERC20Token(token: Token) {
        const [account] = await this.walletClient.getAddresses();
        const { abi, address } = getTokenFaucetContract(this.config.env);

        if (address) {
            return this.walletClient.writeContract({
                abi,
                address,
                account,
                chain: this.config.chain,
                functionName: 'mint',
                args: [this.convertCurrencyToBytes32(token)],
            });
        } else {
            throw new Error(`Faucet is not available on ${this.config.env}`);
        }
    }

    /**
     * Gets address of mock ERC20 token contracts
     *
     * @param {Token} token - Token for which address is requested
     * @return {Promise<{
     *  address
     * }>}
     * @memberof SecuredFinanceClient
     */
    async getERC20TokenContractAddress(token: Token) {
        const { abi, address } = getTokenFaucetContract(this.config.env);
        if (address) {
            return this.publicClient.readContract({
                abi,
                address,
                functionName: 'getCurrencyAddress',
                args: [this.convertCurrencyToBytes32(token)],
            });
        } else {
            throw new Error(`Faucet is not available on ${this.config.env}`);
        }
    }

    /**
     * Gets all currencies supported by the protocol
     *
     * @return {Promise<[
     *  Currency
     * ]>}
     * @memberof SecuredFinanceClient
     */
    async getCurrencies() {
        return this.publicClient.readContract({
            ...getCurrencyControllerContract(this.config.env),
            functionName: 'getCurrencies',
        });
    }

    /**
     * Gets if the selected currency is supported.
     *
     * @param {Currency} ccy - Native currency
     * @return {Promise<
     *  Boolean
     * >}
     * @memberof SecuredFinanceClient
     */
    async currencyExists(ccy: Currency) {
        return this.publicClient.readContract({
            ...getCurrencyControllerContract(this.config.env),
            functionName: 'currencyExists',
            args: [this.convertCurrencyToBytes32(ccy)],
        });
    }

    /**
     * Gets the currencies that are accepted as collateral
     *
     * @return {Promise<[
     * Currency
     * ]>}
     * @memberof SecuredFinanceClient
     */
    async getCollateralCurrencies() {
        return this.publicClient.readContract({
            ...getTokenVaultContract(this.config.env),
            functionName: 'getCollateralCurrencies',
        });
    }

    /**
     * gets token balance of an ERC20 token
     *
     * @param {Token} token - Token for which balance has to be checked
     * @param {string} account - Wallet address of the user
     * @return {Promise<
     *  bigint
     * >}
     * @memberof SecuredFinanceClient
     */
    async getERC20Balance(token: Token, account: string) {
        const address = await this.tokenVault.getTokenAddress(token);
        return this.publicClient.readContract({
            abi: ERC20Abi,
            address: address,
            functionName: 'balanceOf',
            args: [account as Hex],
        });
    }

    private async approveTokenTransfer(ccy: Currency, amount: bigint) {
        const [address] = await this.walletClient.getAddresses();
        const tokenAddress = await this.tokenVault.getTokenAddress(ccy);

        if (ccy.isToken) {
            const spender = getTokenVaultContract(this.config.env).address;
            const allowance = await this.publicClient.readContract({
                abi: ERC20Abi,
                address: tokenAddress,
                functionName: 'allowance',
                args: [address, spender],
            });

            if (allowance <= amount) {
                const tx = await this.walletClient.writeContract({
                    abi: ERC20Abi,
                    address: tokenAddress,
                    functionName: 'approve',
                    args: [spender, maxUint256 - amount],
                    account: address,
                    chain: this.config.chain,
                });
                await this.publicClient.waitForTransactionReceipt({
                    hash: tx,
                });
                return true;
            }
        }
        return false;
    }

    /**
     * Gets the total amount deposited in protocol in all currencies
     *
     * @return {Record<string, bigint>}
     * @memberof SecuredFinanceClient
     */
    async getProtocolDepositAmount() {
        const currencyList = await this.getCurrencies();
        const contract = getTokenVaultContract(this.config.env);
        const totalDepositAmounts = await Promise.allSettled(
            currencyList.map(currency =>
                this.publicClient.readContract({
                    ...contract,
                    functionName: 'getTotalDepositAmount',
                    args: [currency],
                })
            )
        );

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

    /**
     * Unwinds user's lending or borrowing positions by creating an opposite position order.
     *
     * @param {Currency} currency - Native currency of position
     * @param {number} maturity - Maturity of position
     * @return a `Contract Transaction`
     * @memberof SecuredFinanceClient
     */
    async unwindPosition(currency: Currency, maturity: number) {
        const [address] = await this.walletClient.getAddresses();
        const contract = getLendingMarketControllerContract(this.config.env);

        const estimatedGas = await this.publicClient.estimateContractGas({
            ...contract,
            account: address,
            functionName: 'unwindPosition',
            args: [this.convertCurrencyToBytes32(currency), BigInt(maturity)],
        });

        return this.walletClient.writeContract({
            ...contract,
            account: address,
            chain: this.config.chain,
            functionName: 'unwindPosition',
            args: [this.convertCurrencyToBytes32(currency), BigInt(maturity)],
            gas: this.calculateAdjustedGas(estimatedGas),
        });
    }

    /**
     * Gets the total present value of the account converted to base currency.
     *
     * @param {string} account - Address of user
     * @return {Promise<
     * bigint
     * >}
     * @memberof SecuredFinanceClient
     */
    async getTotalPresentValueInBaseCurrency(account: string) {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'getTotalPresentValueInBaseCurrency',
            args: [account as Hex],
        });
    }

    /**
     * Repay user's borrowing positions. Repayment can only be executed once the order book has matured after the currency has been delisted.
     *
     * @param {Currency} currency - Native currency of matured position
     * @param {number} maturity
     * @return a `Contract Transaction`
     * @memberof SecuredFinanceClient
     */
    async executeRepayment(currency: Currency, maturity: number) {
        const [address] = await this.walletClient.getAddresses();
        return this.walletClient.writeContract({
            ...getLendingMarketControllerContract(this.config.env),
            account: address,
            chain: this.config.chain,
            functionName: 'executeRepayment',
            args: [this.convertCurrencyToBytes32(currency), BigInt(maturity)],
        });
    }

    /**
     * Redeem user's lending positions. Redemption can only be executed once the order book has matured after the currency has been delisted.
     *
     * @param {Currency} currency - Native currency of matured position
     * @param {number} maturity
     * @return a `Contract Transaction`
     * @memberof SecuredFinanceClient
     */
    async executeRedemption(currency: Currency, maturity: number) {
        const [address] = await this.walletClient.getAddresses();
        return this.walletClient.writeContract({
            ...getLendingMarketControllerContract(this.config.env),
            account: address,
            chain: this.config.chain,
            functionName: 'executeRedemption',
            args: [this.convertCurrencyToBytes32(currency), BigInt(maturity)],
        });
    }

    /**
     * Gets the order fee rate
     *
     * @param {Currency} currency - Native currency used
     * @return {Promise<
     * bigint
     * >}
     * @memberof SecuredFinanceClient
     */
    async getOrderFeeRate(currency: Currency) {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'getOrderFeeRate',
            args: [this.convertCurrencyToBytes32(currency)],
        });
    }

    /**
     * Gets the order book id for the selected currency and maturity.
     *
     * @param {Currency} currency - Native currency of requested orderbook
     * @param {number} maturity
     * @return {Promise<
     * bigint
     * >}
     * @memberof SecuredFinanceClient
     */
    async getOrderBookId(currency: Currency, maturity: number) {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'getOrderBookId',
            args: [this.convertCurrencyToBytes32(currency), BigInt(maturity)],
        });
    }

    /**
     * Gets user's active and inactive orders in the order book
     *
     * @param {string} account - Wallet address of user
     * @param {Currency[]} usedCurrenciesForOrders - List of native currency of requested orders
     * @return {Promise<{
     *  activeOrders : Order[]
     * inactiveOrders: Order[]
     * }>}
     * @memberof SecuredFinanceClient
     */
    async getOrderList(account: string, usedCurrenciesForOrders: Currency[]) {
        const res = await this.publicClient.readContract({
            ...getLendingMarketReaderContract(this.config.env),
            functionName: 'getOrders',
            args: [
                this.convertCurrencyArrayToBytes32Array(
                    usedCurrenciesForOrders
                ),
                account as Hex,
            ],
        });

        return { activeOrders: res[0], inactiveOrders: res[1] };
    }

    /**
     * Gets user's active positions of the selected currency
     *
     * @param {string} account - Wallet address of user
     * @param {Currency[]} usedCurrenciesForOrders - Native currency used by user for placing orders
     * @return {Promise<{
     *  Position[]
     * }>}
     * @memberof SecuredFinanceClient
     */
    async getPositions(account: string, usedCurrenciesForOrders: Currency[]) {
        return this.publicClient.readContract({
            ...getLendingMarketReaderContract(this.config.env),
            functionName: 'getPositions',
            args: [
                this.convertCurrencyArrayToBytes32Array(
                    usedCurrenciesForOrders
                ),
                account as Hex,
            ],
        });
    }

    /**
     * Get all the currencies in which the user has lending positions or orders.
     *
     * @param {string} account - Wallet address of user
     * @return {Promise<[
     * bytes32
     * ]>}
     * @memberof SecuredFinanceClient
     */
    async getUsedCurrenciesForOrders(account: string) {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'getUsedCurrencies',
            args: [account as Hex],
        });
    }

    /**
     * Liquidates a lending or borrowing position if the user's coverage is hight.
     *
     * @param {Currency} collateralCcy - Native currency of collateral used by user
     * @param {Currency} debtCcy - Native currency of borrow order
     * @param {number} debtMaturity - Maturity of position
     * @param {string} account - Wallet address of user
     * @return a `Contract Transaction`
     * @memberof SecuredFinanceClient
     */
    async executeLiquidationCall(
        collateralCcy: Currency,
        debtCcy: Currency,
        debtMaturity: number,
        account: string
    ) {
        const [address] = await this.walletClient.getAddresses();
        const contract = getLendingMarketControllerContract(this.config.env);

        const estimatedGas = await this.publicClient.estimateContractGas({
            ...contract,
            account: address,
            functionName: 'executeLiquidationCall',
            args: [
                this.convertCurrencyToBytes32(collateralCcy),
                this.convertCurrencyToBytes32(debtCcy),
                BigInt(debtMaturity),
                account as Hex,
            ],
        });
        return this.walletClient.writeContract({
            ...contract,
            account: address,
            chain: this.config.chain,
            functionName: 'executeLiquidationCall',
            args: [
                this.convertCurrencyToBytes32(collateralCcy),
                this.convertCurrencyToBytes32(debtCcy),
                BigInt(debtMaturity),
                account as Hex,
            ],
            gas: this.calculateAdjustedGas(estimatedGas),
        });
    }

    /**
     * Gets the last price of the selected currency in the base currency.
     *
     * @param {Currency} currency - Native currency for which last price is requested
     * @return {Promise<
     * bigint
     * >}
     * @memberof SecuredFinanceClient
     */
    async getLastPrice(currency: Currency) {
        return this.publicClient.readContract({
            ...getCurrencyControllerContract(this.config.env),
            functionName: 'getLastPrice',
            args: [this.convertCurrencyToBytes32(currency)],
        });
    }

    /**
     *  * Gets aggregated and cached decimals of the price feeds for the selected currency
     *
     * @param {Currency} currency - Currency for which decimals are requested
     * @return {Promise<
     * bigint
     * >}
     * @memberof SecuredFinanceClient
     */
    async getDecimals(currency: Currency) {
        return this.publicClient.readContract({
            ...getCurrencyControllerContract(this.config.env),
            functionName: 'getDecimals',
            args: [this.convertCurrencyToBytes32(currency)],
        });
    }

    /**
     * Gets if the protocol has not been terminated.
     * @return {Promise<
     * boolean
     * >}
     * @memberof SecuredFinanceClient
     */
    async isTerminated() {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'isTerminated',
        });
    }

    /**
     * Gets the date at the emergency termination.
     *
     * @return {Promise<
     * boolean
     * >}
     * @memberof SecuredFinanceClient
     */
    async getMarketTerminationDate() {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'getTerminationDate',
        });
    }

    /**
     * Gets the collateral ratio of each token in TokenVault at the emergency termination.
     *
     * @param {Currency} currency - Native currency for which market's state has to be checked
     * @return {Promise<
     * bigint
     * >}
     * @memberof SecuredFinanceClient
     */
    async getMarketTerminationRatio(currency: Currency) {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'getTerminationCollateralRatio',
            args: [this.convertCurrencyToBytes32(currency)],
        });
    }

    /**
     * Gets the currency information cached at the emergency termination.
     *
     * @param {Currency} currency - Native currency for which market price and decimals are requested
     * @return {*}
     * @memberof SecuredFinanceClient
     */
    async getMarketTerminationPriceAndDecimals(currency: Currency) {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'getTerminationCurrencyCache',
            args: [this.convertCurrencyToBytes32(currency)],
        });
    }

    /**
     * Gets if the user needs to redeem the funds.
     *
     * @param {string} account - Wallet address of user
     * @return {Promise<
     * Boolean
     * >}
     * @memberof SecuredFinanceClient
     */
    async isRedemptionRequired(account: string) {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'isRedemptionRequired',
            args: [account as Hex],
        });
    }

    /**
     * Force settlement of all lending and borrowing positions. This function is executed under the present value as of the termination date.
     *
     * @return a `Contract Transaction`
     * @memberof SecuredFinanceClient
     */
    async executeEmergencySettlement() {
        const [address] = await this.walletClient.getAddresses();
        return this.walletClient.writeContract({
            ...getLendingMarketControllerContract(this.config.env),
            account: address,
            chain: this.config.chain,
            functionName: 'executeEmergencySettlement',
        });
    }

    /**
     * Gets the estimation of the Itayose process.
     *
     * @param {Currency} currency - Native currency for which itayose estimations are requested
     * @param {number} maturity
     * @return {Promise<
     * openingUnitPrice	bigint	The opening price when Itayose is executed
     * lastLendUnitPrice bigint	The price of the last lend order filled by Itayose.
     * lastBorrowUnitPrice bigint	The price of the last borrow order filled by Itayose.
     * totalOffsetAmount bigint	The total amount of the orders filled by Itayose.
     * >}
     * @memberof SecuredFinanceClient
     */
    async getItayoseEstimation(currency: Currency, maturity: number) {
        const result = await this.publicClient.readContract({
            ...getLendingMarketReaderContract(this.config.env),
            functionName: 'getItayoseEstimation',
            args: [this.convertCurrencyToBytes32(currency), BigInt(maturity)],
        });

        return {
            openingUnitPrice: result[0],
            lastLendUnitPrice: result[1],
            lastBorrowUnitPrice: result[2],
            totalOffsetAmount: result[3],
        };
    }
}
