import { useCallback, useEffect, useState } from 'react';
import { client } from '../../client';
import { PRODUCT } from '../../queries';
import { generateProductId } from '../../utils';

export const useProductInfo = (prefix: string) => {
    const [product, setProduct] = useState();
    const productId = generateProductId(prefix);

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
        let isMounted = true;
        if (client) {
            fetchProductInfo();
        }
        return () => {
            isMounted = false;
        };
    }, [client, productId]);

    return product;
};
