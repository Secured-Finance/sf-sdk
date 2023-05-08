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
                filledAmount
                status
                createdAt
                blockNumber
                txHash
            }
        }
    }
`;

export const TRADES = gql`
    query Trades(
        $currency: Bytes!
        $maturity: BigInt!
        $from: BigInt!
        $to: BigInt!
    ) {
        transactions(
            where: {
                currency: $currency
                maturity: $maturity
                createdAt_gte: $from
                createdAt_lt: $to
            }
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
