import { Network } from '@ethersproject/networks';
import { Provider, TransactionResponse } from '@ethersproject/providers';
import { BigNumber, getDefaultProvider, Signer } from 'ethers';
import { ContractsInstance } from './contract-instance';
import {
    getCollateralVaultAddressByCcy,
    getLendingMarketAddressByCcyAndTerm,
    sendEther,
    toBytes32,
} from './utils';
import { NETWORKS } from './utils/networks';

export class SFClient {
    signerOrProvider: Signer | Provider;
    networkId: number;
    blockGasLimit: BigNumber;
    defaultGas: number;
    defaultGasPrice: number;
    network: string;
    contracts: ContractsInstance;

    constructor(
        signerOrProvider: Signer | Provider,
        network?: Network,
        options?: { defaultGas?: number; defaultGasPrice?: number }
    ) {
        this.defaultGas = options?.defaultGas || 6000000;
        this.defaultGasPrice = options?.defaultGasPrice || 1000000000000;

        this.signerOrProvider = signerOrProvider || getDefaultProvider();

        this.networkId = network.chainId;
        this.network = NETWORKS[this.networkId];

        const contractsInstance = new ContractsInstance(
            signerOrProvider,
            network.chainId
        );
        this.contracts = contractsInstance;
    }

    async checkRegisteredUser(account: string) {
        return this.contracts.collateralAggregator.checkRegisteredUser(account);
    }

    async registerUser() {
        return this.contracts.collateralAggregator.register();
    }

    async registerUserWithCrosschainAddresses(
        addresses: string[],
        chainIds: number[] | BigNumber[]
    ) {
        return this.contracts.collateralAggregator.registerWithCrosschainAddresses(
            addresses,
            chainIds
        );
    }

    async depositCollateral(ccy: string, amount: number | BigNumber) {
        const vaultAddress = getCollateralVaultAddressByCcy(
            ccy,
            this.networkId
        );

        const collateralVault =
            this.contracts.collateralVaults[vaultAddress].contract;

        if (ccy === 'ETH') {
            return collateralVault.contract.functions['deposit(uint256)'](
                amount,
                { value: amount }
            );
        } else {
            return collateralVault.deposit(amount);
        }
    }

    async depositCollateralIntoPosition(
        ccy: string,
        counterparty: string,
        amount: number | BigNumber
    ) {
        const vaultAddress = getCollateralVaultAddressByCcy(
            ccy,
            this.networkId
        );

        const collateralVault =
            this.contracts.collateralVaults[vaultAddress].contract;

        if (ccy === 'ETH') {
            return collateralVault.contract.functions[
                'deposit(address,uint256)'
            ](counterparty, amount);
        } else {
            return collateralVault.depositIntoPosition(counterparty, amount);
        }
    }

    async withdrawCollateral(ccy: string, amount: number | BigNumber) {
        const vaultAddress = getCollateralVaultAddressByCcy(
            ccy,
            this.networkId
        );

        const collateralVault =
            this.contracts.collateralVaults[vaultAddress].contract;

        return collateralVault.withdraw(amount);
    }

    async withdrawCollateralFromPosition(
        ccy: string,
        counterparty: string,
        amount: number | BigNumber
    ) {
        const vaultAddress = getCollateralVaultAddressByCcy(
            ccy,
            this.networkId
        );

        const collateralVault =
            this.contracts.collateralVaults[vaultAddress].contract;

        return collateralVault.withdrawFromPosition(counterparty, amount);
    }

    async updateCrosschainAddress(chainId: string | number, address: string) {
        return this.contracts.crosschainAddressResolver.updateAddress(
            chainId,
            address
        );
    }

    getBorrowYieldCurve = async (ccy: string) => {
        const ccyIdentifier = toBytes32(ccy);
        return this.contracts.lendingMarketController.getBorrowRatesForCcy(
            ccyIdentifier
        );
    };

    getLendYieldCurve = async (ccy: string) => {
        const ccyIdentifier = toBytes32(ccy);
        return this.contracts.lendingMarketController.getLendRatesForCcy(
            ccyIdentifier
        );
    };

    getMidRateYieldCurve = async (ccy: string) => {
        const ccyIdentifier = toBytes32(ccy);
        return this.contracts.lendingMarketController.getMidRatesForCcy(
            ccyIdentifier
        );
    };

    getDiscountYieldCurve = async (ccy: string) => {
        const ccyIdentifier = toBytes32(ccy);
        return this.contracts.lendingMarketController.getDiscountFactorsForCcy(
            ccyIdentifier
        );
    };

    placeLendingOrder = async (
        ccy: string,
        term: string,
        side: number,
        amount: number | BigNumber,
        rate: number | BigNumber
    ) => {
        const marketAddress = getLendingMarketAddressByCcyAndTerm(
            ccy,
            term,
            this.networkId
        );

        const lendingMarket =
            this.contracts.lendingMarkets[marketAddress].contract;

        return lendingMarket.order(side, amount, rate);
    };

    cancelLendingOrder = async (
        ccy: string,
        term: string,
        orderID: number | BigNumber
    ) => {
        const marketAddress = getLendingMarketAddressByCcyAndTerm(
            ccy,
            term,
            this.networkId
        );

        const lendingMarket =
            this.contracts.lendingMarkets[marketAddress].contract;

        return lendingMarket.cancelOrder(orderID);
    };

    verifyPayment = async (
        counterparty: string,
        ccy: string,
        amount: number | BigNumber,
        timestamp: number | BigNumber,
        txHash: string
    ) => {
        const ccyIdentifier = toBytes32(ccy);

        return this.contracts.settlementEngine.verifyPayment(
            counterparty,
            ccyIdentifier,
            amount,
            timestamp,
            txHash
        );
    };

    sendEther = async (
        amount: number | BigNumber,
        to: string,
        gasPrice?: number | BigNumber
    ): Promise<TransactionResponse> | undefined => {
        let signer: Signer;

        if (Signer.isSigner(this.signerOrProvider)) {
            signer = this.signerOrProvider;
        } else {
            console.error('signer is required for sending transaction');
            return;
        }

        return sendEther(signer, amount, to, gasPrice);
    };
}
