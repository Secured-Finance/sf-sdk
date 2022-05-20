import { Provider } from '@ethersproject/providers';
import { Overrides, Signer } from 'ethers';
import { addresses } from '../lib/addresses';
import { Loan as Contract, Loan__factory } from '../types';

export class Loan {
    contract: Contract;

    constructor(signerOrProvider: Signer | Provider, network: number) {
        this.contract = Loan__factory.connect(
            addresses[network].loan,
            signerOrProvider
        );
    }

    getDealSettlementStatus = async (dealId: string): Promise<boolean> => {
        return this.contract.getDealSettlementStatus(dealId);
    };

    getDealCurrency = async (dealId: string) => {
        return this.contract.getDealCurrency(dealId);
    };

    getLoanDeal = async (dealId: string) => {
        return this.contract.getLoanDeal(dealId);
    };

    getTerminationState = async (dealId: string) => {
        return this.contract.getTerminationState(dealId);
    };

    getPaymentSchedule = async (dealId: string) => {
        return this.contract.getPaymentSchedule(dealId);
    };

    getLastSettledPayment = async (dealId: string) => {
        return this.contract.getLastSettledPayment(dealId);
    };

    getDealLastPV = async (party0: string, party1: string, dealId: string) => {
        return this.contract.getDealLastPV(party0, party1, dealId);
    };

    requestTermination = async (dealId: string, options?: Overrides) => {
        return this.contract.requestTermination(dealId, options);
    };

    acceptTermination = async (dealId: string, options?: Overrides) => {
        return this.contract.acceptTermination(dealId, options);
    };

    rejectTermination = async (dealId: string, options?: Overrides) => {
        return this.contract.rejectTermination(dealId, options);
    };

    novation = async (
        dealId: string,
        newOwner: string,
        options?: Overrides
    ) => {
        return this.contract.novation(dealId, newOwner, options);
    };

    getDealPV = async (dealId: string) => {
        return this.contract.getDealPV(dealId);
    };

    markToMarket = async (dealId: string, options?: Overrides) => {
        return this.contract.markToMarket(dealId, options);
    };
}

export default Loan;
