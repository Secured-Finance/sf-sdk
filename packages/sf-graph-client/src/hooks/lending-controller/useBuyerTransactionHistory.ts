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
        awaitRefetchQueries: true,
    };

    const { error, data, refetch, networkStatus } =
        useQuery<BuyerTransactionsQuery>(BuyerTransactionsDocument, {
            variables: variables,
            client: client,
            fetchPolicy: 'network-only',
            notifyOnNetworkStatusChange: true,
        });

    const isExists = data?.transactions;

    return {
        data: isExists ? data : undefined,
        error,
        refetch,
        networkStatus,
    };
};
