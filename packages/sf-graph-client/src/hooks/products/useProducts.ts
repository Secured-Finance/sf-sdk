import { useQuery } from '@apollo/client';
import { ProductsDocument, ProductsQuery } from '../../.graphclient';
import { client } from '../../client';
import { QueryResult } from '../../utils';

export const useProducts = (skip: number = 0): QueryResult<ProductsQuery> => {
    const variables = {
        skip: skip,
    };

    const { error, data } = useQuery<ProductsQuery>(ProductsDocument, {
        variables: variables,
        client: client,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.products) {
        return {
            data: data,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
