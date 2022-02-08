import { useCallback, useEffect, useState } from "react"
import { client } from "../../client"
import { PRODUCTS } from "../../queries"

export const useProducts = (skip: number = 0) => {
    const [products, setProducts] = useState()

    const fetchProducts = useCallback(async () => {
        try {
            let res = await client.query({
                query: PRODUCTS,
                variables: {
                    skip: skip,
                },
                fetchPolicy: 'cache-first',
            })
            if (res?.data.products) {
                setProducts(res?.data.products);
            }
        }
        catch (err) {
            console.log(err)
        }
	}, [skip])
    
	useEffect(() => {
        let isMounted = true;
		if (client) {
			fetchProducts();
        }
        return () => {
            isMounted = false
        };
	}, [client, skip])

    return products
}
