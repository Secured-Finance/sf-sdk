import { useMemo, useState } from 'react';
import { GraphApolloClient } from '../../';
import {
    UserTradingHistoryDocument,
    UserTradingHistoryQuery
} from '../../graphclients';
import { QueryResult, useQuery } from '../useQuery';
import {
    LendingMarketExtendedOrder,
    modifyUsersTradingHistory
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
        id: account.toLowerCase(),
        market: market,
    };

    const { error, data } = useQuery<UserTradingHistoryQuery>(
        UserTradingHistoryDocument,
        { variables, client }
    );

    const isExists = data?.user?.madeOrders && data?.user?.takenOrders;

    return {
        data: isExists ? data : undefined,
        error,
    };
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
