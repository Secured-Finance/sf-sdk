import { renderHook } from '@testing-library/react-hooks';
import { expect } from 'chai';
import {
    useBorrowOrderbookQuery,
    useLendingMarketInfo,
    useLendingMarkets,
    useLendingTradingHistory,
    useLendOrderbookQuery,
} from '../../src/hooks';
import {
    assetPrice,
    ccy,
    market,
    validateCurrency,
    validateLendingMarket,
    validateOrderbookRow,
    validateTradingHistoryRow,
} from '../utils';

describe('useLendingMarkets hook test', () => {
    it('Should return undefined if lending market address is empty', async () => {
        const { result } = renderHook(() => useLendingMarkets(''));

        expect(result.current.data).to.be.undefined;
    });

    it('Should get array of lending markets from subgraph', async () => {
        const { result } = renderHook(() => useLendingMarkets(ccy));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.lendingMarkets !== undefined) {
            const markets = result.current.data.lendingMarkets;

            for (let i = 0; i < markets.length; i++) {
                validateLendingMarket(markets[i]);
            }
        }
    });
});

describe('useLendingMarketInfo hook test', () => {
    it('Should return undefined if lending market address is empty', async () => {
        const { result } = renderHook(() => useLendingMarketInfo(''));

        expect(result.current.data).to.be.undefined;
    });

    it('Should return lending market data from subgraph', async () => {
        const { result } = renderHook(() => useLendingMarketInfo(market));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.lendingMarket !== undefined) {
            const market = result.current.data.lendingMarket;

            validateLendingMarket(market);
            validateCurrency(market.currency);
        }
    });
});

describe('useLendOrderbook hook test', () => {
    it('Should return undefined if lending market address is empty', async () => {
        const { result } = renderHook(() =>
            useLendOrderbookQuery('', assetPrice)
        );

        if (result.current.data !== undefined) {
            expect(result.current.data).to.be.empty;
        }
    });

    it('Should get lending market lend orderbook data from subgraph', async () => {
        const { result } = renderHook(() =>
            useLendOrderbookQuery(market, assetPrice)
        );

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data !== undefined) {
            const orderbook = result.current.data;

            for (let i = 0; i < orderbook.length; i++) {
                validateOrderbookRow(orderbook[i]);
            }
        }
    });
});

describe('useBorrowOrderbookQuery hook test', () => {
    it('Should return undefined if lending market address is empty', async () => {
        const { result } = renderHook(() =>
            useBorrowOrderbookQuery('', assetPrice)
        );

        if (result.current.data !== undefined) {
            expect(result.current.data).to.be.empty;
        }
    });

    it('Should get lending market borrow orderbook data from subgraph', async () => {
        const { result } = renderHook(() =>
            useBorrowOrderbookQuery(market, assetPrice)
        );

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data !== undefined) {
            const orderbook = result.current.data;

            for (let i = 0; i < orderbook.length; i++) {
                validateOrderbookRow(orderbook[i]);
            }
        }
    });
});

describe('useLendingTradingHistory hook test', () => {
    it('Should return undefined if lending market address is empty', async () => {
        const { result } = renderHook(() =>
            useLendingTradingHistory('', assetPrice)
        );

        expect(result.current.data).to.be.undefined;
    });

    it('Should get lending market trading history data from subgraph', async () => {
        const { result } = renderHook(() =>
            useLendingTradingHistory(market, assetPrice)
        );

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.lendingMarket?.tradeHistory !== undefined) {
            const history = result.current.data.lendingMarket.tradeHistory;

            for (let i = 0; i < history.length; i++) {
                validateTradingHistoryRow(history);
            }
        }
    });
});
