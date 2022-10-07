import { GraphApolloClient } from '../..';
import {
    BuyerTransactionsDocument,
    BuyerTransactionsQuery,
} from '../../graphclients';
import { QueryResult, useQuery } from '../useQuery';
import { TransactionHistoryVariables } from './useSellerTransactionHistory';

export const useBuyerTransactionHistory = (
    { account }: TransactionHistoryVariables,
    client?: GraphApolloClient
): QueryResult<BuyerTransactionsQuery> => {
    const variables = {
        address: account.toLowerCase(),
    };

    const { error, data } = useQuery<BuyerTransactionsQuery>(
        BuyerTransactionsDocument,
        {
            variables: variables,
            client: client,
        }
    );

    const isExists = data?.transactions;

    return {
        data: isExists ? data : undefined,
        error,
    };
};
