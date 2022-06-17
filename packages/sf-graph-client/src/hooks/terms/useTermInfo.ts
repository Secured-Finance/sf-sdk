import { useQuery } from '@apollo/client';
import { TermDocument, TermQuery } from '../../../.graphclient';
import { client } from '../../client';
import { generateTermId, QueryResult } from '../../utils';

export const useTermInfo = (numberOfDays: number): QueryResult<TermQuery> => {
    const termId = generateTermId(numberOfDays);

    const variables = {
        id: termId,
    };

    const { error, data } = useQuery<TermQuery>(TermDocument, {
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

    if (data?.term) {
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
