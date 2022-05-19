import { useQuery } from '@apollo/client';
import { Currency, Query } from '../../generated';
import { CURRENCIES } from '../../queries';
import { QueryResult } from '../../utils';

export const useCurrencies = (
    skip: number = 0
): QueryResult<Array<Currency>> => {
    const variables = {
        skip: skip,
    };

    const { error, data } = useQuery<Query>(CURRENCIES, {
        variables: variables,
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
            data: data.currencies,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
