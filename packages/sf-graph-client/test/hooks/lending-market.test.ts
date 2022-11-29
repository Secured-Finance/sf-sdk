import { useQuery } from '@apollo/client';
import { renderHook } from '@testing-library/react-hooks';
import { hexlify, randomBytes } from 'ethers/lib/utils';
import Module from 'module';
import { useLendingMarkets, useTransactionHistory } from '../../src';

const mockUseQuery = useQuery as jest.Mock;

jest.mock('@apollo/client', () => ({
    ...(jest.requireActual('@apollo/client') as Module),
    useQuery: jest.fn(),
}));

const transactionsArray = [
    {
        currency: 'FIL',
        side: '0',
        maturity: '1733011200',
        rate: '200000',
        amount: '1000000000000000000000',
    },
];

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

    describe('useTransactionHistory hook test', () => {
        const account = hexlify(randomBytes(20));

        it('Should return array of buyers transactions', async () => {
            mockUseQuery.mockReturnValue({
                data: { transactions: transactionsArray },
            });

            const { result } = renderHook(() =>
                useTransactionHistory({ account })
            );

            expect(result.current.error).toBeUndefined();
            expect(result.current.data?.transactions).toEqual(
                transactionsArray
            );
        });
    });
});
