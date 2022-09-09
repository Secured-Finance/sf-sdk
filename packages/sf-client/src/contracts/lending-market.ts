import { Provider } from '@ethersproject/providers';
import { BigNumber, constants, Signer } from 'ethers';
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
        maturity: number | BigNumber,
        signerOrProvider: Signer | Provider,
        networkName: NetworkName
    ) {
        const lendingMarketControllerContract =
            await LendingMarketController.getInstance(
                signerOrProvider,
                networkName
            );

        const lendingMarketAddress =
            await lendingMarketControllerContract.contract.getLendingMarket(
                ccy,
                maturity
            );

        if (lendingMarketAddress === constants.AddressZero) {
            throw new Error('Wrong ccy or maturity');
        }

        const lendingMarketContract = LendingMarketFactory.connect(
            lendingMarketAddress,
            signerOrProvider
        );

        return new LendingMarket(lendingMarketContract);
    }
}

export default LendingMarket;
