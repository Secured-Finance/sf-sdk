import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    CollateralVault as Contract,
    CollateralVault__factory as Factory
} from '../types';
import { NetworkName } from '../utils';
import { BaseContract } from './base-contract';

export class CollateralVault extends BaseContract<Contract> {
    static async getInstance(
        signerOrProvider: Signer | Provider,
        networkName: NetworkName
    ) {
        const address = await this.getAddress('CollateralVault', networkName);
        const contract = Factory.connect(address, signerOrProvider);

        return new CollateralVault(contract);
    }
}

export default CollateralVault;
