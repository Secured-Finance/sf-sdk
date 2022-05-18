import { useQuery } from '@apollo/client';
import { LoanNovation, Query } from '../../generated';
import { LOAN_NOVATION_HISTORY } from '../../queries';

export const useLoanNovationHistory = (
    id: string,
    skip: number = 0
): Array<LoanNovation> | undefined => {
    const variables = {
        id: id,
        skip: skip,
    };

    const { error, data } = useQuery<Query>(LOAN_NOVATION_HISTORY, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.loanNovations) {
        return data.loanNovations;
    } else {
        return undefined;
    }
};
