import { useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import {
    UserTradingHistoryDocument,
    UserTradingHistoryQuery,
} from '../../../.graphclient';
import { client } from '../../client';
import { QueryResult } from '../../utils';
import {
    LendingMarketExtendedOrder,
    modifyUsersTradingHistory,
} from './common';

export const useUsersTradingHistory = (
    account: string,
    market: string
): QueryResult<UserTradingHistoryQuery> => {
    const variables = {
        account: account.toLowerCase(),
        market: market,
    };

    const { error, data } = useQuery<UserTradingHistoryQuery>(
        UserTradingHistoryDocument,
        {
            variables: variables,
            client: client,
        }
    );

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.user.madeOrders && data?.user.takenOrders) {
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

    useMemo(async () => {
        if (data) {
            const parsedHistory = await modifyUsersTradingHistory(
                data,
                account
            );

            setTradingHistory(parsedHistory);
        }
    }, [data]);

    return {
        data: tradingHistory,
        error: undefined,
    };
};
