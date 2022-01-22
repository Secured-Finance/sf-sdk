import { BigNumber, Contract } from "ethers";

export interface SFContract {
    contract: Contract
};

export interface MarketOrder {
    ccy: string;
    term: string;
    side: number;
    amount: number | BigNumber;
    rate: number | BigNumber;
}
