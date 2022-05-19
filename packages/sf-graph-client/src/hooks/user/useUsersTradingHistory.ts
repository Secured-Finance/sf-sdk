import { useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import { Query, User } from '../../generated';
import { TRADE_HISTORY } from '../../queries';
import { QueryResult } from '../../utils';
import {
    LendingMarketExtendedOrder,
    modifyUsersTradingHistory,
} from './common';

export const useUsersTradingHistory = (
    account: string,
    market: string
): QueryResult<User> => {
    const variables = {
        account: account.toLowerCase(),
        market: market,
    };

    const { error, data } = useQuery<Query>(TRADE_HISTORY, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.user.madeOrders && data?.user.takenOrders) {
        return {
            data: data.user,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};

export const useUsersTradingHistoryQuery = (
    account: string,
    market: string
): QueryResult<Array<LendingMarketExtendedOrder>> => {
    const [tradingHistory, setTradingHistory] = useState<
        Array<LendingMarketExtendedOrder>
    >([]);
    const { data, error } = useUsersTradingHistory(account, market);

    if (error) {
        return {
            data: undefined,
            error: error,
        };
    }

    useMemo(() => {
        if (data) {
            const parsedHistory: Array<LendingMarketExtendedOrder> = [];

            modifyUsersTradingHistory(data, parsedHistory);

            parsedHistory.sort(function (x, y) {
                return y.createdAtTimestamp - x.createdAtTimestamp;
            });

            setTradingHistory(parsedHistory);
        }
    }, [data]);

    return {
        data: tradingHistory,
        error: undefined,
    };
};
