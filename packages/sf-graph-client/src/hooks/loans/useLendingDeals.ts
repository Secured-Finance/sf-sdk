import { useQuery } from '@apollo/client';
import { Loan, Query } from '../../generated';
import { LOAN_DEALS } from '../../queries';
import { QueryResult } from '../../utils';

export const useLendingDeals = (
    account: string,
    skip: number = 0
): QueryResult<Array<Loan>> => {
    const variables = {
        account: account.toLowerCase(),
        skip: skip,
    };

    const { error, data } = useQuery<Query>(LOAN_DEALS, {
        variables: variables,
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
            data: data.loans,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
