import { useQuery } from '@apollo/client';
import { LendingMarket, Query } from '../../generated';
import { LENDING_MARKET_INFO } from '../../queries';
import { QueryResult } from '../../utils';

export const useLendingMarketInfo = (
    lendingMarket: string
): QueryResult<LendingMarket> => {
    const variables = {
        market: lendingMarket.toLowerCase(),
    };

    const { error, data } = useQuery<Query>(LENDING_MARKET_INFO, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.lendingMarket) {
        return {
            data: data.lendingMarket,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
