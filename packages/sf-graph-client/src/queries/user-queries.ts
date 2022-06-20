import { gql } from '@apollo/client';

export const OPEN_ORDERS = gql`
    query OpenOrders($account: Bytes!, $market: Bytes!) {
        user(id: $account) {
            openOrders(
                where: { marketAddr: $market }
                orderBy: createdAtTimestamp
                orderDirection: asc
            ) {
                id
                orderId
                currencyName
                currency {
                    identifier
                    shortName
                    name
                    chainId
                }
                side
                marketAddr
                orderState
                term
                rate
                amount
                maker
                createdAtTimestamp
                createdAtBlockNumber
            }
        }
    }
`;

export const TRADE_HISTORY = gql`
    query UserTradingHistory($account: Bytes!, $market: Bytes!) {
        user(id: $account) {
            takenOrders(
                where: { marketAddr: $market }
                orderBy: createdAtTimestamp
                orderDirection: desc
            ) {
                id
                orderId
                currency {
                    identifier
                    shortName
                    name
                    chainId
                }
                side
                marketAddr
                term
                rate
                amount
                maker
                taker
                createdAtTimestamp
                createdAtBlockNumber
            }
            madeOrders(
                where: { marketAddr: $market }
                orderBy: createdAtTimestamp
                orderDirection: desc
            ) {
                id
                orderId
                currency {
                    identifier
                    shortName
                    name
                    chainId
                }
                side
                marketAddr
                term
                rate
                amount
                maker
                taker
                createdAtTimestamp
                createdAtBlockNumber
            }
        }
    }
`;

export const OPEN_LOANS = gql`
    query OpenLoans($account: Bytes!, $currency: Bytes!, $term: Int!) {
        user(id: $account) {
            loans(where: { currency: $currency, term: $term }) {
                id
                lender
                borrower
                currency {
                    identifier
                    shortName
                    name
                    chainId
                }
                term
                notional
                couponPayment
                rate
                startTimestamp
                endTimestamp
                presentValue
                state
            }
        }
    }
`;
