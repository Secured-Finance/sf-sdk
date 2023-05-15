import { Network } from '@ethersproject/networks';
import { Provider } from '@ethersproject/providers';
import {
    Currency,
    Ether,
    getUTCMonthYear,
    Token,
} from '@secured-finance/sf-core';
import ERC20 from '@secured-finance/smart-contracts/build/contracts/mocks/tokens/MockERC20.sol/MockERC20.json';
import {
    BigNumber,
    constants,
    Contract,
    getDefaultProvider,
    Signer,
    utils,
} from 'ethers';
import { ContractsInstance } from './contracts-instance';
import { SecuredFinanceClientConfig } from './entities';
import { MockERC20 } from './types';
import { NetworkName, networkNames, sendEther } from './utils';

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
    value: TValue | null,
    message = CLIENT_NOT_INITIALIZED
): asserts value is NonNullable<TValue> {
    if (!value) {
        throw new Error(message);
    }
}

export class SecuredFinanceClient extends ContractsInstance {
    private convertCurrencyToBytes32(ccy: Currency) {
        if (ccy.isNative) {
            return utils.formatBytes32String(ccy.symbol);
        } else {
            return utils.formatBytes32String(ccy.wrapped.symbol);
        }
    }

    private parseBytes32String(ccy: string) {
        return utils.parseBytes32String(ccy);
    }

    private _config: SecuredFinanceClientConfig | null = null;

    ether: Ether | null = null;

    async init(
        signerOrProvider: Signer | Provider,
        network: Network,
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
            signerOrProvider: signerOrProvider || getDefaultProvider(),
        };
        await super.getInstances(signerOrProvider, networkName);
    }

    /**
     * Deposit collateral into the vault.
     *
     * @param ccy the collateral currency to deposit
     * @param amount the amount of collateral to deposit
     * @returns a `ContractTransaction`
     * @throws if the client is not initialized
     */

    async getCollateralParameters() {
        assertNonNullish(this.tokenVault);
        return this.tokenVault.contract.getCollateralParameters();
    }

    async depositCollateral(
        ccy: Currency,
        amount: number | BigNumber,
        onApproved?: (isApproved: boolean) => Promise<void> | void
    ) {
        assertNonNullish(this.config);
        assertNonNullish(this.tokenVault);

        const isApproved = await this.approveTokenTransfer(ccy, amount);
        await onApproved?.(isApproved);

        const payableOverride = ccy.equals(Ether.onChain(this.config.networkId))
            ? { value: amount }
            : {};
        return this.tokenVault.contract.deposit(
            this.convertCurrencyToBytes32(ccy),
            amount,
            payableOverride
        );
    }

    async withdrawCollateral(ccy: Currency, amount: number | BigNumber) {
        assertNonNullish(this.tokenVault);
        return this.tokenVault.contract.withdraw(
            this.convertCurrencyToBytes32(ccy),
            amount
        );
    }

    async getLendUnitPrices(ccy: Currency) {
        assertNonNullish(this.lendingMarketController);
        return this.lendingMarketController.contract.getLendUnitPrices(
            this.convertCurrencyToBytes32(ccy)
        );
    }

    async getBorrowUnitPrices(ccy: Currency) {
        assertNonNullish(this.lendingMarketController);
        return this.lendingMarketController.contract.getBorrowUnitPrices(
            this.convertCurrencyToBytes32(ccy)
        );
    }

    async getMidUnitPrices(ccy: Currency) {
        assertNonNullish(this.lendingMarketController);
        return this.lendingMarketController.contract.getMidUnitPrices(
            this.convertCurrencyToBytes32(ccy)
        );
    }

    async getMaturities(ccy: Currency) {
        assertNonNullish(this.lendingMarketController);
        return this.lendingMarketController.contract.getMaturities(
            this.convertCurrencyToBytes32(ccy)
        );
    }

    async getLendingMarkets(ccy: Currency) {
        assertNonNullish(this.lendingMarketController);
        const ccyIdentifier = this.convertCurrencyToBytes32(ccy);
        const lendingMarketAddresses =
            await this.lendingMarketController.contract.getLendingMarkets(
                ccyIdentifier
            );
        return Promise.all(
            lendingMarketAddresses.map(async address => {
                assertNonNullish(this.lendingMarkets);
                const lendingMarket = await this.lendingMarkets.get(address);
                const marketInfo = await lendingMarket.contract.getMarket();
                return {
                    ...marketInfo,
                    name: getUTCMonthYear(marketInfo.maturity.toNumber()),
                };
            })
        );
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
        amount: number | BigNumber,
        sourceWallet: WalletSource,
        unitPrice?: number,
        onApproved?: (isApproved: boolean) => Promise<void> | void
    ) {
        assertNonNullish(this.lendingMarketController);
        if (side === OrderSide.LEND && sourceWallet === WalletSource.METAMASK) {
            if (ccy.equals(Ether.onChain(this.config.networkId))) {
                return this.lendingMarketController.contract.depositAndCreateOrder(
                    this.convertCurrencyToBytes32(ccy),
                    maturity,
                    side,
                    amount,
                    unitPrice ?? 0,
                    { value: amount }
                );
            } else {
                const isApproved = await this.approveTokenTransfer(ccy, amount);
                await onApproved?.(isApproved);
                return this.lendingMarketController.contract.depositAndCreateOrder(
                    this.convertCurrencyToBytes32(ccy),
                    maturity,
                    side,
                    amount,
                    unitPrice ?? 0
                );
            }
        } else {
            return this.lendingMarketController.contract.createOrder(
                this.convertCurrencyToBytes32(ccy),
                maturity,
                side,
                amount,
                unitPrice ?? 0
            );
        }
    }

    async placePreOrder(
        ccy: Currency,
        maturity: number,
        side: OrderSide,
        amount: number | BigNumber,
        sourceWallet: WalletSource,
        unitPrice: number,
        onApproved?: (isApproved: boolean) => Promise<void> | void
    ) {
        assertNonNullish(this.lendingMarketController);
        if (side === OrderSide.LEND && sourceWallet === WalletSource.METAMASK) {
            if (ccy.equals(Ether.onChain(this.config.networkId))) {
                return this.lendingMarketController.contract.depositAndCreatePreOrder(
                    this.convertCurrencyToBytes32(ccy),
                    maturity,
                    side,
                    amount,
                    unitPrice,
                    { value: amount }
                );
            } else {
                const isApproved = await this.approveTokenTransfer(ccy, amount);
                await onApproved?.(isApproved);
                return this.lendingMarketController.contract.depositAndCreatePreOrder(
                    this.convertCurrencyToBytes32(ccy),
                    maturity,
                    side,
                    amount,
                    unitPrice
                );
            }
        } else {
            return this.lendingMarketController.contract.createPreOrder(
                this.convertCurrencyToBytes32(ccy),
                maturity,
                side,
                amount,
                unitPrice
            );
        }
    }

    async cancelLendingOrder(
        ccy: Currency,
        maturity: number,
        orderID: number | BigNumber
    ) {
        assertNonNullish(this.lendingMarketController);
        return this.lendingMarketController.contract.cancelOrder(
            this.convertCurrencyToBytes32(ccy),
            maturity,
            orderID
        );
    }

    async sendEther(
        amount: number | BigNumber,
        to: string,
        gasPrice?: number | BigNumber
    ) {
        let signer: Signer;
        assertNonNullish(this.config, 'Client is not initialized');

        if (Signer.isSigner(this.config.signerOrProvider)) {
            signer = this.config.signerOrProvider;
        } else {
            console.error('signer is required for sending transaction');
            return;
        }

        return sendEther(signer, amount, to, gasPrice);
    }

    async convertToBaseCurrency(ccy: Currency, amount: number | BigNumber) {
        assertNonNullish(this.lendingMarketController);
        return this.currencyController?.contract[
            'convertToBaseCurrency(bytes32,int256)'
        ](this.convertCurrencyToBytes32(ccy), amount);
    }

    async getUsedCurrencies(account: string) {
        assertNonNullish(this.tokenVault);
        return this.tokenVault.contract.getUsedCurrencies(account);
    }

    async getTokenAllowance(token: Token, owner: string) {
        assertNonNullish(this.tokenVault);

        const tokenContract = await this.getTokenContract(token);
        const spender = this.tokenVault.contract.address;
        return tokenContract.allowance(owner, spender);
    }

    async getBorrowOrderBook(
        currency: Currency,
        maturity: number,
        limit: number
    ) {
        assertNonNullish(this.lendingMarketController);
        return this.lendingMarketController.contract.getBorrowOrderBook(
            this.convertCurrencyToBytes32(currency),
            maturity,
            limit
        );
    }

    async getLendOrderBook(
        currency: Currency,
        maturity: number,
        limit: number
    ) {
        assertNonNullish(this.lendingMarketController);
        return this.lendingMarketController.contract.getLendOrderBook(
            this.convertCurrencyToBytes32(currency),
            maturity,
            limit
        );
    }

    // Mock ERC20 token related functions
    async mintERC20Token(token: Token) {
        assertNonNullish(this.tokenFaucet);
        return this.tokenFaucet.contract.mint(
            this.convertCurrencyToBytes32(token)
        );
    }

    async getERC20TokenContractAddress(token: Token) {
        assertNonNullish(this.tokenFaucet);
        return this.tokenFaucet.contract.getCurrencyAddress(
            this.convertCurrencyToBytes32(token)
        );
    }

    get config() {
        assertNonNullish(this._config);
        return this._config;
    }

    async getCurrencies() {
        assertNonNullish(this.currencyController);
        return this.currencyController.contract.getCurrencies();
    }

    async getCollateralCurrencies() {
        assertNonNullish(this.tokenVault);
        return this.tokenVault.contract.getCollateralCurrencies();
    }

    async getERC20Balance(token: Token, account: string) {
        const tokenContract = await this.getTokenContract(token);
        return tokenContract.balanceOf(account);
    }

    async getCollateralBook(account: string) {
        assertNonNullish(this.tokenVault);
        const currencies = await this.getCurrencies();
        let collateral: Record<string, BigNumber> = {};

        if (currencies && currencies.length) {
            await Promise.all(
                currencies.map(async ccy => {
                    assertNonNullish(this.tokenVault);
                    const balance =
                        await this.tokenVault.contract.getDepositAmount(
                            account,
                            ccy
                        );
                    collateral = {
                        ...collateral,
                        [this.parseBytes32String(ccy)]: balance,
                    };
                })
            );
        }

        const collateralCoverage = await this.tokenVault.contract.getCoverage(
            account
        );

        return {
            collateral,
            collateralCoverage,
        };
    }

    private async approveTokenTransfer(
        ccy: Currency,
        amount: number | BigNumber
    ) {
        assertNonNullish(this.tokenVault);
        if (!Signer.isSigner(this.config.signerOrProvider)) {
            throw new Error('Signer is not set');
        }

        if (ccy.isToken) {
            const tokenContract = await this.getTokenContract(ccy);
            const owner = await this.config.signerOrProvider.getAddress();
            const spender = this.tokenVault.contract.address;
            const allowance = await tokenContract.allowance(owner, spender);

            if (allowance.lte(amount)) {
                await tokenContract
                    .approve(spender, constants.MaxUint256.sub(amount))
                    .then(tx => tx.wait());
                return true;
            }
        }
        return false;
    }

    private async getTokenContract(token: Token) {
        return new Contract(
            token.address,
            ERC20.abi,
            this.config.signerOrProvider
        ) as MockERC20;
    }

    async getTotalDepositAmount(currency: Currency) {
        assertNonNullish(this.tokenVault);
        return this.tokenVault.contract.getTotalDepositAmount(
            this.convertCurrencyToBytes32(currency)
        );
    }

    async getProtocolDepositAmount() {
        assertNonNullish(this.tokenVault);
        const currencyList = await this.getCurrencies();

        const totalDepositAmounts = await Promise.allSettled(
            currencyList.map(currency =>
                this.tokenVault?.contract.getTotalDepositAmount(currency)
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
        }, {} as Record<string, BigNumber>);
    }

    async unwindOrder(currency: Currency, maturity: number) {
        assertNonNullish(this.lendingMarketController);
        return this.lendingMarketController.contract.unwindOrder(
            this.convertCurrencyToBytes32(currency),
            maturity
        );
    }

    async getLendingMarket(currency: Currency, maturity: number) {
        assertNonNullish(this.lendingMarketController);
        assertNonNullish(this.lendingMarkets);

        const address =
            await this.lendingMarketController.contract.getLendingMarket(
                this.convertCurrencyToBytes32(currency),
                maturity
            );

        return (await this.lendingMarkets.get(address)).contract;
    }
}
