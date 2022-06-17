import { useQuery } from '@apollo/client';
import {
    TradingHistoryDocument,
    TradingHistoryQuery,
} from '../../../.graphclient';
import { client } from '../../client';
import { QueryResult } from '../../utils';

export const useLendingTradingHistory = (
    lendingMarket: string,
    skip: number = 0
): QueryResult<TradingHistoryQuery> => {
    const variables = {
        market: lendingMarket.toLowerCase(),
        skip: skip,
    };

    const { error, data } = useQuery<TradingHistoryQuery>(
        TradingHistoryDocument,
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

    if (data?.lendingMarket.tradeHistory) {
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
