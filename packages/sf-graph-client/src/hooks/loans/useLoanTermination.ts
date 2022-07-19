import { useQuery } from '@apollo/client';
import {
    LoanTerminationDocument,
    LoanTerminationQuery,
} from '../../.graphclient';
import { client } from '../../client';
import { QueryResult } from '../../utils';

export const useLoanTermination = (
    id: string,
    skip = 0
): QueryResult<LoanTerminationQuery> => {
    const variables = {
        id: id,
        skip: skip,
    };

    const { error, data } = useQuery<LoanTerminationQuery>(
        LoanTerminationDocument,
        {
            variables: variables,
            client: client,
        }
    );

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.loanTerminations) {
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
