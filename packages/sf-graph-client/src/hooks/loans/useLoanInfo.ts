import { useQuery } from '@apollo/client';
import { Loan, Query } from '../../generated';
import { LOAN_INFO } from '../../queries';

export const useLoanInfo = (id: string): Loan | undefined => {
    const variables = {
        id: id,
    };

    const { error, data } = useQuery<Query>(LOAN_INFO, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.loan) {
        return data.loan;
    } else {
        return undefined;
    }
};
