import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    MarkToMarket as Contract,
    MarkToMarket__factory as Factory,
} from '../types';
import { BaseContract } from './BaseContract';

export class MarkToMarket extends BaseContract<Contract> {
    static async getInstance(
        signerOrProvider: Signer | Provider,
        network: string
    ) {
        const address = await this.getAddress('MarkToMarket', network);
        const contract = Factory.connect(address, signerOrProvider);

        return new MarkToMarket(contract);
    }
}

export default MarkToMarket;
