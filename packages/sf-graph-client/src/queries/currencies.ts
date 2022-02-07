import { gql } from '@apollo/client';

export const CURRENCIES = gql`
    query Currencies($skip: Int!) {
        currencies (skip: $skip) {
            id
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
`

export const CURRENCY = gql`
    query Currency($currency: Bytes!) {
        currency (id: $currency) {
            id
            identifier
            name
            shortName
            chainID
            ltv
            minMargin
            isSupported
            isCollateral
            terms {
                daysNum
                dfFrac
                paymentNum
            }
        }
    }
`

export const SUPPORTED_CURRENCIES_BY_TERM = gql`
    query SupportedCurrencies($term: Bytes!) {
        terms (where: {id: $term}) {
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
`
