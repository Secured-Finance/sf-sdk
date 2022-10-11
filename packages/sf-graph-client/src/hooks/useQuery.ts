import {
    ApolloError,
    ApolloQueryResult,
    DocumentNode,
    NetworkStatus,
    OperationVariables,
    QueryHookOptions,
    TypedDocumentNode,
    useQuery as useApolloQuery,
} from '@apollo/client';

export type QueryResult<T> = {
    data: T | undefined;
    error: ApolloError;
    refetch?: () => Promise<ApolloQueryResult<T>>;
    networkStatus?: NetworkStatus;
};

function useQuery<TData, TVariables = OperationVariables>(
    query: DocumentNode | TypedDocumentNode<TData, TVariables>,
    options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData> {
    const { error, data, refetch, networkStatus } = useApolloQuery<
        TData,
        TVariables
    >(query, options);

    if (error) {
        console.error(error);
    }

    return {
        data: data || undefined,
        error: error || undefined,
        refetch,
        networkStatus,
    };
}

export { useQuery };
