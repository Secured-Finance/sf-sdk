import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    LendingMarketController as Contract,
    LendingMarketController__factory as Factory,
} from '../types';
import { NetworkName } from '../utils';
import { BaseContract } from './base-contract';

export class LendingMarketController extends BaseContract<Contract> {
    static async getInstance(
        signerOrProvider: Signer | Provider,
        networkName: NetworkName
    ) {
        const address = await this.getAddress(
            'LendingMarketController',
            networkName
        );
        const contract = Factory.connect(address, signerOrProvider);

        return new LendingMarketController(contract);
    }
}

export default LendingMarketController;
