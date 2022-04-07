import { BigNumber, Contract, Signer } from 'ethers';
import TermStructureAbi from '../lib/abis/TermStructure';
import { addresses } from '../lib/addresses';
import { Provider } from '@ethersproject/providers';

export class TermStructure {
    contract: Contract;

    constructor(signerOrProvider: Signer | Provider, network: number) {
        this.contract = new Contract(
            addresses[network].termStructure,
            TermStructureAbi,
            signerOrProvider
        );
    }

    getTerm = async (termIndex: number | BigNumber) => {
        return this.contract.getTerm(termIndex);
    };

    getTermSchedule = async (termIndex: number | BigNumber) => {
        return this.contract.getTermSchedule(termIndex);
    };

    getNumDays = async (termIndex: number | BigNumber) => {
        return this.contract.getNumDays(termIndex);
    };

    getDfFrac = async (termIndex: number | BigNumber) => {
        return this.contract.getDfFrac(termIndex);
    };

    getNumPayments = async (termIndex: number | BigNumber) => {
        return this.contract.getNumPayments(termIndex);
    };

    isSupportedTerm = async (termIndex: number | BigNumber) => {
        return this.contract.isSupportedTerm(termIndex);
    };

    getTermsForProductAndCcy = async (
        productPrefix: string,
        ccy: string,
        isSort: boolean
    ) => {
        return this.contract.getTermsForProductAndCcy(
            productPrefix,
            ccy,
            isSort
        );
    };
}

export default TermStructure;
