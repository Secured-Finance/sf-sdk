import { renderHook } from '@testing-library/react-hooks';
import { expect } from 'chai';
import {
    GraphApolloClient,
    useBorrowOrderbookQuery,
    useLendingMarketInfo,
    useLendingMarkets,
    useLendingTradingHistory,
    useLendOrderbookQuery,
} from '../../src';
import {
    validateLendingMarket,
    validateOrderbookRow,
    validateTradingHistoryRow,
} from '../utils';

describe('Lending market test', () => {
    let client: GraphApolloClient;
    let market: string;
    const ccy = 'FIL';
    const assetPrice = 100;

    before(() => {
        process.env.SUBGRAPH_NAME = 'sf-protocol-dev';
        process.env.SF_ENV = 'development';
        client = new GraphApolloClient({ network: 'rinkeby' });
    });

    describe('useLendingMarkets hook test', () => {
        it('Should return undefined if currency is wrong', async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                useLendingMarkets({ ccy: '' }, client)
            );
            await waitForNextUpdate();

            expect(result.current.error).to.be.undefined;
            expect(result.current.data?.lendingMarkets.length).to.be.equal(0);
        });

        it('Should get array of lending markets from subgraph', async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                useLendingMarkets({ ccy }, client)
            );

            await waitForNextUpdate();

            expect(result.current.error).to.be.undefined;

            const lendingMarkets = result.current.data?.lendingMarkets;
            expect(lendingMarkets?.length).to.be.equal(6);

            market = lendingMarkets?.[0].id as string;

            for (let i = 0; i < (lendingMarkets?.length || 0); i++) {
                validateLendingMarket(lendingMarkets?.[i]);
            }
        });
    });

    describe('useLendingMarketInfo hook test', () => {
        it('Should return undefined if lending market address is empty', async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                useLendingMarketInfo({ lendingMarket: '0x02' }, client)
            );
            await waitForNextUpdate();

            expect(result.current.error).to.be.undefined;
            expect(result.current.data).to.be.undefined;
        });

        it('Should return lending market data from subgraph', async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                useLendingMarketInfo({ lendingMarket: market }, client)
            );

            await waitForNextUpdate();

            expect(result.current.error).to.be.undefined;

            if (result.current.data?.lendingMarket !== undefined) {
                const market = result.current.data.lendingMarket;

                validateLendingMarket(market);
            }
        });
    });

    describe('useLendOrderbook hook test', () => {
        it('Should return undefined if lending market address is empty', async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                useLendOrderbookQuery(
                    { lendingMarket: '0x03', assetPrice },
                    client
                )
            );

            await waitForNextUpdate();

            expect(result.current.error).to.be.undefined;

            if (result.current.data !== undefined) {
                expect(result.current.data).to.be.empty;
            }
        });

        it('Should get lending market lend orderbook data from subgraph', async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                useLendOrderbookQuery(
                    { lendingMarket: market, assetPrice },
                    client
                )
            );

            await waitForNextUpdate();

            expect(result.current.error).to.be.undefined;

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
            const { result, waitForNextUpdate } = renderHook(() =>
                useBorrowOrderbookQuery(
                    { lendingMarket: '0x04', assetPrice },
                    client
                )
            );

            await waitForNextUpdate();

            expect(result.current.error).to.be.undefined;

            if (result.current.data !== undefined) {
                expect(result.current.data).to.be.empty;
            }
        });

        it('Should get lending market borrow orderbook data from subgraph', async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                useBorrowOrderbookQuery(
                    { lendingMarket: market, assetPrice },
                    client
                )
            );

            await waitForNextUpdate();

            expect(result.current.error).to.be.undefined;

            const orderbook = result.current.data;

            for (let i = 0; i < (orderbook?.length || 0); i++) {
                validateOrderbookRow(orderbook?.[i]);
            }
        });
    });

    describe('useLendingTradingHistory hook test', () => {
        it('Should return undefined if lending market address is empty', async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                useLendingTradingHistory({ lendingMarket: '0x01' }, client)
            );

            await waitForNextUpdate();

            expect(result.current.error).to.be.undefined;
            expect(result.current.data).to.be.undefined;
        });

        it('Should get lending market trading history data from subgraph', async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                useLendingTradingHistory({ lendingMarket: market }, client)
            );

            await waitForNextUpdate();

            expect(result.current.error).to.be.undefined;

            const history = result.current.data?.lendingMarket?.tradeHistory;
            if (history !== undefined) {
                for (let i = 0; i < (history?.length || 0); i++) {
                    validateTradingHistoryRow(history?.[i]);
                }
            }
        });
    });
});
