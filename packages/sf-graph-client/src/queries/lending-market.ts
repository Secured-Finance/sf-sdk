import { gql } from '@apollo/client';

export const LENDING_MARKETS = gql`
    query LendingMarkets($currency: Bytes!, $skip: Int!) {
        lendingMarkets(
            skip: $skip
            orderBy: maturity
            where: { currency: $currency }
        ) {
            id
            currency
            maturity
        }
    }
`;

export const USER_TRANSACTION_HISTORY = gql`
    query UserTransactionHistory($address: ID!) {
        user(id: $address) {
            transactions(orderBy: createdAt, orderDirection: desc) {
                id
                currency
                maturity
                side
                orderPrice
                forwardValue
                amount
                averagePrice
                createdAt
            }
        }
    }
`;

export const USER_ORDER_HISTORY = gql`
    query UserOrderHistory($address: ID!) {
        user(id: $address) {
            orders(orderBy: createdAt, orderDirection: desc) {
                id
                orderId
                originalOrderId
                currency
                side
                maturity
                unitPrice
                amount
                status
                createdAt
                blockNumber
                txHash
            }
        }
    }
`;
