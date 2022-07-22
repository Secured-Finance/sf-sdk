import { useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import { GraphApolloClient } from '../../';
import {
    UserTradingHistoryDocument,
    UserTradingHistoryQuery,
} from '../../graphclients';
import { QueryResult } from '../../utils';
import {
    LendingMarketExtendedOrder,
    modifyUsersTradingHistory,
} from './common';

export interface UsersTradingHistoryVariables {
    account: string;
    market: string;
}

export interface UsersTradingHistoryQueryVariables {
    account: string;
    market: string;
}

export const useUsersTradingHistory = (
    { account, market }: UsersTradingHistoryVariables,
    client?: GraphApolloClient
): QueryResult<UserTradingHistoryQuery> => {
    const variables = {
        account: account.toLowerCase(),
        market: market,
    };

    const { error, data } = useQuery<UserTradingHistoryQuery>(
        UserTradingHistoryDocument,
        { variables, client }
    );

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.user?.madeOrders && data?.user?.takenOrders) {
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
    { account, market }: UsersTradingHistoryQueryVariables,
    client?: GraphApolloClient
): QueryResult<Array<LendingMarketExtendedOrder>> => {
    const [tradingHistory, setTradingHistory] = useState<
        Array<LendingMarketExtendedOrder>
    >([]);
    const { data, error } = useUsersTradingHistory({ account, market }, client);

    useMemo(async () => {
        if (data) {
            const parsedHistory = await modifyUsersTradingHistory(
                data,
                account
            );

            setTradingHistory(parsedHistory);
        }
    }, [account, data]);

    if (error) {
        return {
            data: undefined,
            error: error,
        };
    }

    return {
        data: tradingHistory,
        error: undefined,
    };
};
