import { Provider } from '@ethersproject/providers';
import { BigNumber, Signer } from 'ethers';
import { LendingMarket } from '../contracts';
import { NetworkName } from '../utils';

export class LendingMarkets {
    private signerOrProvider: Signer | Provider;
    private networkName: NetworkName;

    constructor(signerOrProvider: Signer | Provider, networkName: NetworkName) {
        this.signerOrProvider = signerOrProvider;
        this.networkName = networkName;
    }

    get(ccy: string, maturity: number | BigNumber): Promise<LendingMarket> {
        return LendingMarket.getInstance(
            ccy,
            maturity,
            this.signerOrProvider,
            this.networkName
        );
    }
}

export interface LendingMarketItem {
    ccy: string;
    maturity: number | BigNumber;
    termIndex: string | number;
}
