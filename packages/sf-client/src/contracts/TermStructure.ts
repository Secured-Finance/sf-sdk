import { BigNumber, Contract, Signer} from 'ethers';
import { BaseProvider } from '@ethersproject/providers';
import TermStructureAbi from "../lib/abis/TermStructure";
import { addresses } from '../lib/addresses';

export class TermStructure {
    contract: Contract;
    
    constructor(signerOrProvider: Signer | BaseProvider, network: number) {
        this.contract = new Contract(
            addresses[network].termStructure,
            TermStructureAbi,
            signerOrProvider,
        );
    }

    getTerm = async (termIndex: number | BigNumber) => {
        return await this.contract.getTerm(termIndex);
    }

    getTermSchedule = async (termIndex: number | BigNumber) => {
        return await this.contract.getTermSchedule(termIndex);
    }

    getNumDays = async (termIndex: number | BigNumber) => {
        return await this.contract.getNumDays(termIndex);
    }

    getDfFrac = async (termIndex: number | BigNumber) => {
        return await this.contract.getDfFrac(termIndex);
    }

    getNumPayments = async (termIndex: number | BigNumber) => {
        return await this.contract.getNumPayments(termIndex);
    }

    isSupportedTerm = async (termIndex: number | BigNumber) => {
        return await this.contract.isSupportedTerm(termIndex);
    }

    getTermsForProductAndCcy = async (
        productPrefix: string,
        ccy: string,
        isSort: boolean
    ) => {
        return await this.contract.getTermsForProductAndCcy(productPrefix, ccy, isSort);
    }

}

export default TermStructure