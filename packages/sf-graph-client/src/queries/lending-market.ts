import { gql } from '@apollo/client';

export const LENDING_MARKETS_BY_CCY = gql`
    query LendingMarkets($currency: Bytes!, $skip: Int!) {
        lendingMarkets(
            skip: $skip
            orderBy: term
            where: { currency_contains: $currency }
        ) {
            id
            marketRate
            spread
            term
            spread
            totalLiquidity
            totalLiquidityInUSD
            totalAvailableLiquidity
            totalAvailableLiquidityInUSD
        }
    }
`;

export const LENDING_MARKET_INFO = gql`
    query LendingMarket($market: Bytes!) {
        lendingMarket(id: $market) {
            id
            marketRate
            spread
            term
            currency
            currencyName
            totalLiquidity
        }
    }
`;

export const LENDING_BORROW_ORDERBOOK = gql`
    query BorrowOrderbook($market: Bytes!, $skip: Int!) {
        lendingMarket(id: $market) {
            borrowOrderbook(
                orderBy: rate
                orderDirection: desc
                first: 10
                skip: $skip
            ) {
                rate
                totalAmount
            }
        }
    }
`;

export const LENDING_LEND_ORDERBOOK = gql`
    query LendOrderbook($market: Bytes!, $skip: Int!) {
        lendingMarket(id: $market) {
            lendOrderbook(
                orderBy: rate
                orderDirection: asc
                first: 10
                skip: $skip
            ) {
                rate
                totalAmount
            }
        }
    }
`;

export const LENDING_TRADING_HISTORY = gql`
    query TradingHistory($market: Bytes!, $skip: Int!) {
        lendingMarket(id: $market) {
            tradeHistory(
                orderBy: createdAtTimestamp
                orderDirection: desc
                first: 25
                skip: $skip
            ) {
                rate
                side
                createdAtTimestamp
                amount
            }
        }
    }
`;
