import { GraphApolloClient } from '../..';
import {
    SellerTransactionsDocument,
    SellerTransactionsQuery,
} from '../../graphclients';
import { QueryResult, useQuery } from '../useQuery';

export interface TransactionHistoryVariables {
    account: string;
}

export const useSellerTransactionHistory = (
    { account }: TransactionHistoryVariables,
    client?: GraphApolloClient
): QueryResult<SellerTransactionsQuery> => {
    const variables = {
        address: account.toLowerCase(),
    };

    const { error, data } = useQuery<SellerTransactionsQuery>(
        SellerTransactionsDocument,
        {
            variables: variables,
            client: client,
        }
    );

    const isExists = data?.transactions;

    return {
        data: isExists ? data : undefined,
        error,
    };
};
