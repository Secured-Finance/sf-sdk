import { useQuery } from '@apollo/client';
import { GraphApolloClient } from '../../';
import { LendingMarketDocument, LendingMarketQuery } from '../../graphclients';
import { QueryResult } from '../../utils';

export interface LendingMarketInfoVariables {
    lendingMarket: string;
}

export const useLendingMarketInfo = (
    { lendingMarket }: LendingMarketInfoVariables,
    client?: GraphApolloClient
): QueryResult<LendingMarketQuery> => {
    const variables = {
        market: lendingMarket.toLowerCase(),
    };

    const { error, data } = useQuery<LendingMarketQuery>(
        LendingMarketDocument,
        { variables, client }
    );

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.lendingMarket) {
        return {
            data: data,
            error: undefined,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
