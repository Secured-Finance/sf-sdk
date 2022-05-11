import { Provider } from '@ethersproject/providers';
import { BigNumber, Contract, Signer } from 'ethers';
import PaymentAggregatorAbi from '../lib/abis/PaymentAggregator';
import { addresses } from '../lib/addresses';

export class PaymentAggregator {
    contract: Contract;

    constructor(signerOrProvider: Signer | Provider, network: number) {
        this.contract = new Contract(
            addresses[network].paymentAggregator,
            PaymentAggregatorAbi,
            signerOrProvider
        );
    }

    getTimeSlotByDate = async (
        party0: string,
        party1: string,
        ccy: string,
        year: number | BigNumber,
        month: number | BigNumber,
        day: number | BigNumber
    ) => {
        return this.contract.getTimeSlotByDate(
            party0,
            party1,
            ccy,
            year,
            month,
            day
        );
    };

    getTimeSlotBySlotId = async (
        party0: string,
        party1: string,
        ccy: string,
        slot: string
    ) => {
        return this.contract.getTimeSlotBySlotId(party0, party1, ccy, slot);
    };

    isSettled = async (
        party0: string,
        party1: string,
        ccy: string,
        timestamp: number | BigNumber
    ) => {
        return this.contract.isSettled(party0, party1, ccy, timestamp);
    };

    getDealsFromSlot = async (
        party0: string,
        party1: string,
        ccy: string,
        slot: string
    ) => {
        return this.contract.getDealsFromSlot(party0, party1, ccy, slot);
    };
}

export default PaymentAggregator;
