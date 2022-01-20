import { LendingMarket } from "../contracts";
import { DEFAULT_ADDRESS } from "../utils/constants";

export interface LendingMarketItem {
    ccy: string;
    markets: Market[];
}

export interface LendingMarkets {
    [address: string]: LendingMarketItem
}

export interface Market {
    term: string;
    termIndex: string | number;
    address: string;
    contract?: LendingMarket
}

const MAINNET_GATEWAY_TOKENS: LendingMarketItem[] = [
    {
        ccy: 'ETH',
        markets: [
			{
				term: '3 month',
				termIndex: 0,
				address: DEFAULT_ADDRESS,	
			},
        ]
    }
];

const ROPSTEN_GATEWAY_TOKENS: LendingMarketItem[] = [
    {
        ccy: 'ETH',
        markets: [
			{
				term: '3 month',
				termIndex: 0,
				address: DEFAULT_ADDRESS,	
			},
        ]
    }
];

const LOCALHOST_GATEWAY_TOKENS: LendingMarketItem[] = [
    {
        ccy: 'ETH',
        markets: [
			{
				term: '3 month',
				termIndex: 0,
				address: DEFAULT_ADDRESS,	
			},
        ]
    }
];

export const lendingMarkets: {[key: number]: LendingMarketItem[]} = {
    1: MAINNET_GATEWAY_TOKENS,
    3: ROPSTEN_GATEWAY_TOKENS,
    1337: LOCALHOST_GATEWAY_TOKENS,
}