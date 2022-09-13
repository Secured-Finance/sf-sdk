import { GraphApolloClient } from '../..';
import {
    SellerTransactionTableDocument,
    SellerTransactionTableQuery,
} from '../../graphclients';
import { QueryResult, useQuery } from '../useQuery';

export interface TransactionHistoryVariables {
    account: string;
}

export const useSellerTransactionHistory = (
    { account }: TransactionHistoryVariables,
    client?: GraphApolloClient
): QueryResult<SellerTransactionTableQuery> => {
    const variables = {
        account: account.toLowerCase(),
    };

    const { error, data } = useQuery<SellerTransactionTableQuery>(
        SellerTransactionTableDocument,
        {
            variables: variables,
            client: client,
        }
    );

    const isExists = data?.transactionTables;

    return {
        data: isExists ? data : undefined,
        error,
    };
};
