import { useQuery } from '@apollo/client';
import {
    LendingMarketsDocument,
    LendingMarketsQuery,
} from '../../.graphclient';
import { client } from '../../client';
import { generateCurrencyId, QueryResult } from '../../utils';

export const useLendingMarkets = (
    ccyShortName: string,
    skip = 0
): QueryResult<LendingMarketsQuery> => {
    const currencyId = generateCurrencyId(ccyShortName);

    const variables = {
        currency: currencyId,
        skip: skip,
    };

    const { error, data } = useQuery<LendingMarketsQuery>(
        LendingMarketsDocument,
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

    if (data?.lendingMarkets) {
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
