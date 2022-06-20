import { useQuery } from '@apollo/client';
import { CurrencyDocument, CurrencyQuery } from '../../.graphclient';
import { client } from '../../client';
import { generateCurrencyId, QueryResult } from '../../utils';

export const useCurrencyInfo = (
    ccyShortName: string
): QueryResult<CurrencyQuery> => {
    const currencyId = generateCurrencyId(ccyShortName);

    const variables = {
        currency: currencyId,
    };

    const { error, data } = useQuery<CurrencyQuery>(CurrencyDocument, {
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

    if (data?.currency) {
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
