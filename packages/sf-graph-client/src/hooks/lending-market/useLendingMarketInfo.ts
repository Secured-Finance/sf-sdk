import { useCallback, useEffect, useState } from 'react';
import { client } from '../../client';
import { LENDING_MARKET_INFO } from '../../queries';

export const useLendingMarketInfo = (lendingMarket: string) => {
    const [lendingMarketInfo, setLendingMarketInfo] = useState();

    const fetchLendingMarketInfo = useCallback(async () => {
        try {
            let res = await client.query({
                query: LENDING_MARKET_INFO,
                variables: {
                    market: lendingMarket.toLowerCase(),
                },
                fetchPolicy: 'cache-first',
            });
            if (res?.data.lendingMarket) {
                setLendingMarketInfo(res?.data.lendingMarket);
            }
        } catch (err) {
            console.log(err);
        }
    }, [lendingMarket]);

    useEffect(() => {
        if (client) {
            fetchLendingMarketInfo();
        }
    }, [lendingMarket, client]);

    return lendingMarketInfo;
};
