import { gql } from '@apollo/client';

export const BUYER_TRANSACTION_HISTORY = gql`
    query BuyerTransactionTable($address: Bytes!) {
        transactionTables(
            orderBy: createdAtTimestamp
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
    query SellerTransactionTable($address: Bytes!) {
        transactionTables(
            orderBy: createdAtTimestamp
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
