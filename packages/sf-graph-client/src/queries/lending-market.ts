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

export const USER_COUNT = gql`
    query UserCount {
        protocol(id: "ethereum") {
            totalUsers
        }
    }
`;

export const USER_HISTORY = gql`
    query UserHistory($address: ID!) {
        user(id: $address) {
            id
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
