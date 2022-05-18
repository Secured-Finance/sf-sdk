import { useQuery } from '@apollo/client';
import { Query, Term } from '../../generated';
import { TERMS } from '../../queries';

export const useTerms = (skip: number = 0): Array<Term> | undefined => {
    const variables = {
        skip: skip,
    };

    const { error, data } = useQuery<Query>(TERMS, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.terms) {
        return data.terms;
    } else {
        return undefined;
    }
};
