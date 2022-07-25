import { GraphApolloClient } from '../../';
import { BorrowDealsDocument, BorrowDealsQuery } from '../../graphclients';
import { QueryResult, useQuery } from '../useQuery';

export interface BorrowingDealsVariables {
    account: string;
    skip?: number;
}

export const useBorrowingDeals = (
    { account, skip = 0 }: BorrowingDealsVariables,
    client?: GraphApolloClient
): QueryResult<BorrowDealsQuery> => {
    const variables = {
        account: account.toLowerCase(),
        skip: skip,
    };

    const { error, data } = useQuery<BorrowDealsQuery>(BorrowDealsDocument, {
        variables: variables,
        client: client,
    });

    const isExists = data?.loans;

    return {
        data: isExists ? data : undefined,
        error,
    };
};
