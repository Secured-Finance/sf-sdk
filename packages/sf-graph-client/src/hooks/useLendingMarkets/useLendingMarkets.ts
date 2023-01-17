import { GraphApolloClient } from '../../components';
import { LendingMarketsDocument, LendingMarketsQuery } from '../../graphclient';
import { generateCurrencyId } from '../../utils';
import { QueryResult, useQuery } from '../useQuery';

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
