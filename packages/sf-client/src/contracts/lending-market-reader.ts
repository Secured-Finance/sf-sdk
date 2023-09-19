import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    LendingMarketReader as Contract,
    LendingMarketReader__factory as Factory,
} from '../types';
import { NetworkName } from '../utils';
import { BaseContract } from './base-contract';

export class LendingMarketReader extends BaseContract<Contract> {
    static async getInstance(
        signerOrProvider: Signer | Provider,
        networkName: NetworkName
    ) {
        const address = await this.getAddress(
            'LendingMarketReader',
            networkName
        );
        const contract = Factory.connect(address, signerOrProvider);

        return new LendingMarketReader(contract);
    }
}

export default LendingMarketReader;
