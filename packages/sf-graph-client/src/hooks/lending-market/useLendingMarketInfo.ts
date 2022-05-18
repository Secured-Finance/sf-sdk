import { useQuery } from '@apollo/client';
import { LendingMarket, Query } from '../../generated';
import { LENDING_MARKET_INFO } from '../../queries';

export const useLendingMarketInfo = (
    lendingMarket: string
): LendingMarket | undefined => {
    const variables = {
        market: lendingMarket.toLowerCase(),
    };

    const { error, data } = useQuery<Query>(LENDING_MARKET_INFO, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.lendingMarket) {
        return data.lendingMarket;
    } else {
        return undefined;
    }
};
