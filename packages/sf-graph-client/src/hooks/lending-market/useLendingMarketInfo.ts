import { GraphApolloClient } from '../../';
import { LendingMarketDocument, LendingMarketQuery } from '../../graphclients';
import { QueryResult, useQuery } from '../useQuery';

export interface LendingMarketInfoVariables {
    lendingMarket: string;
}

export const useLendingMarketInfo = (
    { lendingMarket }: LendingMarketInfoVariables,
    client?: GraphApolloClient
): QueryResult<LendingMarketQuery> => {
    const variables = {
        id: lendingMarket.toLowerCase(),
    };

    const { error, data } = useQuery<LendingMarketQuery>(
        LendingMarketDocument,
        { variables, client }
    );

    return {
        data: data?.lendingMarket ? data : undefined,
        error,
    };
};
