import { useQuery } from '@apollo/client';
import { LoanDocument, LoanQuery } from '../../../.graphclient';
import { client } from '../../client';
import { QueryResult } from '../../utils';

export const useLoanInfo = (id: string): QueryResult<LoanQuery> => {
    const variables = {
        id: id,
    };

    const { error, data } = useQuery<LoanQuery>(LoanDocument, {
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

    if (data?.loan) {
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
