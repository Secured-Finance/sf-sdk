import { useQuery } from '@apollo/client';
import { Product, Query } from '../../generated';
import { PRODUCTS } from '../../queries';

export const useProducts = (skip: number = 0): Array<Product> | undefined => {
    const variables = {
        skip: skip,
    };

    const { error, data } = useQuery<Query>(PRODUCTS, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.products) {
        return data.products;
    } else {
        return undefined;
    }
};
