import { Provider } from '@ethersproject/providers';
import { constants, Signer } from 'ethers';
import {
    LendingMarket as Contract,
    LendingMarket__factory as LendingMarketFactory,
} from '../types';
import { NetworkName } from '../utils';
import { BaseContract } from './base-contract';
import { LendingMarketController } from './lending-market-controller';

export class LendingMarket extends BaseContract<Contract> {
    static async getInstance(
        ccy: string,
        signerOrProvider: Signer | Provider,
        networkName: NetworkName
    ) {
        const lendingMarketControllerContract =
            await LendingMarketController.getInstance(
                signerOrProvider,
                networkName
            );

        const lendingMarketAddresses =
            await lendingMarketControllerContract.contract.getLendingMarkets(
                ccy
            );

        lendingMarketAddresses.forEach(element => {
            if (element === constants.AddressZero) {
                throw new Error('Wrong ccy');
            }
        });

        const lendingMarketContract = LendingMarketFactory.connect(
            lendingMarketAddresses[0],
            signerOrProvider
        );

        return new LendingMarket(lendingMarketContract);
    }
}

export default LendingMarket;
