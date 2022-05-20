import { useQuery } from '@apollo/client';
import { LoanTermination, Query } from '../../generated';
import { LOAN_TERMINATION } from '../../queries';
import { QueryResult } from '../../utils';

export const useLoanTermination = (
    id: string,
    skip: number = 0
): QueryResult<Array<LoanTermination>> => {
    const variables = {
        id: id,
        skip: skip,
    };

    const { error, data } = useQuery<Query>(LOAN_TERMINATION, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.loanTerminations) {
        return {
            data: data.loanTerminations,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
