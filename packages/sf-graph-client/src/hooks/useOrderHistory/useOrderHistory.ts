import {
    UserOrderHistoryDocument,
    UserOrderHistoryQuery,
} from 'src/graphclient/.graphclient';
import { GraphApolloClient } from '../../components';
import { AccountVariable } from '../types';
import { QueryResult, useQuery } from '../useQuery';

export const useOrderHistory = (
    { account }: AccountVariable,
    client?: GraphApolloClient
): QueryResult<UserOrderHistoryQuery> => {
    const variables = {
        address: account.toLowerCase(),
        awaitRefetchQueries: true,
    };

    const { error, data, refetch, networkStatus } =
        useQuery<UserOrderHistoryQuery>(UserOrderHistoryDocument, {
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
