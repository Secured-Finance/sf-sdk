import { GraphApolloClient } from '../../components';
import {
    UserTransactionHistoryDocument,
    UserTransactionHistoryQuery,
} from '../../graphclient';
import { AccountVariable } from '../types';
import { QueryResult, useQuery } from '../useQuery';

export const useTransactionHistory = (
    { account }: AccountVariable,
    client?: GraphApolloClient
): QueryResult<UserTransactionHistoryQuery> => {
    const variables = {
        address: account.toLowerCase(),
        awaitRefetchQueries: true,
    };

    const { error, data, refetch, networkStatus } =
        useQuery<UserTransactionHistoryQuery>(UserTransactionHistoryDocument, {
            variables: variables,
            client: client,
            fetchPolicy: 'network-only',
            notifyOnNetworkStatusChange: true,
        });

    const isExists = data?.user;

    return {
        data: isExists ? data : undefined,
        error,
        refetch,
        networkStatus,
    };
};
