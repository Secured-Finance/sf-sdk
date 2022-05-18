import { useQuery } from '@apollo/client';
import { Loan, Query } from '../../generated';
import { BORROW_DEALS } from '../../queries';

export const useBorrowingDeals = (
    account: string,
    skip: number = 0
): Array<Loan> | undefined => {
    const variables = {
        account: account.toLowerCase(),
        skip: skip,
    };

    const { error, data } = useQuery<Query>(BORROW_DEALS, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.loans) {
        return data.loans;
    } else {
        return undefined;
    }
};
