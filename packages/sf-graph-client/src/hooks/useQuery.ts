import {
    ApolloError,
    DocumentNode,
    OperationVariables,
    QueryHookOptions,
    TypedDocumentNode,
    useQuery as useApolloQuery,
} from '@apollo/client';

export type QueryResult<T> = {
    data: T | undefined;
    error: ApolloError;
};

function useQuery<TData, TVariables = OperationVariables>(
    query: DocumentNode | TypedDocumentNode<TData, TVariables>,
    options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData> {
    const { error, data } = useApolloQuery<TData, TVariables>(query, options);

    if (error) {
        console.error(error);
    }

    return {
        data: data || undefined,
        error: error || undefined,
    };
}

export { useQuery };
