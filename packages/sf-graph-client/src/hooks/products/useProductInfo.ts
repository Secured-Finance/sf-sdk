import { useQuery } from '@apollo/client';
import { Product, Query } from '../../generated';
import { PRODUCT } from '../../queries';
import { generateProductId } from '../../utils';

export const useProductInfo = (prefixOrName: string): Product | undefined => {
    const productId = generateProductId(prefixOrName);

    const variables = {
        product: productId,
    };

    const { error, data } = useQuery<Query>(PRODUCT, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.product) {
        return data.product;
    } else {
        return undefined;
    }
};
