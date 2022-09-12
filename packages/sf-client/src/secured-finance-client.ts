import { Network } from '@ethersproject/networks';
import { Provider } from '@ethersproject/providers';
import { Currency, Ether } from '@secured-finance/sf-core';
import { BigNumber, getDefaultProvider, Signer } from 'ethers';
import { ContractsInstance } from './contracts-instance';
import { NetworkName, networkNames, sendEther, toBytes32 } from './utils';

type NonNullable<T> = T extends null | undefined ? never : T;
const CLIENT_NOT_INITIALIZED = 'Client is not initialized';

function assertNonNullish<TValue>(
    value: TValue | null,
    message: string
): asserts value is NonNullable<TValue> {
    if (!value) {
        throw new Error(message);
    }
}

export class SecuredFinanceClient extends ContractsInstance {
    private convertCurrencyToBytes32(ccy: Currency) {
        if (ccy.isNative) {
            return toBytes32(ccy.symbol);
        } else {
            return toBytes32(ccy.wrapped.symbol);
        }
    }

    private _config: {
        defaultGas: number;
        defaultGasPrice: number;
        network: string;
        networkId: number;
        signerOrProvider: Signer | Provider;
    } | null = null;

    ether: Ether | null = null;

    async init(
        signerOrProvider: Signer | Provider,
        network: Network,
        options?: { defaultGas?: number; defaultGasPrice?: number }
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

    async registerUser() {
        assertNonNullish(this.tokenVault, CLIENT_NOT_INITIALIZED);
        return this.tokenVault.contract;
    }

    /**
     * Deposit collateral into the vault.
     *
     * @param ccy the collateral currency to deposit
     * @param amount the amount of collateral to deposit
     * @returns a `ContractTransaction`
     * @throws if the client is not initialized
     */
    async depositCollateral(ccy: Currency, amount: number | BigNumber) {
        assertNonNullish(this.config, CLIENT_NOT_INITIALIZED);
        assertNonNullish(this.tokenVault, CLIENT_NOT_INITIALIZED);
        const payableOverride = ccy.equals(Ether.onChain(this.config.networkId))
            ? { value: amount }
            : undefined;
        return this.tokenVault.contract.deposit(
            this.convertCurrencyToBytes32(ccy),
            amount,
            payableOverride
        );
    }

    async withdrawCollateral(ccy: Currency, amount: number | BigNumber) {
        assertNonNullish(this.tokenVault, CLIENT_NOT_INITIALIZED);
        return this.tokenVault.contract.withdraw(
            this.convertCurrencyToBytes32(ccy),
            amount
        );
    }

    async getBorrowYieldCurve(ccy: Currency) {
        assertNonNullish(this.lendingMarketController, CLIENT_NOT_INITIALIZED);
        return this.lendingMarketController.contract.getBorrowRates(
            this.convertCurrencyToBytes32(ccy)
        );
    }

    async getLendYieldCurve(ccy: Currency) {
        assertNonNullish(this.lendingMarketController, CLIENT_NOT_INITIALIZED);
        return this.lendingMarketController.contract.getLendRates(
            this.convertCurrencyToBytes32(ccy)
        );
    }

    async getMidRateYieldCurve(ccy: Currency) {
        assertNonNullish(this.lendingMarketController, CLIENT_NOT_INITIALIZED);
        return this.lendingMarketController.contract.getMidRates(
            this.convertCurrencyToBytes32(ccy)
        );
    }

    async placeLendingOrder(
        ccy: Currency,
        maturity: number | BigNumber,
        side: string,
        amount: number | BigNumber,
        rate: number | BigNumber
    ) {
        assertNonNullish(this.lendingMarketController, CLIENT_NOT_INITIALIZED);
        return this.lendingMarketController.contract.createOrder(
            this.convertCurrencyToBytes32(ccy),
            maturity,
            side,
            amount,
            rate
        );
    }

    async cancelLendingOrder(
        ccy: Currency,
        maturity: number | BigNumber,
        orderID: number | BigNumber
    ) {
        assertNonNullish(this.lendingMarketController, CLIENT_NOT_INITIALIZED);
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

    async getCollateralBook(account: string, ccy: Currency) {
        assertNonNullish(this.tokenVault, CLIENT_NOT_INITIALIZED);
        const ccyIdentifier = this.convertCurrencyToBytes32(ccy);
        const [collateralAmount, collateralCoverage] = await Promise.all([
            this.tokenVault.contract.getCollateralAmountInETH(
                account,
                ccyIdentifier
            ),
            this.tokenVault.contract.getCoverage(account),
        ]);

        return {
            collateralAmount,
            collateralCoverage,
        };
    }

    async getLendingMarket(ccy: Currency, maturity: number | BigNumber) {
        assertNonNullish(this.lendingMarkets, CLIENT_NOT_INITIALIZED);
        return await this.lendingMarkets.get(
            this.convertCurrencyToBytes32(ccy),
            maturity
        );
    }

    async getMaturities(ccy: Currency) {
        assertNonNullish(this.lendingMarketController, CLIENT_NOT_INITIALIZED);
        return this.lendingMarketController.contract.getMaturities(
            this.convertCurrencyToBytes32(ccy)
        );
    }

    get config() {
        assertNonNullish(this._config, CLIENT_NOT_INITIALIZED);
        return this._config;
    }
}
