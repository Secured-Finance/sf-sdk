import { useQuery } from '@apollo/client';
import { BorrowDealsDocument, BorrowDealsQuery } from '../../../.graphclient';
import { client } from '../../client';
import { QueryResult } from '../../utils';

export const useBorrowingDeals = (
    account: string,
    skip: number = 0
): QueryResult<BorrowDealsQuery> => {
    const variables = {
        account: account.toLowerCase(),
        skip: skip,
    };

    const { error, data } = useQuery<BorrowDealsQuery>(BorrowDealsDocument, {
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

    if (data?.loans) {
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
