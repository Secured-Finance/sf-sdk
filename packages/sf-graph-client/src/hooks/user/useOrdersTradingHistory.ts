import { useCallback, useEffect, useState } from 'react';
import { client } from '../../client';
import { TRADE_HISTORY } from '../../queries';

export const useOrdersTradingHistory = (account: string, market: string) => {
    const [tradeHistory, setTradeHistory] = useState([]);

    const fetchTradeHistoryOrders = useCallback(async () => {
        const res = await client.query({
            query: TRADE_HISTORY,
            variables: {
                account: account.toLowerCase(),
                market: market,
            },
            fetchPolicy: 'cache-first',
        });
        try {
            if (res?.data.user.madeOrders && res?.data.user.takenOrders) {
                const parsedHistory: Array<any> = [];

                res.data.user.madeOrders.map(function (
                    item: any,
                    index: number
                ) {
                    const counterparty = res.data.user.madeOrders[index].taker;
                    const historyItem = Object.assign(
                        {},
                        res.data.user.madeOrders[index],
                        { counterparty: counterparty }
                    );
                    parsedHistory.push(historyItem);
                });

                res.data.user.takenOrders.map(function (
                    item: any,
                    index: number
                ) {
                    const counterparty = res.data.user.takenOrders[index].maker;
                    const historyItem = Object.assign(
                        {},
                        res.data.user.takenOrders[index],
                        { counterparty: counterparty }
                    );
                    parsedHistory.push(historyItem);
                });

                parsedHistory.sort(function (x, y) {
                    return y.createdAtTimestamp - x.createdAtTimestamp;
                });

                setTradeHistory(parsedHistory);
            }
        } catch (err) {
            console.log(err);
        }
    }, [market, account]);

    useEffect(() => {
        let isMounted = true;
        if (market !== null && account) {
            fetchTradeHistoryOrders();
        }
        return () => {
            isMounted = false;
        };
    }, [market, account, fetchTradeHistoryOrders]);

    return tradeHistory;
};
