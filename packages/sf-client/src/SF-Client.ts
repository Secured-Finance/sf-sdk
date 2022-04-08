import { BigNumber, getDefaultProvider, Overrides, Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import { Network } from '@ethersproject/networks';

import { NETWORKS } from './utils/networks';
import { ContractsInstance } from './contract-instance';
import {
    getCollateralVaultByCcy,
    getLendingMarketByCcyAndTerm,
    toBytes32,
} from './utils';

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

    async registerUser(options?: Overrides): Promise<void> {
        return this.contracts.collateralAggregator.register(options);
    }

    async registerUserWithCrosschainAddresses(
        addresses: string[],
        chainIds: number[] | BigNumber[],
        options?: Overrides
    ): Promise<void> {
        return this.contracts.collateralAggregator.registerWithCrosschainAddresses(
            addresses,
            chainIds,
            options
        );
    }

    async depositCollateral(
        ccy: string,
        amount: number | BigNumber,
        options?: Overrides
    ): Promise<void> {
        const collateralVault = getCollateralVaultByCcy(
            ccy,
            this.networkId
        ).contract;

        return collateralVault.deposit(amount, options);
    }

    async depositCollateralIntoPosition(
        ccy: string,
        counterparty: string,
        amount: number | BigNumber,
        options?: Overrides
    ): Promise<void> {
        const collateralVault = getCollateralVaultByCcy(
            ccy,
            this.networkId
        ).contract;

        return collateralVault.depositIntoPosition(
            counterparty,
            amount,
            options
        );
    }

    async withdrawCollateral(
        ccy: string,
        amount: number | BigNumber,
        options?: Overrides
    ): Promise<void> {
        const collateralVault = getCollateralVaultByCcy(
            ccy,
            this.networkId
        ).contract;

        return collateralVault.withdraw(amount, options);
    }

    async withdrawCollateralFromPosition(
        ccy: string,
        counterparty: string,
        amount: number | BigNumber,
        options?: Overrides
    ): Promise<void> {
        const collateralVault = getCollateralVaultByCcy(
            ccy,
            this.networkId
        ).contract;

        return collateralVault.withdrawFromPosition(
            counterparty,
            amount,
            options
        );
    }

    async updateCrosschainAddress(
        chainId: string | number | BigInt,
        address: string,
        options?: Overrides
    ): Promise<void> {
        return this.contracts.crosschainAddressResolver.updateAddress(
            chainId,
            address,
            options
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
        rate: number | BigNumber,
        options?: Overrides
    ) => {
        const lendingMarket = getLendingMarketByCcyAndTerm(
            ccy,
            term,
            this.networkId
        ).contract;
        return lendingMarket.makeOrder(side, amount, rate, options);
    };

    takeLendingOrder = async (
        ccy: string,
        term: string,
        side: number,
        orderID: number | BigNumber,
        amount: number | BigNumber,
        options?: Overrides
    ) => {
        const lendingMarket = getLendingMarketByCcyAndTerm(
            ccy,
            term,
            this.networkId
        ).contract;
        return lendingMarket.takeOrder(side, amount, orderID, options);
    };

    placeLendingOrder = async (
        ccy: string,
        term: string,
        side: number,
        orderID: number | BigNumber,
        rate: number | BigNumber,
        options?: Overrides
    ) => {
        const lendingMarket = getLendingMarketByCcyAndTerm(
            ccy,
            term,
            this.networkId
        ).contract;
        return lendingMarket.order(side, rate, orderID, options);
    };

    cancelLendingOrder = async (
        ccy: string,
        term: string,
        orderID: number | BigNumber,
        options?: Overrides
    ) => {
        const lendingMarket = getLendingMarketByCcyAndTerm(
            ccy,
            term,
            this.networkId
        ).contract;
        return lendingMarket.cancelOrder(orderID, options);
    };
}
