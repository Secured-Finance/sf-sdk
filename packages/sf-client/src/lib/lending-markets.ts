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

const MAINNET_LENDING_MARKETS: LendingMarketItem[] = [
    {
        ccy: 'ETH',
        term: '3 month',
        termIndex: 0,
        address: DEFAULT_ADDRESS,
    },
];

const ROPSTEN_LENDING_MARKETS: LendingMarketItem[] = [
    {
        ccy: 'FIL',
        term: '3 month',
        termIndex: 0,
        address: '0x0F144f72fcC41d135c34085595D57c5B2a839F20',
    },
    {
        ccy: 'FIL',
        term: '6 month',
        termIndex: 0,
        address: '0xcC843f549FA27E131F76d6573F0527e07923Bd3B',
    },
    {
        ccy: 'FIL',
        term: '1 year',
        termIndex: 0,
        address: '0xcCfB4c0D6022bdE01275B4fDC8Dd9eB2909e3d2d',
    },
    {
        ccy: 'FIL',
        term: '2 year',
        termIndex: 0,
        address: '0x5FFF882062775e05B761ef79FED5217A3602BD66',
    },
    {
        ccy: 'FIL',
        term: '3 year',
        termIndex: 0,
        address: '0xb72aDef1b12F934cd5cE8be959C28DC4f1E60Dc7',
    },
    {
        ccy: 'FIL',
        term: '5 year',
        termIndex: 0,
        address: '0x1723CA6fB3f9Bcd48c5aBBd8d393CE58aAa0c8F3',
    },
];

const LOCALHOST_LENDING_MARKETS: LendingMarketItem[] = [
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
    1: MAINNET_LENDING_MARKETS,
    3: ROPSTEN_LENDING_MARKETS,
    1337: LOCALHOST_LENDING_MARKETS,
};
