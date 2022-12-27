import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    TokenFaucet as Contract,
    TokenFaucet__factory as Factory,
} from '../types';
import { NetworkName } from '../utils';
import { BaseContract } from './base-contract';

export class TokenFaucet extends BaseContract<Contract> {
    static async getInstance(
        signerOrProvider: Signer | Provider,
        networkName: NetworkName
    ) {
        const address = await this.getAddress('TokenFaucet', networkName);
        const contract = Factory.connect(address, signerOrProvider);

        return new TokenFaucet(contract);
    }
}

export default TokenFaucet;
