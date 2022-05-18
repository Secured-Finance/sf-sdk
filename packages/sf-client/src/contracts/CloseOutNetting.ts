import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    CloseOutNetting as Contract,
    CloseOutNetting__factory,
} from '../../types/ethers-contracts';
import { addresses } from '../lib/addresses';

export class CloseOutNetting {
    contract: Contract;

    constructor(signerOrProvider: Signer | Provider, network: number) {
        this.contract = CloseOutNetting__factory.connect(
            addresses[network].closeOutNetting,
            signerOrProvider
        );
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
