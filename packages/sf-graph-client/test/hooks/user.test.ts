import { renderHook } from '@testing-library/react-hooks';
import { expect } from 'chai';
import {
    GraphApolloClient,
    useOpenOrders,
    useUsersTradingHistoryQuery,
} from '../../src';

describe('User test', () => {
    let client: GraphApolloClient;

    before(() => {
        process.env.SUBGRAPH_NAME = 'sf-protocol-dev';
        process.env.SF_ENV = 'development';
        client = new GraphApolloClient({ network: 'rinkeby' });
    });

    describe('useOpenOrders hook test', () => {
        const account = '0xMock000000000000000000000000000000000001';
        const market = '0xMock000000000000000000000000000000000001';

        it('Should return empty open orders array on empty market from a subgraph', async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                useOpenOrders({ account, market }, client)
            );

            await waitForNextUpdate();

            expect(result.current.error).to.be.undefined;

            if (result.current.data?.user?.openOrders !== undefined) {
                expect(result.current.data?.user?.openOrders).to.be.empty;
            }
        });
    });

    describe('useUsersTradingHistory hook test', () => {
        const account = '0xMock000000000000000000000000000000000002';
        const market = '0xMock000000000000000000000000000000000002';

        it('Should return empty trading history array on empty market from a subgraph', async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                useUsersTradingHistoryQuery({ account, market }, client)
            );

            await waitForNextUpdate();

            expect(result.current.error).to.be.undefined;

            if (result.current.data !== undefined) {
                expect(result.current.data).to.be.empty;
            }
        });
    });
});
