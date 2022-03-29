import { gql } from '@apollo/client';

export const PRODUCTS = gql`
    query Products($skip: Int!) {
        products(skip: $skip) {
            id
            prefix
            productImplementation
            productController
        }
    }
`;

export const PRODUCT = gql`
    query Product($product: Bytes!) {
        product(id: $product) {
            id
            prefix
            productImplementation
            productController
            terms {
                daysNum
                dfFrac
                paymentNum
            }
        }
    }
`;

export const SUPPORTED_PRODUCTS_BY_TERM = gql`
    query SupportedProducts($term: Bytes!) {
        terms(where: { id: $term }) {
            products {
                prefix
                productImplementation
                productController
            }
        }
    }
`;
