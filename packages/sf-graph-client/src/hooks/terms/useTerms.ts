import { useQuery } from '@apollo/client';
import { Query, Term } from '../../generated';
import { TERMS } from '../../queries';
import { QueryResult } from '../../utils';

export const useTerms = (skip: number = 0): QueryResult<Array<Term>> => {
    const variables = {
        skip: skip,
    };

    const { error, data } = useQuery<Query>(TERMS, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.terms) {
        return {
            data: data.terms,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
