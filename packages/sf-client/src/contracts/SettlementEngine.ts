import { Provider } from '@ethersproject/providers';
import { BigNumber, Contract, Signer } from 'ethers';
import SettlementEngineAbi from '../lib/abis/SettlementEngine';
import { addresses } from '../lib/addresses';

export class SettlementEngine {
    contract: Contract;

    constructor(signerOrProvider: Signer | Provider, network: number) {
        this.contract = new Contract(
            addresses[network].settlementEngine,
            SettlementEngineAbi,
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
