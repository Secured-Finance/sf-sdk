import { GraphApolloClient } from '../../';
import { OpenOrdersDocument, OpenOrdersQuery } from '../../graphclients';
import { QueryResult, useQuery } from '../useQuery';
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

    const isExists = data?.user?.openOrders;

    return {
        data: isExists ? data : undefined,
        error,
    };
};
