import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    TokenVault as Contract,
    TokenVault__factory as Factory,
} from '../types';
import { NetworkName } from '../utils';
import { BaseContract } from './base-contract';

export class TokenVault extends BaseContract<Contract> {
    static async getInstance(
        signerOrProvider: Signer | Provider,
        networkName: NetworkName
    ) {
        const address = await this.getAddress('TokenVault', networkName);
        const contract = Factory.connect(address, signerOrProvider);

        return new TokenVault(contract);
    }
}

export default TokenVault;
