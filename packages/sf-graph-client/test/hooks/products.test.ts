import { renderHook } from '@testing-library/react-hooks';
import { useProductInfo, useProducts } from '../../src/hooks';
import { loanPrefix, validateProduct, validateTerm } from '../utils';

describe('useProductInfo hook test', () => {
    it('Should get product by id from subgraph and validate types', async () => {
        const { result } = renderHook(() => useProductInfo(loanPrefix));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.product !== undefined) {
            const product = result.current.data.product;

            validateProduct(product);

            const terms = product.terms;

            for (let i = 0; i < terms.length; i++) {
                validateTerm(terms[i]);
            }
        }
    });
});

describe('useProducts hook test', () => {
    it('Should get all products from subgraph and validate types', async () => {
        const { result } = renderHook(() => useProducts());

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.products !== undefined) {
            const products = result.current.data.products;

            for (let i = 0; i < products.length; i++) {
                validateProduct(products[i]);
            }
        }
    });
});
