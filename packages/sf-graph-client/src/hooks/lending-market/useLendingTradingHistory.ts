import { useQuery } from '@apollo/client';
import { GraphApolloClient } from '../../';
import {
    TradingHistoryDocument,
    TradingHistoryQuery,
} from '../../graphclients';
import { QueryResult } from '../../utils';

export interface LendingTradingHistoryVariables {
    lendingMarket: string;
    skip?: number;
}

export const useLendingTradingHistory = (
    { lendingMarket, skip = 0 }: LendingTradingHistoryVariables,
    client?: GraphApolloClient
): QueryResult<TradingHistoryQuery> => {
    const variables = {
        market: lendingMarket.toLowerCase(),
        skip: skip,
    };

    const { error, data } = useQuery<TradingHistoryQuery>(
        TradingHistoryDocument,
        { variables, client }
    );

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.lendingMarket?.tradeHistory) {
        return {
            data: data,
            error: undefined,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
