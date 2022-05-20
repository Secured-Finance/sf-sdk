import { useQuery } from '@apollo/client';
import { LendingMarket, Query } from '../../generated';
import { LENDING_MARKETS_BY_CCY } from '../../queries';
import { generateCurrencyId, QueryResult } from '../../utils';

export const useLendingMarkets = (
    ccyShortName: string,
    skip: number = 0
): QueryResult<Array<LendingMarket>> => {
    let currencyId = generateCurrencyId(ccyShortName);

    const variables = {
        currency: currencyId,
        skip: skip,
    };

    const { error, data } = useQuery<Query>(LENDING_MARKETS_BY_CCY, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.lendingMarkets) {
        return {
            data: data.lendingMarkets,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
