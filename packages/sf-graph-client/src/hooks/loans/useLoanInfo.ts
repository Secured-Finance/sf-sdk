import { GraphApolloClient } from '../../';
import { LoanDocument, LoanQuery } from '../../graphclients';
import { QueryResult, useQuery } from '../useQuery';

export interface LoanInfoVariables {
    id: string;
}

export const useLoanInfo = (
    { id }: LoanInfoVariables,
    client?: GraphApolloClient
): QueryResult<LoanQuery> => {
    const variables = {
        id: id,
    };

    const { error, data } = useQuery<LoanQuery>(LoanDocument, {
        variables: variables,
        client: client,
    });

    const isExists = data?.loan;

    return {
        data: isExists ? data : undefined,
        error,
    };
};
