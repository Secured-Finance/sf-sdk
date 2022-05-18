import { Provider } from '@ethersproject/providers';
import { BigNumber, Signer } from 'ethers';
import {
    PaymentAggregator as Contract,
    PaymentAggregator__factory,
} from '../../types/ethers-contracts';
import { addresses } from '../lib/addresses';

export class PaymentAggregator {
    contract: Contract;

    constructor(signerOrProvider: Signer | Provider, network: number) {
        this.contract = PaymentAggregator__factory.connect(
            addresses[network].paymentAggregator,
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
