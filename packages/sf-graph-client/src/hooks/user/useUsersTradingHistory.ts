import { useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import { Query, User } from '../../generated';
import { TRADE_HISTORY } from '../../queries';
import {
    LendingMarketExtendedOrder,
    modifyUsersTradingHistory,
} from './common';

export const useUsersTradingHistory = (
    account: string,
    market: string
): User | undefined => {
    const variables = {
        account: account.toLowerCase(),
        market: market,
    };

    const { error, data } = useQuery<Query>(TRADE_HISTORY, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.user.madeOrders && data?.user.takenOrders) {
        return data.user;
    } else {
        return undefined;
    }
};

export const useUsersTradingHistoryQuery = (
    account: string,
    market: string
): Array<LendingMarketExtendedOrder> => {
    const [tradingHistory, setTradingHistory] = useState<
        Array<LendingMarketExtendedOrder>
    >([]);
    const history = useUsersTradingHistory(account, market);

    useMemo(() => {
        if (history) {
            console.log(history);
            const parsedHistory: Array<LendingMarketExtendedOrder> = [];

            modifyUsersTradingHistory(history, parsedHistory);

            parsedHistory.sort(function (x, y) {
                return y.createdAtTimestamp - x.createdAtTimestamp;
            });

            setTradingHistory(parsedHistory);
        } else {
            return undefined;
        }
    }, [history]);

    return tradingHistory;
};
