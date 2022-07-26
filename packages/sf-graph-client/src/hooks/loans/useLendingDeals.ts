import { GraphApolloClient } from '../../';
import { LoanDealsDocument, LoanDealsQuery } from '../../graphclients';
import { QueryResult, useQuery } from '../useQuery';

export interface LendingDealsVariables {
    account: string;
    skip?: number;
}

export const useLendingDeals = (
    { account, skip = 0 }: LendingDealsVariables,
    client?: GraphApolloClient
): QueryResult<LoanDealsQuery> => {
    const variables = {
        account: account.toLowerCase(),
        skip: skip,
    };

    const { error, data } = useQuery<LoanDealsQuery>(LoanDealsDocument, {
        variables: variables,
        client: client,
    });

    const isExists = data?.loans;

    return {
        data: isExists ? data : undefined,
        error,
    };
};
