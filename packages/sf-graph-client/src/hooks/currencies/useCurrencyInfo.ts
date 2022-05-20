import { useQuery } from '@apollo/client';
import { Currency, Query } from '../../generated';
import { CURRENCY } from '../../queries';
import { generateCurrencyId, QueryResult } from '../../utils';

export const useCurrencyInfo = (
    ccyShortName: string
): QueryResult<Currency> => {
    const currencyId = generateCurrencyId(ccyShortName);

    const variables = {
        currency: currencyId,
    };

    const { error, data } = useQuery<Query>(CURRENCY, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.currency) {
        return {
            data: data.currency,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
