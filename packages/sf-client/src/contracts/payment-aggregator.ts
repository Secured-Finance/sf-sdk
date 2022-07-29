import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    PaymentAggregator as Contract,
    PaymentAggregator__factory as Factory,
} from '../types';
import { NetworkName } from '../utils';
import { BaseContract } from './base-contract';

export class PaymentAggregator extends BaseContract<Contract> {
    static async getInstance(
        signerOrProvider: Signer | Provider,
        networkName: NetworkName
    ) {
        const address = await this.getAddress('PaymentAggregator', networkName);
        const contract = Factory.connect(address, signerOrProvider);

        return new PaymentAggregator(contract);
    }
}

export default PaymentAggregator;
