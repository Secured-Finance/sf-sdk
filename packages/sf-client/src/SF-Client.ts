import { Network } from '@ethersproject/networks';
import { Provider } from '@ethersproject/providers';
import { BigNumber, getDefaultProvider, Signer } from 'ethers';
import { ContractsInstance } from './contract-instance';
import {
    getCollateralVaultAddressByCcy,
    getLendingMarketAddressByCcyAndTerm,
    toBytes32,
} from './utils';
import { NETWORKS } from './utils/networks';

export class SFClient {
    signerOrProvider: any;
    networkId: number;
    blockGasLimit: BigNumber;
    defaultGas: number;
    defaultGasPrice: number;
    network: string;
    contracts: ContractsInstance;

    constructor(
        signerOrProvider: Signer | Provider,
        network?: Network,
        options?: { defaultGas?: number; defaultGasPrice?: any }
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

    async checkRegisteredUser(account: string): Promise<boolean> {
        return this.contracts.collateralAggregator.checkRegisteredUser(account);
    }

    async registerUser(): Promise<any> {
        return this.contracts.collateralAggregator.register();
    }

    async registerUserWithCrosschainAddresses(
        addresses: string[],
        chainIds: number[] | BigNumber[]
    ): Promise<any> {
        return this.contracts.collateralAggregator.registerWithCrosschainAddresses(
            addresses,
            chainIds
        );
    }

    async depositCollateral(
        ccy: string,
        amount: number | BigNumber
    ): Promise<any> {
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
    ): Promise<any> {
        const vaultAddress = getCollateralVaultAddressByCcy(
            ccy,
            this.networkId
        );

        const collateralVault =
            this.contracts.collateralVaults[vaultAddress].contract;

        if (ccy === 'ETH') {
            return collateralVault.contract.functions[
                'deposit(address,uint256)'
            ](counterparty, amount, { value: amount });
        } else {
            return collateralVault.depositIntoPosition(counterparty, amount);
        }
    }

    async withdrawCollateral(
        ccy: string,
        amount: number | BigNumber
    ): Promise<any> {
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
    ): Promise<any> {
        const vaultAddress = getCollateralVaultAddressByCcy(
            ccy,
            this.networkId
        );

        const collateralVault =
            this.contracts.collateralVaults[vaultAddress].contract;

        return collateralVault.withdrawFromPosition(counterparty, amount);
    }

    async updateCrosschainAddress(
        chainId: string | number | BigInt,
        address: string
    ): Promise<any> {
        return this.contracts.crosschainAddressResolver.updateAddress(
            chainId,
            address
        );
    }

    getBorrowYieldCurve = async (ccy: string): Promise<BigNumber[]> => {
        const ccyIdentifier = toBytes32(ccy);
        return this.contracts.lendingMarketController.getBorrowRatesForCcy(
            ccyIdentifier
        );
    };

    getLendYieldCurve = async (ccy: string): Promise<BigNumber[]> => {
        const ccyIdentifier = toBytes32(ccy);
        return this.contracts.lendingMarketController.getLendRatesForCcy(
            ccyIdentifier
        );
    };

    getMidRateYieldCurve = async (ccy: string): Promise<BigNumber[]> => {
        const ccyIdentifier = toBytes32(ccy);
        return this.contracts.lendingMarketController.getMidRatesForCcy(
            ccyIdentifier
        );
    };

    getDiscountYieldCurve = async (ccy: string): Promise<BigNumber[]> => {
        const ccyIdentifier = toBytes32(ccy);
        return this.contracts.lendingMarketController.getDiscountFactorsForCcy(
            ccyIdentifier
        );
    };

    makeLendingOrder = async (
        ccy: string,
        term: string,
        side: number,
        amount: number | BigNumber,
        rate: number | BigNumber
    ): Promise<any> => {
        const marketAddress = getLendingMarketAddressByCcyAndTerm(
            ccy,
            term,
            this.networkId
        );

        const lendingMarket =
            this.contracts.lendingMarkets[marketAddress].contract;

        return lendingMarket.makeOrder(side, amount, rate);
    };

    takeLendingOrder = async (
        ccy: string,
        term: string,
        side: number,
        orderID: number | BigNumber,
        amount: number | BigNumber
    ): Promise<any> => {
        const marketAddress = getLendingMarketAddressByCcyAndTerm(
            ccy,
            term,
            this.networkId
        );

        const lendingMarket =
            this.contracts.lendingMarkets[marketAddress].contract;

        return lendingMarket.takeOrder(side, orderID, amount);
    };

    placeLendingOrder = async (
        ccy: string,
        term: string,
        side: number,
        amount: number | BigNumber,
        rate: number | BigNumber
    ): Promise<any> => {
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
    ): Promise<any> => {
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
    ): Promise<any> => {
        const ccyIdentifier = toBytes32(ccy);

        return this.contracts.settlementEngine.verifyPayment(
            counterparty,
            ccyIdentifier,
            amount,
            timestamp,
            txHash
        );
    };
}
