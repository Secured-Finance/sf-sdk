import { useQuery } from '@apollo/client';
import { FilledLendingMarketOrder, Query } from '../../generated';
import { LENDING_TRADING_HISTORY } from '../../queries';

export const useLendingTradingHistory = (
    lendingMarket: string,
    skip: number = 0
): Array<FilledLendingMarketOrder> | undefined => {
    const variables = {
        market: lendingMarket.toLowerCase(),
        skip: skip,
    };

    const { error, data } = useQuery<Query>(LENDING_TRADING_HISTORY, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.lendingMarket.tradeHistory) {
        return data.lendingMarket.tradeHistory;
    } else {
        return undefined;
    }
};
