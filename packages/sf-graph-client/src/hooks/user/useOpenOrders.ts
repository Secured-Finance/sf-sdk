import { useQuery } from '@apollo/client';
import { OPEN_ORDERS } from '../../queries';

export const useOpenOrders = (account: string, market: string) => {
    const variables = {
        account: account.toLowerCase(),
        market: market,
    };

    const { loading, error, data } = useQuery(OPEN_ORDERS, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.user.openOrders) {
        return data.user.openOrders;
    }
};
