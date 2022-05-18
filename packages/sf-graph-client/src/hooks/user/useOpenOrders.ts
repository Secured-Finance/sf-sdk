import { useQuery } from '@apollo/client';
import { LendingMarketOrder, Query } from '../../generated';
import { OPEN_ORDERS } from '../../queries';

export const useOpenOrders = (
    account: string,
    market: string
): Array<LendingMarketOrder> | undefined => {
    const variables = {
        account: account.toLowerCase(),
        market: market,
    };

    const { error, data } = useQuery<Query>(OPEN_ORDERS, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.user.openOrders) {
        return data.user.openOrders;
    } else {
        return undefined;
    }
};
