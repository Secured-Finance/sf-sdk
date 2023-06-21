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
                currency
                maturity
                side
                orderPrice
                forwardValue
                amount
                averagePrice
                createdAt
            }
            orders(
                orderBy: createdAt
                orderDirection: desc
                where: {
                    status_in: [Expired, Cancelled, PartiallyFilled, Filled]
                }
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
