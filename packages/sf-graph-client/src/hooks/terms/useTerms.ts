import { useQuery } from '@apollo/client';
import { TermsDocument, TermsQuery } from '../../.graphclient';
import { client } from '../../client';
import { QueryResult } from '../../utils';

export const useTerms = (skip = 0): QueryResult<TermsQuery> => {
    const variables = {
        skip: skip,
    };

    const { error, data } = useQuery<TermsQuery>(TermsDocument, {
        variables: variables,
        client: client,
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
            data: data,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
