import { gql } from '@apollo/client';

export const BUYER_TRANSACTION_HISTORY = gql`
    query BuyerTransactions($address: Bytes!) {
        transactions(
            orderBy: createdAt
            orderDirection: desc
            where: { buyerAddr: $address }
        ) {
            currency
            side
            maturity
            rate
            amount
        }
    }
`;

export const SELLER_TRANSACTION_HISTORY = gql`
    query SellerTransactions($address: Bytes!) {
        transactions(
            orderBy: createdAt
            orderDirection: desc
            where: { sellerAddr: $address }
        ) {
            currency
            side
            maturity
            rate
            amount
        }
    }
`;
