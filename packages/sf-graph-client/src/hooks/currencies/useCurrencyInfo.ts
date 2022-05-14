import { useCallback, useEffect, useState } from 'react';
import { client } from '../../client';
import { CURRENCY } from '../../queries';
import { generateCurrencyId } from '../../utils';

export const useCurrencyInfo = (ccyShortName: string) => {
    const [currency, setCurrency] = useState();
    const currencyId = generateCurrencyId(ccyShortName);

    const fetchCurrencyInfo = useCallback(async () => {
        try {
            let res = await client.query({
                query: CURRENCY,
                variables: {
                    currency: currencyId,
                },
                fetchPolicy: 'cache-first',
            });
            if (res?.data.currency) {
                setCurrency(res?.data.currency);
            }
        } catch (err) {
            console.log(err);
        }
    }, [ccyShortName]);

    useEffect(() => {
        if (client) {
            fetchCurrencyInfo();
        }
    }, [client, ccyShortName]);

    return currency;
};
