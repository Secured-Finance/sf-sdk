import { GraphApolloClient } from '../../';
import {
    TradingHistoryDocument,
    TradingHistoryQuery
} from '../../graphclients';
import { QueryResult, useQuery } from '../useQuery';

export interface LendingTradingHistoryVariables {
    lendingMarket: string;
    skip?: number;
}

export const useLendingTradingHistory = (
    { lendingMarket, skip = 0 }: LendingTradingHistoryVariables,
    client?: GraphApolloClient
): QueryResult<TradingHistoryQuery> => {
    const variables = {
        id: lendingMarket.toLowerCase(),
        skip: skip,
    };

    const { error, data } = useQuery<TradingHistoryQuery>(
        TradingHistoryDocument,
        { variables, client }
    );

    const isExists = data?.lendingMarket?.tradeHistory;

    return {
        data: isExists ? data : undefined,
        error,
    };
};
