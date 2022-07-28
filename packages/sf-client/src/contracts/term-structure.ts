import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    TermStructure as Contract,
    TermStructure__factory as Factory,
} from '../types';
import { BaseContract } from './base-contract';

import { NetworkName } from '../utils';
export class TermStructure extends BaseContract<Contract> {
    static async getInstance(
        signerOrProvider: Signer | Provider,
        networkName: NetworkName
    ) {
        const address = await this.getAddress('TermStructure', networkName);
        const contract = Factory.connect(address, signerOrProvider);

        return new TermStructure(contract);
    }
}

export default TermStructure;
