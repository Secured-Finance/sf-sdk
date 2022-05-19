import { useQuery } from '@apollo/client';
import { Product, Query } from '../../generated';
import { PRODUCT } from '../../queries';
import { generateProductId, QueryResult } from '../../utils';

export const useProductInfo = (prefixOrName: string): QueryResult<Product> => {
    const productId = generateProductId(prefixOrName);

    const variables = {
        product: productId,
    };

    const { error, data } = useQuery<Query>(PRODUCT, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.product) {
        return {
            data: data.product,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
