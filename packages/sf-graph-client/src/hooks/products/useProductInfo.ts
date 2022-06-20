import { useQuery } from '@apollo/client';
import { ProductDocument, ProductQuery } from '../../.graphclient';
import { client } from '../../client';
import { generateProductId, QueryResult } from '../../utils';

export const useProductInfo = (
    prefixOrName: string
): QueryResult<ProductQuery> => {
    const productId = generateProductId(prefixOrName);

    const variables = {
        product: productId,
    };

    const { error, data } = useQuery<ProductQuery>(ProductDocument, {
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

    if (data?.product) {
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
