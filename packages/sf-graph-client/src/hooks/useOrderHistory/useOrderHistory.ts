import { GraphApolloClient } from '../../components';
import { OrderHistoryDocument, OrderHistoryQuery } from '../../graphclients';
import { AccountVariable } from '../types';
import { QueryResult, useQuery } from '../useQuery';

export const useOrderHistory = (
    { account }: AccountVariable,
    client?: GraphApolloClient
): QueryResult<OrderHistoryQuery> => {
    const variables = {
        address: account.toLowerCase(),
        awaitRefetchQueries: true,
    };

    const { error, data, refetch, networkStatus } = useQuery<OrderHistoryQuery>(
        OrderHistoryDocument,
        {
            variables: variables,
            client: client,
            fetchPolicy: 'network-only',
            notifyOnNetworkStatusChange: true,
        }
    );

    const isExists = data?.orders;

    return {
        data: isExists ? data : undefined,
        error,
        refetch,
        networkStatus,
    };
};
