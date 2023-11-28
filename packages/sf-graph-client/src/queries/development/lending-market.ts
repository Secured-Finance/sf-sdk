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
            transactionCount
            transactions(
                orderBy: createdAt
                orderDirection: desc
                skip: $skip
                first: $first
            ) {
                currency
                maturity
                side
                orderPrice
                forwardValue
                amount
                averagePrice
                createdAt
                feeInFV
            }
        }
    }
`;

export const FILTERED_USER_TRANSACTION_HISTORY_ = gql`
    query FilteredUserTransactionHistory(
        $address: ID!
        $currency: Bytes!
        $maturity: BigInt!
    ) {
        user(id: $address) {
            transactions(
                orderBy: createdAt
                orderDirection: desc
                where: { currency: $currency, maturity: $maturity }
            ) {
                currency
                maturity
                side
                orderPrice
                forwardValue
                amount
                averagePrice
                createdAt
                feeInFV
            }
        }
    }
`;

export const USER_ORDER_HISTORY = gql`
    query UserOrderHistory($address: ID!, $skip: Int!, $first: Int!) {
        user(id: $address) {
            orderCount
            orders(
                orderBy: createdAt
                orderDirection: desc
                skip: $skip
                first: $first
            ) {
                orderId
                currency
                side
                maturity
                inputUnitPrice
                inputAmount
                filledAmount
                status
                lendingMarket {
                    id
                    isActive
                }
                type
                createdAt
                txHash
            }
        }
    }
`;

export const FILTERED_USER_ORDER_HISTORY = gql`
    query FilteredUserOrderHistory(
        $address: ID!
        $currency: Bytes!
        $maturity: BigInt!
    ) {
        user(id: $address) {
            orders(
                orderBy: createdAt
                orderDirection: desc
                where: { currency: $currency, maturity: $maturity }
            ) {
                orderId
                currency
                side
                maturity
                inputUnitPrice
                inputAmount
                filledAmount
                status
                lendingMarket {
                    id
                    isActive
                }
                type
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
