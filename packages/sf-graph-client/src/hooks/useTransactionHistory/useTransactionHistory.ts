import { GraphApolloClient } from '../../components';
import {
    TransactionHistoryDocument,
    TransactionHistoryQuery,
} from '../../graphclients';
import { AccountVariable } from '../types';
import { QueryResult, useQuery } from '../useQuery';

export const useTransactionHistory = (
    { account }: AccountVariable,
    client?: GraphApolloClient
): QueryResult<TransactionHistoryQuery> => {
    const variables = {
        address: account.toLowerCase(),
        awaitRefetchQueries: true,
    };

    const { error, data, refetch, networkStatus } =
        useQuery<TransactionHistoryQuery>(TransactionHistoryDocument, {
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
