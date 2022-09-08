import { gql } from '@apollo/client';

export const OPEN_ORDERS = gql`
    query OpenOrders($id: ID!, $market: Bytes!) {
        user(id: $id) {
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
    query UserTradingHistory($id: ID!, $market: Bytes!) {
        user(id: $id) {
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
