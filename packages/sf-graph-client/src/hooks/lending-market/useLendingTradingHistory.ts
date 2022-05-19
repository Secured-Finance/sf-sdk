import { useQuery } from '@apollo/client';
import { FilledLendingMarketOrder, Query } from '../../generated';
import { LENDING_TRADING_HISTORY } from '../../queries';
import { QueryResult } from '../../utils';

export const useLendingTradingHistory = (
    lendingMarket: string,
    skip: number = 0
): QueryResult<Array<FilledLendingMarketOrder>> => {
    const variables = {
        market: lendingMarket.toLowerCase(),
        skip: skip,
    };

    const { error, data } = useQuery<Query>(LENDING_TRADING_HISTORY, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.lendingMarket.tradeHistory) {
        return {
            data: data.lendingMarket.tradeHistory,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
