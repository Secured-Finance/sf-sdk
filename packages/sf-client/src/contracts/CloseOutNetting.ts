import { Contract, Signer} from 'ethers';
import { BaseProvider } from '@ethersproject/providers';
import CloseOutNettingAbi from "../lib/abis/CloseOutNetting";
import { addresses } from '../lib/addresses';

export class CloseOutNetting {
    contract: Contract;
    
    constructor(signerOrProvider: Signer | BaseProvider, network: number) {
        this.contract = new Contract(
            addresses[network].closeOutNetting,
            CloseOutNettingAbi,
            signerOrProvider,
        );
    }

    getCloseOutPayment = async (
        party0: string,
        party1: string,
        ccy: string, 
    ) => {
        return await this.contract.getCloseOutPayment(party0, party1, ccy);
    }

    checkDefaultStatus = async (user: string) => {
        return await this.contract.checkDefault(user);
    }

}

export default CloseOutNetting