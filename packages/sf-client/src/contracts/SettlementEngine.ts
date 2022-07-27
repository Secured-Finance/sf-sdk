import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    SettlementEngine as Contract,
    SettlementEngine__factory as Factory,
} from '../types';
import { BaseContract } from './BaseContract';

export class SettlementEngine extends BaseContract<Contract> {
    static async getInstance(
        signerOrProvider: Signer | Provider,
        network: string
    ) {
        const address = await this.getAddress('SettlementEngine', network);
        const contract = Factory.connect(address, signerOrProvider);

        return new SettlementEngine(contract);
    }
}

export default SettlementEngine;
