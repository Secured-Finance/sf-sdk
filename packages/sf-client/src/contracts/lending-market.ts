import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    LendingMarket as Contract,
    LendingMarket__factory as LendingMarketFactory,
} from '../types';
import { BaseContract } from './base-contract';

export class LendingMarket extends BaseContract<Contract> {
    static async getInstance(
        address: string,
        signerOrProvider: Signer | Provider
    ) {
        const lendingMarketContract = LendingMarketFactory.connect(
            address,
            signerOrProvider
        );

        return new LendingMarket(lendingMarketContract);
    }
}

export default LendingMarket;
