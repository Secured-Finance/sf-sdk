import { useCallback, useEffect, useState } from 'react';
import { client } from '../../client';
import { PRODUCT } from '../../queries';
import { generateProductId } from '../../utils';

export const useProductInfo = (prefixOrName: string) => {
    const [product, setProduct] = useState();
    const productId = generateProductId(prefixOrName);

    const fetchProductInfo = useCallback(async () => {
        try {
            let res = await client.query({
                query: PRODUCT,
                variables: {
                    product: productId,
                },
                fetchPolicy: 'cache-first',
            });
            if (res?.data.product) {
                setProduct(res?.data.product);
            }
        } catch (err) {
            console.log(err);
        }
    }, [productId]);

    useEffect(() => {
        if (client) {
            fetchProductInfo();
        }
    }, [client, productId]);

    return product;
};
