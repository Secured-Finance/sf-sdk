import { useQuery } from '@apollo/client';
import { Product, Query } from '../../generated';
import { PRODUCTS } from '../../queries';
import { QueryResult } from '../../utils';

export const useProducts = (skip: number = 0): QueryResult<Array<Product>> => {
    const variables = {
        skip: skip,
    };

    const { error, data } = useQuery<Query>(PRODUCTS, {
        variables: variables,
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
            data: data.products,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
