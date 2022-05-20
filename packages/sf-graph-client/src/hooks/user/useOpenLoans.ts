import { useQuery } from '@apollo/client';
import { Loan, Query } from '../../generated';
import { OPEN_LOANS } from '../../queries';
import { QueryResult } from '../../utils';

export const useOpenLoans = (
    account: string,
    currency: string,
    term: number
): QueryResult<Array<Loan>> => {
    const variables = {
        account: account.toLowerCase(),
        currency: currency,
        term: term,
    };

    const { error, data } = useQuery<Query>(OPEN_LOANS, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.user.loans) {
        return {
            data: data.user.loans,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
