import { Network } from '@ethersproject/networks';
import { Provider, TransactionResponse } from '@ethersproject/providers';
import { Currency, Ether } from '@secured-finance/sf-core';
import { BigNumber, getDefaultProvider, Signer } from 'ethers';
import { ContractsInstance } from './contracts-instance';
import { NetworkName, networkNames, sendEther, toBytes32 } from './utils';

export class SecuredFinanceClient extends ContractsInstance {
    private convertCurrencyToBytes32(ccy: Currency) {
        if (ccy.isNative) {
            return toBytes32(ccy.symbol);
        } else {
            return toBytes32(ccy.wrapped.symbol);
        }
    }

    config: {
        defaultGas: number;
        defaultGasPrice: number;
        network: string;
        networkId: number;
        signerOrProvider: Signer | Provider;
    };

    ether: Ether;

    async init(
        signerOrProvider: Signer | Provider,
        network: Network,
        options?: { defaultGas?: number; defaultGasPrice?: number }
    ) {
        const networkName = network.name as NetworkName;

        if (!networkNames.includes(networkName)) {
            throw new Error(`${networkName} is not supported.`);
        }

        this.config = {
            defaultGas: options?.defaultGas || 6000000,
            defaultGasPrice: options?.defaultGasPrice || 1000000000000,
            networkId: network.chainId,
            network: networkName,
            signerOrProvider: signerOrProvider || getDefaultProvider(),
        };
        await super.getInstances(signerOrProvider, networkName);

        this.ether = new Ether(network.chainId);
    }

    async checkRegisteredUser(account: string) {
        return this.collateralAggregator.contract.checkRegisteredUser(account);
    }

    async registerUser() {
        return this.collateralAggregator.register();
    }

    async registerUserWithCrosschainAddresses(
        addresses: string[],
        chainIds: number[] | BigNumber[]
    ) {
        return this.collateralAggregator.contract[
            'register(string[],uint256[])'
        ](addresses, chainIds);
    }

    /**
     * Deposit collateral into the vault.
     *
     * @param ccy the collateral currency to deposit
     * @param amount the amount of collateral to deposit
     * @returns a `ContractTransaction`
     */
    async depositCollateral(ccy: Currency, amount: number | BigNumber) {
        const payableOverride = ccy.equals(this.ether)
            ? { value: amount }
            : undefined;
        return this.collateralVault.deposit(
            this.convertCurrencyToBytes32(ccy),
            amount,
            payableOverride
        );
    }

    async withdrawCollateral(ccy: Currency, amount: number | BigNumber) {
        return this.collateralVault.contract.withdraw(
            this.convertCurrencyToBytes32(ccy),
            amount
        );
    }

    async updateCrosschainAddress(chainId: string | number, address: string) {
        return this.crosschainAddressResolver.contract[
            'updateAddress(uint256,string)'
        ](chainId, address);
    }

    async getCrosschainAddress(chainId: string | number, address: string) {
        return this.crosschainAddressResolver.contract.getUserAddress(
            address,
            chainId
        );
    }

    async getBorrowYieldCurve(ccy: Currency) {
        return this.lendingMarketController.contract.getBorrowRatesForCcy(
            this.convertCurrencyToBytes32(ccy)
        );
    }

    async getLendYieldCurve(ccy: Currency) {
        return this.lendingMarketController.contract.getLendRatesForCcy(
            this.convertCurrencyToBytes32(ccy)
        );
    }

    async getMidRateYieldCurve(ccy: Currency) {
        return this.lendingMarketController.contract.getMidRatesForCcy(
            this.convertCurrencyToBytes32(ccy)
        );
    }

    async getDiscountYieldCurve(ccy: Currency) {
        return this.lendingMarketController.contract.getDiscountFactorsForCcy(
            this.convertCurrencyToBytes32(ccy)
        );
    }

    async placeLendingOrder(
        ccy: Currency,
        term: string,
        side: number,
        amount: number | BigNumber,
        rate: number | BigNumber
    ) {
        const lendingMarket = await this.lendingMarkets.get(
            this.convertCurrencyToBytes32(ccy),
            term
        );

        return lendingMarket.contract.order(side, amount, rate);
    }

    async cancelLendingOrder(
        ccy: Currency,
        term: string,
        orderID: number | BigNumber
    ) {
        const lendingMarket = await this.lendingMarkets.get(
            this.convertCurrencyToBytes32(ccy),
            term
        );

        return lendingMarket.contract.cancelOrder(orderID);
    }

    async verifyPayment(
        counterparty: string,
        ccy: Currency,
        amount: number | BigNumber,
        timestamp: number | BigNumber,
        txHash: string
    ) {
        return this.settlementEngine.contract.verifyPayment(
            counterparty,
            this.convertCurrencyToBytes32(ccy),
            amount,
            timestamp,
            txHash
        );
    }

    async sendEther(
        amount: number | BigNumber,
        to: string,
        gasPrice?: number | BigNumber
    ): Promise<TransactionResponse> | undefined {
        let signer: Signer;

        if (Signer.isSigner(this.config.signerOrProvider)) {
            signer = this.config.signerOrProvider;
        } else {
            console.error('signer is required for sending transaction');
            return;
        }

        return sendEther(signer, amount, to, gasPrice);
    }

    async getCollateralBook(account: string, ccy: Currency) {
        const ccyIdentifier = this.convertCurrencyToBytes32(ccy);
        const [independentCollateral, lockedCollateral] = await Promise.all([
            this.collateralVault.contract.getIndependentCollateralInETH(
                account,
                ccyIdentifier
            ),
            this.collateralVault.contract[
                'getLockedCollateral(address,bytes32)'
            ](account, ccyIdentifier),
        ]);

        return {
            independentCollateral,
            lockedCollateral,
        };
    }

    async getLendingMarket(ccy: Currency, term: string) {
        return await this.lendingMarkets.get(
            this.convertCurrencyToBytes32(ccy),
            term
        );
    }
}
