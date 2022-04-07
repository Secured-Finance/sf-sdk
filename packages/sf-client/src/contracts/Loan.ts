import { Contract, Overrides, Signer } from 'ethers';
import LoanAbi from '../lib/abis/Loan';
import { addresses } from '../lib/addresses';
import { TxBase } from '../utils/eth-tx';
import { Provider } from '@ethersproject/providers';

export class Loan {
    contract: Contract;

    constructor(signerOrProvider: Signer | Provider, network: number) {
        this.contract = new Contract(
            addresses[network].loan,
            LoanAbi,
            signerOrProvider
        );
    }

    getDealSettlementStatus = async (dealId: string) => {
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
