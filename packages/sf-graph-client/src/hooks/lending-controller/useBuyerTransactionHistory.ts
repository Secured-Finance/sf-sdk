import { GraphApolloClient } from '../..';
import {
    BuyerTransactionTableDocument,
    BuyerTransactionTableQuery,
} from '../../graphclients';
import { QueryResult, useQuery } from '../useQuery';
import { TransactionHistoryVariables } from './useSellerTransactionHistory';

export const useBuyerTransactionHistory = (
    { account }: TransactionHistoryVariables,
    client?: GraphApolloClient
): QueryResult<BuyerTransactionTableQuery> => {
    const variables = {
        account: account.toLowerCase(),
    };

    const { error, data } = useQuery<BuyerTransactionTableQuery>(
        BuyerTransactionTableDocument,
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
