import { Network } from '@ethersproject/networks';
import { Provider, TransactionResponse } from '@ethersproject/providers';
import { BigNumber, getDefaultProvider, Signer } from 'ethers';
import { ContractsInstance } from './contracts-instance';
import { sendEther, toBytes32 } from './utils';
import { NETWORKS } from './utils/networks';

export class SecuredFinanceClient extends ContractsInstance {
    config: {
        defaultGas: number;
        defaultGasPrice: number;
        network: string;
        networkId: number;
        signerOrProvider: Signer | Provider;
    };

    async init(
        signerOrProvider: Signer | Provider,
        network?: Network,
        options?: { defaultGas?: number; defaultGasPrice?: number }
    ) {
        this.config = {
            defaultGas: options?.defaultGas || 6000000,
            defaultGasPrice: options?.defaultGasPrice || 1000000000000,
            networkId: network.chainId,
            network: NETWORKS[network.chainId],
            signerOrProvider: signerOrProvider || getDefaultProvider(),
        };
        await super.getInstances(signerOrProvider, network.name);
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

    async depositCollateral(ccy: string, amount: number | BigNumber) {
        if (ccy === 'ETH') {
            return this.collateralVault.contract['deposit(bytes32,uint256)'](
                ccy,
                amount,
                { value: amount }
            );
        } else {
            return this.collateralVault.contract['deposit(bytes32,uint256)'](
                ccy,
                amount
            );
        }
    }

    async depositCollateralIntoPosition(
        counterparty: string,
        ccy: string,
        amount: number | BigNumber
    ) {
        return this.collateralVault.contract[
            'deposit(address,bytes32,uint256)'
        ](counterparty, ccy, amount);
    }

    async withdrawCollateral(ccy: string, amount: number | BigNumber) {
        return this.collateralVault.contract.withdraw(ccy, amount);
    }

    async withdrawCollateralFromPosition(
        counterparty: string,
        ccy: string,
        amount: number | BigNumber
    ) {
        return this.collateralVault.contract.withdrawFrom(
            counterparty,
            ccy,
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

    async getBorrowYieldCurve(ccy: string) {
        const ccyIdentifier = toBytes32(ccy);
        return this.lendingMarketController.contract.getBorrowRatesForCcy(
            ccyIdentifier
        );
    }

    async getLendYieldCurve(ccy: string) {
        const ccyIdentifier = toBytes32(ccy);
        return this.lendingMarketController.contract.getLendRatesForCcy(
            ccyIdentifier
        );
    }

    async getMidRateYieldCurve(ccy: string) {
        const ccyIdentifier = toBytes32(ccy);
        return this.lendingMarketController.contract.getMidRatesForCcy(
            ccyIdentifier
        );
    }

    async getDiscountYieldCurve(ccy: string) {
        const ccyIdentifier = toBytes32(ccy);
        return this.lendingMarketController.contract.getDiscountFactorsForCcy(
            ccyIdentifier
        );
    }

    async placeLendingOrder(
        ccy: string,
        term: string,
        side: number,
        amount: number | BigNumber,
        rate: number | BigNumber
    ) {
        const lendingMarket = await this.lendingMarkets.get(ccy, term);

        return lendingMarket.contract.order(side, amount, rate);
    }

    async cancelLendingOrder(
        ccy: string,
        term: string,
        orderID: number | BigNumber
    ) {
        const lendingMarket = await this.lendingMarkets.get(ccy, term);

        return lendingMarket.contract.cancelOrder(orderID);
    }

    async verifyPayment(
        counterparty: string,
        ccy: string,
        amount: number | BigNumber,
        timestamp: number | BigNumber,
        txHash: string
    ) {
        const ccyIdentifier = toBytes32(ccy);

        return this.settlementEngine.contract.verifyPayment(
            counterparty,
            ccyIdentifier,
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

    async getCollateralBook(account: string, ccy: string) {
        const [independentCollateral, lockedCollateral] = await Promise.all([
            this.collateralVault.contract.getIndependentCollateralInETH(
                account,
                ccy
            ),
            this.collateralVault.contract[
                'getLockedCollateral(address,bytes32)'
            ](account, ccy),
        ]);

        return {
            independentCollateral,
            lockedCollateral,
        };
    }
}
