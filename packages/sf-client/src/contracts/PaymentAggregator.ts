import { BigNumber, Contract, Signer } from 'ethers';
import { BaseProvider } from '@ethersproject/providers';
import PaymentAggregatorAbi from '../lib/abis/PaymentAggregator';
import { addresses } from '../lib/addresses';
import { TxBase } from '../utils/eth-tx';

export class PaymentAggregator {
    contract: Contract;

    constructor(signerOrProvider: Signer | BaseProvider, network: number) {
        this.contract = new Contract(
            addresses[network].paymentAggregator,
            PaymentAggregatorAbi,
            signerOrProvider
        );
    }

    verifyPayment = async (
        verifier: string,
        counterparty: string,
        ccy: string,
        timestamp: number | BigNumber,
        payment: number | BigNumber,
        txHash: string,
        txParams: TxBase
    ) => {
        return await this.contract.verifyPayment(
            verifier,
            counterparty,
            ccy,
            timestamp,
            payment,
            txHash,
            txParams
        );
    };

    settlePayment = async (
        verifier: string,
        counterparty: string,
        ccy: string,
        timestamp: number | BigNumber,
        txHash: string,
        txParams: TxBase
    ) => {
        return await this.contract.settlePayment(
            verifier,
            counterparty,
            ccy,
            timestamp,
            txHash,
            txParams
        );
    };

    getTimeSlotByDate = async (
        party0: string,
        party1: string,
        ccy: string,
        year: number | BigNumber,
        month: number | BigNumber,
        day: number | BigNumber
    ) => {
        return await this.contract.getTimeSlotByDate(
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
        return await this.contract.getTimeSlotBySlotId(
            party0,
            party1,
            ccy,
            slot
        );
    };

    isSettled = async (
        party0: string,
        party1: string,
        ccy: string,
        timestamp: number | BigNumber
    ) => {
        return await this.contract.isSettled(party0, party1, ccy, timestamp);
    };

    getDealsFromSlot = async (
        party0: string,
        party1: string,
        ccy: string,
        slot: string
    ) => {
        return await this.contract.getDealsFromSlot(party0, party1, ccy, slot);
    };
}

export default PaymentAggregator;
