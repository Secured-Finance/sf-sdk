import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    CollateralAggregator as Contract,
    CollateralAggregator__factory as Factory,
} from '../types';
import { NetworkName } from '../utils';
import { BaseContract } from './base-contract';
export class CollateralAggregator extends BaseContract<Contract> {
    static async getInstance(
        signerOrProvider: Signer | Provider,
        networkName: NetworkName
    ) {
        const address = await this.getAddress(
            'CollateralAggregator',
            networkName
        );
        const contract = Factory.connect(address, signerOrProvider);

        return new CollateralAggregator(contract);
    }
}

export default CollateralAggregator;
