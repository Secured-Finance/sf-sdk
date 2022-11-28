import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    GenesisValueVault as Contract,
    GenesisValueVault__factory as Factory,
} from '../types';
import { NetworkName } from '../utils';
import { BaseContract } from './base-contract';

export class GenesisValueVault extends BaseContract<Contract> {
    static async getInstance(
        signerOrProvider: Signer | Provider,
        networkName: NetworkName
    ) {
        const address = await this.getAddress('GenesisValueVault', networkName);
        const contract = Factory.connect(address, signerOrProvider);

        return new GenesisValueVault(contract);
    }
}

export default GenesisValueVault;
