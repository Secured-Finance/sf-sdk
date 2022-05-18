import { Provider } from '@ethersproject/providers';
import { BigNumber, Signer } from 'ethers';
import {
    SettlementEngine as Contract,
    SettlementEngine__factory,
} from '../../types/ethers-contracts';
import { addresses } from '../lib/addresses';

export class SettlementEngine {
    contract: Contract;

    constructor(signerOrProvider: Signer | Provider, network: number) {
        this.contract = SettlementEngine__factory.connect(
            addresses[network].settlementEngine,
            signerOrProvider
        );
    }

    verifyPayment = async (
        counterparty: string,
        ccy: string,
        amount: number | BigNumber,
        timestamp: number | BigNumber,
        txHash: string
    ) => {
        return this.contract.verifyPayment(
            counterparty,
            ccy,
            amount,
            timestamp,
            txHash
        );
    };

    addExternalAdapter = async (adapter: string, ccy: string) => {
        return this.contract.addExternalAdapter(adapter, ccy);
    };

    settlementRequests = async (requestId: string) => {
        return this.contract.settlementRequests(requestId);
    };
}

export default SettlementEngine;
