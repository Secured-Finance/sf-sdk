import {
    Currency,
    Ether,
    getUTCMonthYear,
    Token,
} from '@secured-finance/sf-core';
import {
    getContract,
    Hex,
    maxInt256,
    PublicClient,
    stringToHex,
    WalletClient,
} from 'viem';
import { ContractsInstance } from './contracts-instance';
import { SecuredFinanceClientConfig } from './entities';
import { ERC20Abi } from './ERC20Abi';
import { Network, NetworkName, networkNames } from './utils';

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
const ITAYOSE_PERIOD = 60 * 60; // 1 hour
const PRE_ORDER_PERIOD = 60 * 60 * 24 * 7; // 7 days

export class SecuredFinanceClient extends ContractsInstance {
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
        return stringToHex(ccy, { size: 32 });
    }

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

        if (!networkNames.includes(networkName)) {
            throw new Error(`${networkName} is not supported.`);
        }

        this._config = {
            defaultGas: options?.defaultGas || 6000000,
            defaultGasPrice: options?.defaultGasPrice || 1000000000000,
            networkId: network.chainId,
            network: networkName,
            publicClient: publicClient,
            walletClient: walletClient,
        };
        await super.getInstances(networkName, publicClient, walletClient);
    }

    async getCollateralParameters() {
        assertNonNullish(this.tokenVault);
        return this.tokenVault.read.getLiquidationConfiguration();
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
        assertNonNullish(this.lendingMarketController);
        return this.lendingMarketController.read.getOrderEstimation([
            {
                ccy: this.convertCurrencyToBytes32(ccy),
                maturity: BigInt(maturity),
                user: account as Hex,
                side: side === OrderSide.BORROW ? 1 : 0,
                amount,
                unitPrice: BigInt(unitPrice),
                additionalDepositAmount,
                ignoreBorrowedAmount,
            },
        ]);
    }

    async getWithdrawableCollateral(ccy: Currency, account: string) {
        assertNonNullish(this.tokenVault);
        return this.tokenVault.read.getWithdrawableCollateral([
            this.convertCurrencyToBytes32(ccy),
            account as Hex,
        ]);
    }

    async depositCollateral(
        ccy: Currency,
        amount: bigint,
        onApproved?: (isApproved: boolean) => Promise<void> | void
    ) {
        assertNonNullish(this.tokenVault);
        assertNonNullish(this.config.walletClient?.account?.address);

        const isApproved = await this.approveTokenTransfer(ccy, amount);
        await onApproved?.(isApproved);

        return this.tokenVault.write.deposit(
            [this.convertCurrencyToBytes32(ccy), amount],
            {
                account: this.config.walletClient.account.address,
                chain: this.config.walletClient.chain,
            }
        );
    }

    async withdrawCollateral(ccy: Currency, amount: bigint) {
        assertNonNullish(this.tokenVault);
        assertNonNullish(this.config.walletClient?.account?.address);

        return this.tokenVault.write.withdraw(
            [this.convertCurrencyToBytes32(ccy), amount],
            {
                account: this.config.walletClient.account.address,
                chain: this.config.walletClient.chain,
            }
        );
    }

    async getBestLendUnitPrices(ccy: Currency) {
        assertNonNullish(this.lendingMarketReader);
        return this.lendingMarketReader.read.getBestLendUnitPrices([
            this.convertCurrencyToBytes32(ccy),
        ]);
    }

    async getBestBorrowUnitPrices(ccy: Currency) {
        assertNonNullish(this.lendingMarketReader);
        return this.lendingMarketReader.read.getBestBorrowUnitPrices([
            this.convertCurrencyToBytes32(ccy),
        ]);
    }

    async getMaturities(ccy: Currency) {
        assertNonNullish(this.lendingMarketController);
        return this.lendingMarketController.read.getMaturities([
            this.convertCurrencyToBytes32(ccy),
        ]);
    }

    async getOrderBookDetail(ccy: Currency, maturity: number) {
        assertNonNullish(this.lendingMarketReader);
        return this.lendingMarketReader.read.getOrderBookDetail([
            this.convertCurrencyToBytes32(ccy),
            BigInt(maturity),
        ]);
    }

    async getOrderBookDetailsPerCurrency(ccy: Currency) {
        return this.getOrderBookDetails([ccy]);
    }

    async getOrderBookDetails(ccys: Currency[]) {
        assertNonNullish(this.lendingMarketReader);

        const orderBookDetails =
            await this.lendingMarketReader.read.getOrderBookDetails([
                this.convertCurrencyArrayToBytes32Array(ccys),
            ]);
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
        assertNonNullish(this.lendingMarketController);
        assertNonNullish(this.config.walletClient?.account?.address);

        if (side === OrderSide.LEND && sourceWallet === WalletSource.METAMASK) {
            if (ccy.equals(Ether.onChain(this.config.networkId))) {
                return this.lendingMarketController.write.depositAndExecuteOrder(
                    [
                        this.convertCurrencyToBytes32(ccy),
                        BigInt(maturity),
                        0,
                        amount,
                        BigInt(unitPrice ?? 0),
                    ],
                    {
                        account: this.config.walletClient.account.address,
                        chain: this.config.walletClient.chain,
                    }
                );
            } else {
                const isApproved = await this.approveTokenTransfer(ccy, amount);
                await onApproved?.(isApproved);
                return this.lendingMarketController.write.depositAndExecuteOrder(
                    [
                        this.convertCurrencyToBytes32(ccy),
                        BigInt(maturity),
                        0,
                        amount,
                        BigInt(unitPrice ?? 0),
                    ],
                    {
                        account: this.config.walletClient.account.address,
                        chain: this.config.walletClient.chain,
                    }
                );
            }
        } else {
            return this.lendingMarketController.write.executeOrder(
                [
                    this.convertCurrencyToBytes32(ccy),
                    BigInt(maturity),
                    side === OrderSide.BORROW ? 1 : 0,
                    amount,
                    BigInt(unitPrice ?? 0),
                ],
                {
                    account: this.config.walletClient.account.address,
                    chain: this.config.walletClient.chain,
                }
            );
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
        assertNonNullish(this.lendingMarketController);
        assertNonNullish(this.config.walletClient?.account?.address);

        if (side === OrderSide.LEND && sourceWallet === WalletSource.METAMASK) {
            if (ccy.equals(Ether.onChain(this.config.networkId))) {
                return this.lendingMarketController.write.depositAndExecutesPreOrder(
                    [
                        this.convertCurrencyToBytes32(ccy),
                        BigInt(maturity),
                        0,
                        amount,
                        BigInt(unitPrice),
                    ],
                    {
                        account: this.config.walletClient.account.address,
                        chain: this.config.walletClient.chain,
                    }
                );
            } else {
                const isApproved = await this.approveTokenTransfer(ccy, amount);
                await onApproved?.(isApproved);
                return this.lendingMarketController.write.depositAndExecutesPreOrder(
                    [
                        this.convertCurrencyToBytes32(ccy),
                        BigInt(maturity),
                        0,
                        amount,
                        BigInt(unitPrice),
                    ],
                    {
                        account: this.config.walletClient.account.address,
                        chain: this.config.walletClient.chain,
                    }
                );
            }
        } else {
            return this.lendingMarketController.write.executePreOrder(
                [
                    this.convertCurrencyToBytes32(ccy),
                    BigInt(maturity),
                    side === OrderSide.BORROW ? 1 : 0,
                    amount,
                    BigInt(unitPrice),
                ],
                {
                    account: this.config.walletClient.account.address,
                    chain: this.config.walletClient.chain,
                }
            );
        }
    }

    async cancelLendingOrder(ccy: Currency, maturity: number, orderID: number) {
        assertNonNullish(this.lendingMarketController);
        assertNonNullish(this.config.walletClient?.account?.address);

        return this.lendingMarketController.write.cancelOrder(
            [this.convertCurrencyToBytes32(ccy), BigInt(maturity), orderID],
            {
                account: this.config.walletClient.account.address,
                chain: this.config.walletClient.chain,
            }
        );
    }

    async convertToBaseCurrency(ccy: Currency, amount: bigint) {
        assertNonNullish(this.currencyController);
        return this.currencyController.read.convertToBaseCurrency([
            this.convertCurrencyToBytes32(ccy),
            amount,
        ]);
    }

    async getUsedCurrencies(account: string) {
        assertNonNullish(this.tokenVault);
        return this.tokenVault.read.getUsedCurrencies([account as Hex]);
    }

    async getTokenAllowance(token: Token, owner: string) {
        assertNonNullish(this.tokenVault);

        const tokenContract = await this.getTokenContract(token);
        const spender = this.tokenVault.address;
        return tokenContract.read.allowance([owner as Hex, spender]);
    }

    async getBorrowOrderBook(
        currency: Currency,
        maturity: number,
        limit: number
    ) {
        assertNonNullish(this.lendingMarketReader);
        return this.lendingMarketReader.read.getBorrowOrderBook([
            this.convertCurrencyToBytes32(currency),
            BigInt(maturity),
            BigInt(limit),
        ]);
    }

    async getLendOrderBook(
        currency: Currency,
        maturity: number,
        limit: number
    ) {
        assertNonNullish(this.lendingMarketReader);
        return this.lendingMarketReader.read.getLendOrderBook([
            this.convertCurrencyToBytes32(currency),
            BigInt(maturity),
            BigInt(limit),
        ]);
    }

    // Mock ERC20 token related functions
    async mintERC20Token(token: Token) {
        assertNonNullish(this.tokenFaucet);
        assertNonNullish(this.config.walletClient?.account?.address);
        return this.tokenFaucet.write.mint(
            [this.convertCurrencyToBytes32(token)],
            {
                account: this.config.walletClient.account.address,
                chain: this.config.walletClient.chain,
            }
        );
    }

    async getERC20TokenContractAddress(token: Token) {
        assertNonNullish(this.tokenFaucet);
        return this.tokenFaucet.read.getCurrencyAddress([
            this.convertCurrencyToBytes32(token),
        ]);
    }

    get config() {
        assertNonNullish(this._config);
        return this._config;
    }

    async getCurrencies() {
        assertNonNullish(this.currencyController);
        return this.currencyController.read.getCurrencies();
    }

    async getCollateralCurrencies() {
        assertNonNullish(this.tokenVault);
        return this.tokenVault.read.getCollateralCurrencies();
    }

    async getERC20Balance(token: Token, account: string) {
        const tokenContract = await this.getTokenContract(token);
        return tokenContract.read.balanceOf([account as Hex]);
    }

    async getCollateralBook(account: string) {
        assertNonNullish(this.tokenVault);
        const currencies = await this.getCurrencies();
        let collateral: Record<string, bigint> = {};

        if (currencies && currencies.length) {
            await Promise.all(
                currencies.map(async ccy => {
                    assertNonNullish(this.tokenVault);
                    const balance = await this.tokenVault.read.getDepositAmount(
                        [account as Hex, ccy]
                    );
                    collateral = {
                        ...collateral,
                        [this.parseBytes32String(ccy)]: balance,
                    };
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
        assertNonNullish(this.tokenVault);
        return await this.tokenVault.read.getCoverage([account as Hex]);
    }

    private async approveTokenTransfer(ccy: Currency, amount: bigint) {
        assertNonNullish(this.tokenVault);
        assertNonNullish(this.config.walletClient?.account?.address);

        if (ccy.isToken) {
            const tokenContract = await this.getTokenContract(ccy);
            const owner = this.config.walletClient.account.address;
            const spender = this.tokenVault.address;
            const allowance = await tokenContract.read.allowance([
                owner,
                spender,
            ]);

            if (allowance <= amount) {
                await tokenContract.write.approve(
                    [spender, maxInt256 - amount],
                    {
                        account: this.config.walletClient.account.address,
                        chain: this.config.walletClient.chain,
                    }
                );
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
        assertNonNullish(this.tokenVault);
        return this.tokenVault.read.getTotalDepositAmount([
            this.convertCurrencyToBytes32(currency),
        ]);
    }

    async getProtocolDepositAmount() {
        assertNonNullish(this.tokenVault);
        const currencyList = await this.getCurrencies();

        const totalDepositAmounts = await Promise.allSettled(
            currencyList.map(currency =>
                this.tokenVault?.read.getTotalDepositAmount([currency])
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

    async unwindPosition(currency: Currency, maturity: number) {
        assertNonNullish(this.lendingMarketController);
        assertNonNullish(this.config.walletClient?.account?.address);

        return this.lendingMarketController.write.unwindPosition(
            [this.convertCurrencyToBytes32(currency), BigInt(maturity)],
            {
                account: this.config.walletClient.account.address,
                chain: this.config.walletClient.chain,
            }
        );
    }

    async getOrderFeeRate(currency: Currency) {
        assertNonNullish(this.lendingMarketController);
        return this.lendingMarketController.read.getOrderFeeRate([
            this.convertCurrencyToBytes32(currency),
        ]);
    }

    async getOrderBookId(currency: Currency, maturity: number) {
        assertNonNullish(this.lendingMarketController);

        return this.lendingMarketController.read.getOrderBookId([
            this.convertCurrencyToBytes32(currency),
            BigInt(maturity),
        ]);
    }

    async getOrderList(account: string, usedCurrenciesForOrders: Currency[]) {
        assertNonNullish(this.lendingMarketReader);

        return this.lendingMarketReader.read.getOrders([
            this.convertCurrencyArrayToBytes32Array(usedCurrenciesForOrders),
            account as Hex,
        ]);
    }

    async getPositions(account: string, usedCurrenciesForOrders: Currency[]) {
        assertNonNullish(this.lendingMarketReader);
        return this.lendingMarketReader.read.getPositions([
            this.convertCurrencyArrayToBytes32Array(usedCurrenciesForOrders),
            account as Hex,
        ]);
    }

    async getUsedCurrenciesForOrders(account: string) {
        assertNonNullish(this.lendingMarketController);
        return this.lendingMarketController.read.getUsedCurrencies([
            account as Hex,
        ]);
    }

    async executeLiquidationCall(
        collateralCcy: Currency,
        debtCcy: Currency,
        debtMaturity: number,
        account: string
    ) {
        assertNonNullish(this.lendingMarketController);
        assertNonNullish(this.config.walletClient?.account?.address);
        return this.lendingMarketController.write.executeLiquidationCall(
            [
                this.convertCurrencyToBytes32(collateralCcy),
                this.convertCurrencyToBytes32(debtCcy),
                BigInt(debtMaturity),
                account as Hex,
            ],
            {
                account: this.config.walletClient.account.address,
                chain: this.config.walletClient.chain,
            }
        );
    }

    async getLastPrice(currency: Currency) {
        assertNonNullish(this.currencyController);
        return this.currencyController.read.getLastPrice([
            this.convertCurrencyToBytes32(currency),
        ]);
    }

    async getTotalCollateralAmount(account: string) {
        assertNonNullish(this.tokenVault);
        return this.tokenVault.read.getTotalCollateralAmount([account as Hex]);
    }
}
