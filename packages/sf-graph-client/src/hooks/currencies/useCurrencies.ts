import { useQuery } from '@apollo/client';
import { CurrenciesDocument, CurrenciesQuery } from '../../.graphclient';
import { client } from '../../client';
import { QueryResult } from '../../utils';

export const useCurrencies = (skip = 0): QueryResult<CurrenciesQuery> => {
    const variables = {
        skip: skip,
    };

    const { error, data } = useQuery<CurrenciesQuery>(CurrenciesDocument, {
        variables: variables,
        client: client,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.currencies) {
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
