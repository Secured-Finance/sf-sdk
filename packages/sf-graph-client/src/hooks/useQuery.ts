import {
    ApolloQueryResult,
    DocumentNode,
    OperationVariables,
    QueryHookOptions,
    TypedDocumentNode,
    useQuery as useApolloQuery,
} from '@apollo/client';

export type QueryResult<T> = ApolloQueryResult<T>;

function useQuery<TData, TVariables = OperationVariables>(
    query: DocumentNode | TypedDocumentNode<TData, TVariables>,
    options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData> {
    const result = useApolloQuery<TData, TVariables>(query, options);

    if (result.error) {
        console.error('Error in query:', result.error);
    }

    return result;
}

export { useQuery };
