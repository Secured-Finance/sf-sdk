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
            currencyName
            maturity
        }
    }
`;

export const LENDING_TRADING_HISTORY = gql`
    query TradingHistory($id: ID!, $skip: Int!) {
        lendingMarket(id: $id) {
            transactions(
                orderBy: createdAt
                orderDirection: desc
                first: 25
                skip: $skip
            ) {
                rate
                side
                amount
                createdAt
            }
        }
    }
`;
