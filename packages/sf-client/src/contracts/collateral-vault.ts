import { Provider } from '@ethersproject/providers';
import { BigNumber, PayableOverrides, Signer } from 'ethers';
import {
    CollateralVault as Contract,
    CollateralVault__factory as Factory,
} from '../types';
import { NetworkName } from '../utils';
import { BaseContract } from './base-contract';

export class CollateralVault extends BaseContract<Contract> {
    static async getInstance(
        signerOrProvider: Signer | Provider,
        networkName: NetworkName
    ) {
        const address = await this.getAddress('CollateralVault', networkName);
        const contract = Factory.connect(address, signerOrProvider);

        return new CollateralVault(contract);
    }

    async deposit(
        ccy: string,
        amount: number | BigNumber,
        overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }
    ) {
        return this.contract['deposit(bytes32,uint256)'](
            ccy,
            amount,
            overrides
        );
    }

    async depositIntoPosition(
        ccy: string,
        counterparty: string,
        amount: number | BigNumber
    ) {
        return this.contract['deposit(address,bytes32,uint256)'](
            ccy,
            counterparty,
            amount
        );
    }

    async getLockedCollateral(user: string, ccy: string) {
        return this.contract['getLockedCollateral(address,bytes32)'](user, ccy);
    }

    getLockedCollateralFromPosition = async (
        user: string,
        counterparty: string,
        ccy: string
    ) => {
        return this.contract['getLockedCollateral(address,address,bytes32)'](
            user,
            counterparty,
            ccy
        );
    };

    async getLockedCollateralInETH(user: string, ccy: string) {
        return this.contract['getLockedCollateralInETH(address,bytes32)'](
            user,
            ccy
        );
    }

    async getLockedCollateralFromPositionInETH(
        user: string,
        counterparty: string,
        ccy: string
    ) {
        return this.contract[
            'getLockedCollateralInETH(address,address,bytes32)'
        ](user, counterparty, ccy);
    }
}

export default CollateralVault;
