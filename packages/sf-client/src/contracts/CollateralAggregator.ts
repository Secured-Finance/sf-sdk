import { Provider } from '@ethersproject/providers';
import { BigNumber, Contract, Signer } from 'ethers';
import CollateralAggregatorAbi from '../lib/abis/CollateralAggregator';
import { addresses } from '../lib/addresses';

export class CollateralAggregator {
    contract: Contract;

    constructor(signerOrProvider: Signer | Provider, network: number) {
        this.contract = new Contract(
            addresses[network].collateralAggregator,
            CollateralAggregatorAbi,
            signerOrProvider
        );
    }

    register = async (): Promise<void> => {
        return this.contract.functions['register()']() as Promise<any>;
    };

    registerWithCrosschainAddresses = async (
        addresses: string[],
        chainIds: number[] | BigNumber[]
    ) => {
        return this.contract.functions['register(string[],uint256[])'](
            addresses,
            chainIds
        );
    };

    checkRegisteredUser = async (user: string) => {
        return this.contract.checkRegisteredUser(user);
    };

    getTotalUnsettledExp = async (user: string) => {
        return this.contract.getTotalUnsettledExp(user);
    };

    getUnsettledCoverage = async (user: string) => {
        return this.contract.getUnsettledCoverage(user);
    };

    getNetAndTotalPV = async (party0: string, party1: string) => {
        return this.contract.getNetAndTotalPV(party0, party1);
    };

    isCoveredUnsettled = async (
        user: string,
        ccy: string,
        unsettledExp?: number | BigNumber
    ) => {
        return this.contract.isCoveredUnsettled(user, ccy, unsettledExp);
    };

    isCovered = async (
        party0: string,
        party1: string,
        ccy: string,
        party0PV: number | BigNumber,
        party1PV: number | BigNumber,
        isSettled: boolean
    ) => {
        return this.contract.isCovered(
            party0,
            party1,
            ccy,
            party0PV,
            party1PV,
            isSettled
        );
    };

    getMaxCollateralBookWidthdraw = async (user: string) => {
        return this.contract.getMaxCollateralBookWidthdraw(user);
    };
    getMaxCollateralWidthdraw = async (party0: string, party1: string) => {
        return this.contract.getMaxCollateralWidthdraw(party0, party1);
    };

    getRebalanceCollateralAmounts = async (party0: string, party1: string) => {
        return this.contract.getRebalanceCollateralAmounts(party0, party1);
    };

    getCoverage = async (party0: string, party1: string) => {
        return this.contract.getCoverage(party0, party1);
    };

    getCcyExposures = async (party0: string, party1: string, ccy: string) => {
        return this.contract.getCcyExposures(party0, party1, ccy);
    };

    getExposedCurrencies = async (party0: string, party1: string) => {
        return this.contract.getExposedCurrencies(party0, party1);
    };

    getUsedVaultsInPosition = async (party0: string, party1: string) => {
        return this.contract.functions['getUsedVaults(address, address)'](
            party0,
            party1
        );
    };

    getUsedVaults = async (user: string) => {
        return this.contract.functions['getUsedVaults(address)'](user);
    };
}

export default CollateralAggregator;
