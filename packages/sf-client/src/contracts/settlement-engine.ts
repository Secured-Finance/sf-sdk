import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    SettlementEngine as Contract,
    SettlementEngine__factory as Factory,
} from '../types';
import { NetworkName } from '../utils';
import { BaseContract } from './base-contract';

export class SettlementEngine extends BaseContract<Contract> {
    static async getInstance(
        signerOrProvider: Signer | Provider,
        networkName: NetworkName
    ) {
        const address = await this.getAddress('SettlementEngine', networkName);
        const contract = Factory.connect(address, signerOrProvider);

        return new SettlementEngine(contract);
    }
}

export default SettlementEngine;
