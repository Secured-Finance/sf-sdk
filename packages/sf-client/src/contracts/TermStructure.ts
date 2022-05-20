import { Provider } from '@ethersproject/providers';
import { BigNumber, Signer } from 'ethers';
import { addresses } from '../lib/addresses';
import { TermStructure as Contract, TermStructure__factory } from '../types';

export class TermStructure {
    contract: Contract;

    constructor(signerOrProvider: Signer | Provider, network: number) {
        this.contract = TermStructure__factory.connect(
            addresses[network].termStructure,
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

    isSupportedTerm = async (
        termIndex: number | BigNumber,
        productPrefix: string,
        ccy: string
    ) => {
        return this.contract.isSupportedTerm(termIndex, productPrefix, ccy);
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
