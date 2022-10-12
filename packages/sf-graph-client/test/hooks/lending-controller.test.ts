import { useQuery } from '@apollo/client';
import { renderHook } from '@testing-library/react-hooks';
import { utils } from 'ethers';
import Module from 'module';
import {
    GraphApolloClient,
    useBuyerTransactionHistory,
    useSellerTransactionHistory,
} from '../../src';
import { validateTransactions } from '../utils';

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

describe('Lending Controller test', () => {
    let client: GraphApolloClient;

    beforeEach(() => {
        process.env.SUBGRAPH_NAME = 'sf-protocol-dev';
        process.env.SF_ENV = 'development';
        client = new GraphApolloClient({ network: 'goerli' });
    });

    describe('useBuyerTransactionHistory hook test', () => {
        const account = utils.hexlify(utils.randomBytes(20));

        it('Should return array of buyers transactions', async () => {
            mockUseQuery.mockReturnValue({
                data: { transactions: transactionsArray },
            });

            const { result } = renderHook(() =>
                useBuyerTransactionHistory({ account }, client)
            );

            const transactions = result.current.data?.transactions;

            expect(result.current.error).toBeUndefined();
            expect(result.current.data?.transactions).toEqual(
                transactionsArray
            );

            for (let i = 0; i < (transactions?.length || 0); i++) {
                validateTransactions(transactions?.[i]);
            }
        });
    });

    describe('useSellerTransactionHistory hook test', () => {
        const account = utils.hexlify(utils.randomBytes(20));

        it('Should return array of sellers transactions', async () => {
            mockUseQuery.mockReturnValue({
                data: { transactions: transactionsArray },
            });

            const { result } = renderHook(() =>
                useSellerTransactionHistory({ account }, client)
            );

            const transactions = result.current.data?.transactions;

            expect(result.current.error).toBeUndefined();
            expect(transactions).toEqual(transactionsArray);

            for (let i = 0; i < (transactions?.length || 0); i++) {
                validateTransactions(transactions?.[i]);
            }
        });
    });
});
