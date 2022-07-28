import { Provider } from '@ethersproject/providers';
import { BigNumber, Signer } from 'ethers';
import {
    CollateralAggregatorV2 as Contract,
    CollateralAggregatorV2__factory as Factory,
} from '../types';
import { NetworkName } from '../utils';
import { BaseContract } from './base-contract';
export class CollateralAggregator extends BaseContract<Contract> {
    contract: Contract;

    static async getInstance(
        signerOrProvider: Signer | Provider,
        networkName: NetworkName
    ) {
        const address = await this.getAddress(
            'CollateralAggregatorV2',
            networkName
        );
        const contract = Factory.connect(address, signerOrProvider);

        return new CollateralAggregator(contract);
    }

    register = async () => {
        return this.contract['register()']();
    };

    registerWithCrosschainAddresses = async (
        addresses: string[],
        chainIds: number[] | BigNumber[]
    ) => {
        return this.contract['register(string[],uint256[])'](
            addresses,
            chainIds
        );
    };
}

export default CollateralAggregator;
