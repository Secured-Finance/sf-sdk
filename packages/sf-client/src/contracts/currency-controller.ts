import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    CurrencyController as Contract,
    CurrencyController__factory as Factory,
} from '../types';
import { NetworkName } from '../utils';
import { BaseContract } from './base-contract';

export class CurrencyController extends BaseContract<Contract> {
    static async getInstance(
        signerOrProvider: Signer | Provider,
        networkName: NetworkName
    ) {
        const address = await this.getAddress(
            'CurrencyController',
            networkName
        );
        const contract = Factory.connect(address, signerOrProvider);

        return new CurrencyController(contract);
    }
}

export default CurrencyController;
