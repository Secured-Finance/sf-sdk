import { expectType } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Entity = Record<string, any>;

export const validateLendingMarket = (market?: Entity | null) => {
    expectType(market?.id, 'string');
    expectType(market?.contractAddress, 'string');
    expectType(market?.currencyName, 'string');
    expectType(market?.maturity, 'string');
};

export const validateTradingHistoryRow = (row?: Entity | null) => {
    expectType(row?.rate, 'string');
    expectType(row?.side, 'string');
    expectType(row?.amount, 'string');
    expectType(row?.createdAt, 'string');
};

export const validateTransactions = (transaction?: Entity | null) => {
    expectType(transaction?.currency, 'string');
    expectType(transaction?.side, 'string');
    expectType(transaction?.maturity, 'string');
    expectType(transaction?.rate, 'string');
    expectType(transaction?.amount, 'string');
};
