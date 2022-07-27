import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    PaymentAggregator as Contract,
    PaymentAggregator__factory as Factory,
} from '../types';
import { BaseContract } from './BaseContract';

export class PaymentAggregator extends BaseContract<Contract> {
    static async getInstance(
        signerOrProvider: Signer | Provider,
        network: string
    ) {
        const address = await this.getAddress('PaymentAggregator', network);
        const contract = Factory.connect(address, signerOrProvider);

        return new PaymentAggregator(contract);
    }
}

export default PaymentAggregator;
