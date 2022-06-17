import { useQuery } from '@apollo/client';
import { OpenOrdersDocument, OpenOrdersQuery } from '../../../.graphclient';
import { client } from '../../client';
import { QueryResult } from '../../utils';

export const useOpenOrders = (
    account: string,
    market: string
): QueryResult<OpenOrdersQuery> => {
    const variables = {
        account: account.toLowerCase(),
        market: market,
    };

    const { error, data } = useQuery<OpenOrdersQuery>(OpenOrdersDocument, {
        variables: variables,
        client: client,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.user?.openOrders) {
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
