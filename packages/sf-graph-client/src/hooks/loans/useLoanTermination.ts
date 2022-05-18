import { useQuery } from '@apollo/client';
import { LoanTermination, Query } from '../../generated';
import { LOAN_TERMINATION } from '../../queries';

export const useLoanTermination = (
    id: string,
    skip: number = 0
): Array<LoanTermination> | undefined => {
    const variables = {
        id: id,
        skip: skip,
    };

    const { error, data } = useQuery<Query>(LOAN_TERMINATION, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.loanTerminations) {
        return data.loanTerminations;
    } else {
        return undefined;
    }
};
