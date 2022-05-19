import { useQuery } from '@apollo/client';
import { Loan, Query } from '../../generated';
import { LOAN_INFO } from '../../queries';
import { QueryResult } from '../../utils';

export const useLoanInfo = (id: string): QueryResult<Loan> => {
    const variables = {
        id: id,
    };

    const { error, data } = useQuery<Query>(LOAN_INFO, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.loan) {
        return {
            data: data.loan,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
