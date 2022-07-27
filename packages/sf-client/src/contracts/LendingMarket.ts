import { Provider } from '@ethersproject/providers';
import { constants, Signer } from 'ethers';
import {
    LendingMarket as Contract,
    LendingMarket__factory as LendingMarketFactory,
} from '../types';
import { BaseContract } from './BaseContract';
import { LendingMarketController } from './LendingMarketController';

export class LendingMarket extends BaseContract<Contract> {
    static async getInstance(
        ccy: string,
        term: string,
        signerOrProvider: Signer | Provider,
        network: string
    ) {
        const lendingMarketControllerContract =
            await LendingMarketController.getInstance(
                signerOrProvider,
                network
            );

        const lendingMarketAddresses =
            await lendingMarketControllerContract.contract.getLendingMarket(
                ccy,
                term
            );

        if (lendingMarketAddresses === constants.AddressZero) {
            throw new Error('Wrong ccy or term');
        }

        const lendingMarketContract = LendingMarketFactory.connect(
            lendingMarketAddresses,
            signerOrProvider
        );

        return new LendingMarket(lendingMarketContract);
    }
}

export default LendingMarket;
