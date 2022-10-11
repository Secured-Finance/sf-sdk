import { renderHook } from '@testing-library/react-hooks';
import { expect } from 'chai';
import {
    GraphApolloClient,
    useLendingMarkets,
    useLendingTradingHistory,
} from '../../src';
import { validateLendingMarket, validateTradingHistoryRow } from '../utils';

describe('Lending market test', () => {
    let client: GraphApolloClient;
    let market: string;
    const ccy = 'FIL';

    before(() => {
        process.env.SUBGRAPH_NAME = 'sf-protocol-dev';
        process.env.SF_ENV = 'development';
        client = new GraphApolloClient({ network: 'goerli' });
    });

    describe('useLendingMarkets hook test', () => {
        it('Should return undefined if currency is wrong', async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                useLendingMarkets({ ccy: '0x01' }, client)
            );
            await waitForNextUpdate({ timeout: 5000 });

            expect(result.current.error).to.be.undefined;
            expect(result.current.data?.lendingMarkets.length).to.be.equal(0);
        });

        it('Should get array of lending markets from subgraph', async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                useLendingMarkets({ ccy }, client)
            );

            await waitForNextUpdate({ timeout: 5000 });

            expect(result.current.error).to.be.undefined;

            const lendingMarkets = result.current.data?.lendingMarkets;
            expect(lendingMarkets?.length).to.be.equal(8);

            market = lendingMarkets?.[0].id as string;

            for (let i = 0; i < (lendingMarkets?.length || 0); i++) {
                validateLendingMarket(lendingMarkets?.[i]);
            }
        });
    });

    describe('useLendingTradingHistory hook test', () => {
        it('Should return undefined if lending market address is empty', async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                useLendingTradingHistory({ lendingMarket: '0x01' }, client)
            );

            await waitForNextUpdate({ timeout: 5000 });

            expect(result.current.error).to.be.undefined;
            expect(result.current.data).to.be.undefined;
        });

        it('Should get lending market trading history data from subgraph', async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                useLendingTradingHistory({ lendingMarket: market }, client)
            );

            await waitForNextUpdate({ timeout: 5000 });

            expect(result.current.error).to.be.undefined;

            const history = result.current.data?.lendingMarket?.transactions;
            if (history !== undefined) {
                for (let i = 0; i < (history?.length || 0); i++) {
                    validateTradingHistoryRow(history?.[i]);
                }
            }
        });
    });
});
