import { useCallback, useEffect, useState } from 'react';
import { client } from '../../client';
import { LENDING_TRADING_HISTORY } from '../../queries';

export const useLendingTradingHistory = (
    lendingMarket: string,
    skip: number = 0
) => {
    const [tradingHistory, setTradingHistory] = useState();

    const fetchLendingTradingHistory = useCallback(async () => {
        try {
            let res = await client.query({
                query: LENDING_TRADING_HISTORY,
                variables: {
                    market: lendingMarket.toLowerCase(),
                    skip: skip,
                },
                fetchPolicy: 'cache-first',
            });
            if (res?.data.lendingMarket.tradeHistory) {
                setTradingHistory(res?.data.lendingMarket.tradeHistory);
            }
        } catch (err) {
            console.log(err);
        }
    }, [lendingMarket, skip]);

    useEffect(() => {
        if (client) {
            fetchLendingTradingHistory();
        }
    }, [lendingMarket, client]);

    return tradingHistory;
};
