import { LendingMarket } from '../contracts';
import { DEFAULT_ADDRESS } from '../utils/constants';

export interface LendingMarkets {
    [address: string]: LendingMarketItem;
}

export interface LendingMarketItem {
    ccy: string;
    term: string;
    termIndex: string | number;
    address: string;
    contract?: LendingMarket;
}

const MAINNET_GATEWAY_TOKENS: LendingMarketItem[] = [
    {
        ccy: 'ETH',
        term: '3 month',
        termIndex: 0,
        address: DEFAULT_ADDRESS,
    },
];

const ROPSTEN_GATEWAY_TOKENS: LendingMarketItem[] = [
    {
        ccy: 'ETH',
        term: '3 month',
        termIndex: 0,
        address: DEFAULT_ADDRESS,
    },
];

const LOCALHOST_GATEWAY_TOKENS: LendingMarketItem[] = [
    {
        ccy: 'FIL',
        term: '3 month',
        termIndex: 0,
        address: '0xdf12940a13c08715ab481e97cb521c3b395be019',
    },
    {
        ccy: 'FIL',
        term: '6 month',
        termIndex: 0,
        address: '0xa288c2e22bb3e9ee324b0282e7c846ea71b2ec20',
    },
];

export const lendingMarkets: { [key: number]: LendingMarketItem[] } = {
    1: MAINNET_GATEWAY_TOKENS,
    3: ROPSTEN_GATEWAY_TOKENS,
    1337: LOCALHOST_GATEWAY_TOKENS,
};
