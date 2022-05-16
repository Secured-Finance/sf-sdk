import { useQuery } from '@apollo/client';
import { OPEN_LOANS } from '../../queries';

export const useOpenLoans = (
    account: string,
    currency: string,
    term: number
) => {
    const variables = {
        account: account.toLowerCase(),
        currency: currency,
        term: term,
    };

    const { loading, error, data } = useQuery(OPEN_LOANS, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.user.loans) {
        return data.user.loans;
    }
};
