import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    CloseOutNetting as Contract,
    CloseOutNetting__factory as Factory,
} from '../types';
import { BaseContract } from './base-contract';

export class CloseOutNetting extends BaseContract<Contract> {
    static async getInstance(
        signerOrProvider: Signer | Provider,
        network: string
    ) {
        const address = await this.getAddress('CloseOutNetting', network);
        const contract = Factory.connect(address, signerOrProvider);

        return new CloseOutNetting(contract);
    }

    getCloseOutPayment = async (
        party0: string,
        party1: string,
        ccy: string
    ) => {
        return this.contract.getCloseOutPayment(party0, party1, ccy);
    };

    checkDefaultStatus = async (user: string) => {
        return this.contract.checkDefault(user);
    };
}

export default CloseOutNetting;
