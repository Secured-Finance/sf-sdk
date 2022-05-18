import { useQuery } from '@apollo/client';
import { Currency, Query } from '../../generated';
import { CURRENCY } from '../../queries';
import { generateCurrencyId } from '../../utils';

export const useCurrencyInfo = (ccyShortName: string): Currency | undefined => {
    const currencyId = generateCurrencyId(ccyShortName);

    const variables = {
        currency: currencyId,
    };

    const { error, data } = useQuery<Query>(CURRENCY, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.currency) {
        return data.currency;
    } else {
        return undefined;
    }
};
