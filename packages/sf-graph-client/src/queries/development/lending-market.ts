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

export const DAILY_VOLUMES = gql`
    query DailyVolumes {
        dailyVolumes {
            id
            currency
            maturity
            day
            timestamp
            volume
        }
    }
`;

export const USER_TRANSACTION_HISTORY = gql`
    query UserTransactionHistory($address: ID!, $skip: Int!, $first: Int!) {
        user(id: $address) {
            transactions(
                skip: $skip
                first: $first
                orderBy: createdAt
                orderDirection: desc
            ) {
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
    query UserOrderHistory($address: ID!, $skip: Int!, $first: Int!) {
        user(id: $address) {
            orders(
                skip: $skip
                first: $first
                orderBy: createdAt
                orderDirection: desc
            ) {
                orderId
                currency
                side
                maturity
                unitPrice
                filledAmount
                amount
                status
                createdAt
                txHash
            }
        }
    }
`;

export const TRANSACTION_HISTORY = gql`
    query TransactionHistory(
        $currency: Bytes!
        $maturity: BigInt!
        $from: BigInt!
        $to: BigInt!
    ) {
        transactionHistory: transactions(
            where: {
                currency: $currency
                maturity: $maturity
                createdAt_gte: $from
                createdAt_lt: $to
                executionType: Sync
            }
        ) {
            amount
            maturity
            side
            createdAt
            currency
            averagePrice
        }
        lastTransaction: transactions(
            where: {
                currency: $currency
                maturity: $maturity
                executionType: Sync
            }
            orderBy: createdAt
            orderDirection: desc
            first: 1
        ) {
            amount
            maturity
            side
            createdAt
            currency
            averagePrice
        }
    }
`;
