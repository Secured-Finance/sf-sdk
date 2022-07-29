import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    MarkToMarket as Contract,
    MarkToMarket__factory as Factory,
} from '../types';
import { NetworkName } from '../utils';
import { BaseContract } from './base-contract';

export class MarkToMarket extends BaseContract<Contract> {
    static async getInstance(
        signerOrProvider: Signer | Provider,
        networkName: NetworkName
    ) {
        const address = await this.getAddress('MarkToMarket', networkName);
        const contract = Factory.connect(address, signerOrProvider);

        return new MarkToMarket(contract);
    }
}

export default MarkToMarket;
