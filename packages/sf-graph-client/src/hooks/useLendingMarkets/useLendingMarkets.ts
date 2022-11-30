import { GraphApolloClient } from 'src';
import { LendingMarketsDocument, LendingMarketsQuery } from 'src/graphclients';
import { QueryResult, useQuery } from 'src/hooks';
import { generateCurrencyId } from 'src/utils';

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

    return {
        data: data?.lendingMarkets ? data : undefined,
        error,
    };
};
