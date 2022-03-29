import { gql } from '@apollo/client';

export const TERMS = gql`
    query Terms($skip: Int!) {
        terms(skip: $skip) {
            id
            daysNum
            dfFrac
            paymentNum
        }
    }
`;

export const TERM = gql`
    query Term($id: Bytes!) {
        term(id: $id) {
            id
            daysNum
            dfFrac
            paymentNum
            products {
                prefix
                productImplementation
                productController
            }
            currencies {
                identifier
                name
                shortName
                chainID
                ltv
                minMargin
                isSupported
                isCollateral
            }
        }
    }
`;
