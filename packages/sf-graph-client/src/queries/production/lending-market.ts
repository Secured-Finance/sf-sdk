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
        protocol(id: "1") {
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
    query UserTransactionHistory($address: ID!, $skip: Int!, $count: Int!) {
        user(id: $address) {
            transactionCount
            transactions(
                orderBy: createdAt
                orderDirection: desc
                skip: $skip
                first: $count
            ) {
                id
                currency
                maturity
                side
                executionPrice
                futureValue
                amount
                averagePrice
                createdAt
                feeInFV
                user {
                    id
                }
            }
        }
    }
`;

export const FILTERED_USER_TRANSACTION_HISTORY = gql`
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
                id
                currency
                maturity
                side
                executionPrice
                futureValue
                amount
                averagePrice
                createdAt
                feeInFV
                user {
                    id
                }
            }
        }
    }
`;

export const FULL_USER_TRANSACTION_HISTORY = gql`
    query FullUserTransactionHistory($address: ID!) {
        user(id: $address) {
            transactions(orderBy: createdAt, orderDirection: desc) {
                id
                currency
                maturity
                side
                executionPrice
                futureValue
                amount
                averagePrice
                createdAt
                feeInFV
                user {
                    id
                }
            }
        }
    }
`;

export const USER_ORDER_HISTORY = gql`
    query UserOrderHistory($address: ID!, $skip: Int!, $count: Int!) {
        user(id: $address) {
            orderCount
            orders(
                orderBy: createdAt
                orderDirection: desc
                skip: $skip
                first: $count
            ) {
                id
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
                isCircuitBreakerTriggered
                createdAt
                txHash
                user {
                    id
                }
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
                id
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
                isCircuitBreakerTriggered
                createdAt
                txHash
                user {
                    id
                }
            }
        }
    }
`;

export const FULL_USER_ORDER_HISTORY = gql`
    query FullUserOrderHistory($address: ID!) {
        user(id: $address) {
            orders(orderBy: createdAt, orderDirection: desc) {
                id
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
                isCircuitBreakerTriggered
                createdAt
                txHash
                user {
                    id
                }
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
        $sides: [Int!]!
    ) {
        transactionHistory: transactions(
            where: {
                currency: $currency
                maturity: $maturity
                createdAt_gte: $from
                createdAt_lt: $to
                executionType: Taker
                side_in: $sides
            }
            orderBy: createdAt
            orderDirection: desc
        ) {
            amount
            maturity
            side
            createdAt
            currency
            averagePrice
            executionPrice
            txHash
        }
        lastTransaction: transactions(
            where: {
                currency: $currency
                maturity: $maturity
                executionType: Taker
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
            executionPrice
            txHash
        }
    }
`;

export const TRANSACTION_CANDLE_STICK = gql`
    query TransactionCandleStick(
        $currency: Bytes!
        $maturity: BigInt!
        $interval: BigInt!
    ) {
        transactionCandleSticks(
            where: {
                currency: $currency
                maturity: $maturity
                interval: $interval
            }
        ) {
            currency
            maturity
            interval
            timestamp
            open
            close
            high
            low
            average
            volume
            volumeInFV
        }
    }
`;

export const TRANSACTIONS_BY_TIMESTAMP_AND_MATURITY_QUERY = (
    timestamps: number[],
    maturityList: number[],
    currency: string
) => {
    if (!timestamps || !maturityList || !currency)
        throw new Error('Invalid Parameters');
    if (!timestamps.length || !maturityList.length)
        throw new Error("Timestamps and MaturityList can't be empty");

    const queryParts = timestamps
        .map((timestamp, i) => {
            return maturityList.map((maturity, j) => {
                return `
        tx${i}_${j}: transactions(
          where: {
            createdAt_lte: ${timestamp}
            maturity: ${maturity}
            currency: "${currency}"
          }
          orderBy: createdAt
          orderDirection: desc
          first: 1
        ) {
          amount
          averagePrice
          executionPrice
          createdAt
          currency
          maturity
        }`;
            });
        })
        .join('\n');

    const fullQuery = `
      query TransactionsByTimestampAndMaturityQuery {
        ${queryParts}
      }
    `;

    return gql(fullQuery);
};
export const TRANSACTIONS_BY_TIMESTAMP_CURRENCIES_AND_MATURITIES_QUERY = (
    timestamp: number,
    maturityList: number[],
    currencyList: string[]
) => {
    if (!timestamp || !maturityList || !currencyList)
        throw new Error('Invalid Parameters');
    if (!currencyList.length || !maturityList.length)
        throw new Error("Timestamps and MaturityList can't be empty");
    const queryParts = currencyList
        .map((currency, i) => {
            return maturityList.map((maturity, j) => {
                return `
                    tx_${i}_${j}: transactions(
                        where: {
                            createdAt_lte: ${timestamp}
                            maturity: ${maturity}
                            currency: "${currency}"
                        }
                        orderBy: createdAt
                        orderDirection: desc
                        first: 1
                    ) {
                        amount
                        averagePrice
                        executionPrice
                        createdAt
                        currency
                        maturity
                    }
                `;
            });
        })
        .join('\n');
    const fullQuery = `
      query TransactionsByTimestampsCurrenciesAndMaturitiesQuery {
        ${queryParts}
      }
    `;
    return gql(fullQuery);
};
