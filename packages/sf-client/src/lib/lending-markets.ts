import { Provider } from '@ethersproject/providers';
import { Signer, utils } from 'ethers';
import { LendingMarket } from '../contracts';
import { NetworkName } from '../utils';

export class LendingMarkets {
    private items: LendingMarketItem[];
    private signerOrProvider: Signer | Provider;
    private networkName: NetworkName;

    constructor(
        items: LendingMarketItem[],
        signerOrProvider: Signer | Provider,
        networkName: NetworkName
    ) {
        this.items = items;
        this.signerOrProvider = signerOrProvider;
        this.networkName = networkName;
    }

    get(ccy: string, term: string): Promise<LendingMarket> {
        const item = Object.values(this.items).find(
            market => market.term === term && market.ccy === ccy
        );
        if (!item) {
            throw new Error(`No market found for ${ccy}/${term}`);
        }
        return LendingMarket.getInstance(
            item.ccy,
            item.term,
            this.signerOrProvider,
            this.networkName
        );
    }
}

export interface LendingMarketItem {
    ccy: string;
    term: string;
    termIndex: string | number;
}

export const LENDING_MARKETS: LendingMarketItem[] = [
    {
        ccy: utils.formatBytes32String('FIL'),
        term: '90',
        termIndex: 0,
    },
    {
        ccy: utils.formatBytes32String('FIL'),
        term: '180',
        termIndex: 1,
    },
    {
        ccy: utils.formatBytes32String('FIL'),
        term: '365',
        termIndex: 2,
    },
    {
        ccy: utils.formatBytes32String('FIL'),
        term: '730',
        termIndex: 3,
    },
    {
        ccy: utils.formatBytes32String('FIL'),
        term: '1095',
        termIndex: 4,
    },
    {
        ccy: utils.formatBytes32String('FIL'),
        term: '1825',
        termIndex: 5,
    },
];
