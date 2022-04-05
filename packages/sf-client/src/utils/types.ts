import { BigNumber, Contract, Signer } from 'ethers';
import { BaseProvider, JsonRpcSigner } from '@ethersproject/providers';

export interface SFContract {
    contract: Contract;
}

export interface MarketOrder {
    ccy: string;
    term: string;
    side: number;
    amount: number | BigNumber;
    rate: number | BigNumber;
}

export type SignerOrProvider = Signer | JsonRpcSigner | BaseProvider;
