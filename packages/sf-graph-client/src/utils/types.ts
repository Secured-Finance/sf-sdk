import { ApolloError } from '@apollo/client';

export interface OrderbookRow {
    rate: number;
    totalAmount: number;
    usdAmount: number | string;
}

export type QueryResult<T> = {
    data: T | undefined;
    error: ApolloError;
};
