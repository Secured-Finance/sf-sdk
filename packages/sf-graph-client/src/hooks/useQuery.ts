import {
    DocumentNode,
    OperationVariables,
    QueryHookOptions,
    TypedDocumentNode,
    useQuery as useApolloQuery,
} from '@apollo/client';

function useQuery<TData, TVariables = OperationVariables>(
    query: DocumentNode | TypedDocumentNode<TData, TVariables>,
    options?: QueryHookOptions<TData, TVariables>
) {
    const result = useApolloQuery<TData, TVariables>(query, options);

    if (result.error) {
        console.error(result.error);
    }

    return result;
}

export { useQuery };
