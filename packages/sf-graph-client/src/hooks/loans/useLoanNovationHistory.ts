import { useQuery } from '@apollo/client';
import {
    LoanNovationHistoryDocument,
    LoanNovationHistoryQuery,
} from '../../.graphclient';
import { client } from '../../client';
import { QueryResult } from '../../utils';

export const useLoanNovationHistory = (
    id: string,
    skip = 0
): QueryResult<LoanNovationHistoryQuery> => {
    const variables = {
        id: id,
        skip: skip,
    };

    const { error, data } = useQuery<LoanNovationHistoryQuery>(
        LoanNovationHistoryDocument,
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

    if (data?.loanNovations) {
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
