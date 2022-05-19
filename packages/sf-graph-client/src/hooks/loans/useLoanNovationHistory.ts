import { useQuery } from '@apollo/client';
import { LoanNovation, Query } from '../../generated';
import { LOAN_NOVATION_HISTORY } from '../../queries';
import { QueryResult } from '../../utils';

export const useLoanNovationHistory = (
    id: string,
    skip: number = 0
): QueryResult<Array<LoanNovation>> => {
    const variables = {
        id: id,
        skip: skip,
    };

    const { error, data } = useQuery<Query>(LOAN_NOVATION_HISTORY, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.loanNovations) {
        return {
            data: data.loanNovations,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
