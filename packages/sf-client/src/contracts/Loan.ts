import { Contract } from 'ethers';
import LoanAbi from '../lib/abis/Loan';
import { addresses } from '../lib/addresses';
import { TxBase } from '../utils/eth-tx';
import { SignerOrProvider } from '../utils';

export class Loan {
    contract: Contract;

    constructor(signerOrProvider: SignerOrProvider, network: number) {
        this.contract = new Contract(
            addresses[network].loan,
            LoanAbi,
            signerOrProvider
        );
    }

    getDealSettlementStatus = async (dealId: string) => {
        return await this.contract.getDealSettlementStatus(dealId);
    };

    getDealCurrency = async (dealId: string) => {
        return await this.contract.getDealCurrency(dealId);
    };

    getLoanDeal = async (dealId: string) => {
        return await this.contract.getLoanDeal(dealId);
    };

    getTerminationState = async (dealId: string) => {
        return await this.contract.getTerminationState(dealId);
    };

    getPaymentSchedule = async (dealId: string) => {
        return await this.contract.getPaymentSchedule(dealId);
    };

    getLastSettledPayment = async (dealId: string) => {
        return await this.contract.getLastSettledPayment(dealId);
    };

    getDealLastPV = async (party0: string, party1: string, dealId: string) => {
        return await this.contract.getDealLastPV(party0, party1, dealId);
    };

    requestTermination = async (dealId: string, txParams: TxBase) => {
        return await this.contract.requestTermination(dealId, txParams);
    };

    acceptTermination = async (dealId: string, txParams: TxBase) => {
        return await this.contract.acceptTermination(dealId, txParams);
    };

    rejectTermination = async (dealId: string, txParams: TxBase) => {
        return await this.contract.rejectTermination(dealId, txParams);
    };

    novation = async (dealId: string, newOwner: string, txParams: TxBase) => {
        return await this.contract.novation(dealId, newOwner, txParams);
    };

    getDealPV = async (dealId: string) => {
        return await this.contract.getDealPV(dealId);
    };

    markToMarket = async (dealId: string, txParams: TxBase) => {
        return await this.contract.markToMarket(dealId, txParams);
    };
}

export default Loan;
