import { gql } from '@apollo/client';

export const LENDING_MARKETS = gql`
    query LendingMarkets($currency: Bytes!, $skip: Int!) {
        lendingMarkets(
            skip: $skip
            orderBy: maturity
            where: { currency: $currency }
        ) {
            id
            contractAddress
            currency
            maturity
        }
    }
`;

export const TRANSACTION_HISTORY = gql`
    query TransactionHistory($address: Bytes!) {
        transactions(
            orderBy: createdAt
            orderDirection: desc
            where: { taker: $address }
        ) {
            id
            currency
            maturity
            side
            orderPrice
            taker
            forwardValue
            amount
            averagePrice
            createdAt
            blockNumber
            txHash
        }
    }
`;

export const ORDER_HISTORY = gql`
    query OrderHistory($address: Bytes!) {
        orders(
            orderBy: createdAt
            orderDirection: desc
            where: { maker: $address }
        ) {
            id
            orderId
            originalOrderId
            maker
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
`;
