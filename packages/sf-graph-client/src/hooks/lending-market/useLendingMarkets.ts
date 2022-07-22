import { useQuery } from '@apollo/client';
import { GraphApolloClient } from '../../';
import {
    LendingMarketsDocument,
    LendingMarketsQuery,
} from '../../graphclients';
import { generateCurrencyId, QueryResult } from '../../utils';

export interface LendingMarketsVariables {
    ccy: string;
    skip?: number;
}

export const useLendingMarkets = (
    { ccy, skip = 0 }: LendingMarketsVariables,
    client?: GraphApolloClient
): QueryResult<LendingMarketsQuery> => {
    const currencyId = generateCurrencyId(ccy);

    const variables = {
        currency: currencyId,
        skip: skip,
    };

    const { error, data } = useQuery<LendingMarketsQuery>(
        LendingMarketsDocument,
        { variables, client }
    );

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.lendingMarkets) {
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
