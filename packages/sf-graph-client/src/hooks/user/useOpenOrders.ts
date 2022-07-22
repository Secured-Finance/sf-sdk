import { useQuery } from '@apollo/client';
import { GraphApolloClient } from '../../';
import { OpenOrdersDocument, OpenOrdersQuery } from '../../graphclients';
import { QueryResult } from '../../utils';

export interface OpenOrdersVariables {
    account: string;
    market: string;
}

export const useOpenOrders = (
    { account, market }: OpenOrdersVariables,
    client?: GraphApolloClient
): QueryResult<OpenOrdersQuery> => {
    const variables = {
        account: account.toLowerCase(),
        market,
    };

    const { error, data } = useQuery<OpenOrdersQuery>(OpenOrdersDocument, {
        variables,
        client,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.user?.openOrders) {
        return {
            data: data,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
