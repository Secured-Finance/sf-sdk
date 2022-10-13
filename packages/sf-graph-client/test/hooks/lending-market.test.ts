import { useQuery } from '@apollo/client';
import { renderHook } from '@testing-library/react-hooks';
import Module from 'module';
import { useLendingMarkets, useLendingTradingHistory } from '../../src';

const mockUseQuery = useQuery as jest.Mock;

jest.mock('@apollo/client', () => ({
    ...(jest.requireActual('@apollo/client') as Module),
    useQuery: jest.fn(),
}));

const lendingMarketsArray = [
    {
        id: '0x61f825092f04d5c3fd690ad12c7a8b4b5020092b',
        contractAddress: '0x61f825092f04d5c3fd690ad12c7a8b4b5020092b',
        currencyName: 'FIL',
        maturity: '1717200000',
    },
    {
        id: '0xf745de14e2c00ff80a4e3d44d5b34cb6be48e2d3',
        contractAddress: '0xf745de14e2c00ff80a4e3d44d5b34cb6be48e2d3',
        currencyName: 'FIL',
        maturity: '1725148800',
    },
];

const transactionsObj = {
    rate: '200000',
    side: '0',
    amount: '1000000000000000000000',
    createdAt: '1725148800',
};

describe('Lending market test', () => {
    const ccy = 'FIL';

    beforeEach(() => {
        process.env.SUBGRAPH_NAME = 'sf-protocol-dev';
        process.env.SF_ENV = 'development';
    });

    describe('useLendingMarkets hook test', () => {
        it('Should get array of lending markets from subgraph', async () => {
            mockUseQuery.mockReturnValue({
                data: { lendingMarkets: lendingMarketsArray },
            });

            const { result } = renderHook(() => useLendingMarkets({ ccy }));

            expect(result.current.error).toBeUndefined();
            expect(result.current.data?.lendingMarkets).toEqual(
                lendingMarketsArray
            );
        });
    });

    describe('useLendingTradingHistory hook test', () => {
        it('Should get lending market trading history data from subgraph', async () => {
            mockUseQuery.mockReturnValue({
                data: { lendingMarket: { transactions: transactionsObj } },
            });

            const { result } = renderHook(() =>
                useLendingTradingHistory({ lendingMarket: '0x01' })
            );

            expect(result.current.error).toBeUndefined();
            expect(result.current.data?.lendingMarket?.transactions).toEqual(
                transactionsObj
            );
        });
    });
});
