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
                currency
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
                currencyName
                currency
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
                currencyName
                currency
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
