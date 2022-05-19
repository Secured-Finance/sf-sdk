import { useQuery } from '@apollo/client';
import { Query, Term } from '../../generated';
import { TERM } from '../../queries';
import { generateTermId, QueryResult } from '../../utils';

export const useTermInfo = (numberOfDays: number): QueryResult<Term> => {
    const termId = generateTermId(numberOfDays);

    const variables = {
        id: termId,
    };

    const { error, data } = useQuery<Query>(TERM, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.term) {
        return {
            data: data.term,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
