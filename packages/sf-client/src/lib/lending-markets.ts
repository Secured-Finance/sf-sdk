import { Provider } from '@ethersproject/providers';
import { BigNumber, Signer } from 'ethers';
import { LendingMarket } from '../contracts';

export class LendingMarkets {
    private signerOrProvider: Signer | Provider;

    constructor(signerOrProvider: Signer | Provider) {
        this.signerOrProvider = signerOrProvider;
    }

    get(address: string): Promise<LendingMarket> {
        return LendingMarket.getInstance(address, this.signerOrProvider);
    }
}

export interface LendingMarketItem {
    ccy: string;
    maturity: number | BigNumber;
    termIndex: string | number;
}
