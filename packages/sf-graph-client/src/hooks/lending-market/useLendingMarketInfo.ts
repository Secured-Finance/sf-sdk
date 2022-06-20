import { useQuery } from '@apollo/client';
import { LendingMarketDocument, LendingMarketQuery } from '../../.graphclient';
import { client } from '../../client';
import { QueryResult } from '../../utils';

export const useLendingMarketInfo = (
    lendingMarket: string
): QueryResult<LendingMarketQuery> => {
    const variables = {
        market: lendingMarket.toLowerCase(),
    };

    const { error, data } = useQuery<LendingMarketQuery>(
        LendingMarketDocument,
        {
            variables: variables,
            client: client,
        }
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
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
