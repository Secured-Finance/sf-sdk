import { useQuery } from '@apollo/client';
import { LendingMarketOrder, Query } from '../../generated';
import { OPEN_ORDERS } from '../../queries';
import { QueryResult } from '../../utils';

export const useOpenOrders = (
    account: string,
    market: string
): QueryResult<Array<LendingMarketOrder>> => {
    const variables = {
        account: account.toLowerCase(),
        market: market,
    };

    const { error, data } = useQuery<Query>(OPEN_ORDERS, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.user.openOrders) {
        return {
            data: data.user.openOrders,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
