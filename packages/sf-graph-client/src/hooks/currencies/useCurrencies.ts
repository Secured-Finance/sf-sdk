import { useCallback, useEffect, useState } from 'react';
import { client } from '../../client';
import { CURRENCIES } from '../../queries';

export const useCurrencies = (skip: number = 0) => {
    const [currencies, setCurrencies] = useState();

    const fetchCurrencies = useCallback(async () => {
        try {
            let res = await client.query({
                query: CURRENCIES,
                variables: {
                    skip: skip,
                },
                fetchPolicy: 'cache-first',
            });
            if (res?.data.currencies) {
                setCurrencies(res?.data.currencies);
            }
        } catch (err) {
            console.log(err);
        }
    }, [skip]);

    useEffect(() => {
        if (client) {
            fetchCurrencies();
        }
    }, [client, skip]);

    return currencies;
};
