import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    LendingMarketController as Contract,
    LendingMarketController__factory as Factory,
} from '../types';
import { BaseContract } from './BaseContract';

export class LendingMarketController extends BaseContract<Contract> {
    static async getInstance(
        signerOrProvider: Signer | Provider,
        network: string
    ) {
        const address = await this.getAddress(
            'LendingMarketController',
            network
        );
        const contract = Factory.connect(address, signerOrProvider);

        return new LendingMarketController(contract);
    }
}

export default LendingMarketController;
