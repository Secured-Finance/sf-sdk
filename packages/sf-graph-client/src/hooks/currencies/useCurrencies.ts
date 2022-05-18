import { useQuery } from '@apollo/client';
import { Currency, Query } from '../../generated';
import { CURRENCIES } from '../../queries';

export const useCurrencies = (
    skip: number = 0
): Array<Currency> | undefined => {
    const variables = {
        skip: skip,
    };

    const { error, data } = useQuery<Query>(CURRENCIES, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.currencies) {
        return data.currencies;
    } else {
        return undefined;
    }
};
