import { useQuery } from '@apollo/client';
import { Loan, Query } from '../../generated';
import { OPEN_LOANS } from '../../queries';

export const useOpenLoans = (
    account: string,
    currency: string,
    term: number
): Array<Loan> | undefined => {
    const variables = {
        account: account.toLowerCase(),
        currency: currency,
        term: term,
    };

    const { error, data } = useQuery<Query>(OPEN_LOANS, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.user.loans) {
        return data.user.loans;
    } else {
        return undefined;
    }
};
