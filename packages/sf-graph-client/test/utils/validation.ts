import { expectType } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Entity = Record<string, any>;

export const validateOrder = (order?: Entity | null) => {
    expectType(order?.id, 'string');
    expectType(order?.maker, 'string');
    expectType(order?.marketAddr, 'string');
    expectType(order?.orderId, 'string');
    expectType(order?.rate, 'string');
    expectType(order?.side, 'number');
    expectType(order?.term, 'string');
    expectType(order?.createdAtBlockNumber, 'string');
    expectType(order?.createdAtTimestamp, 'string');
    expectType(order?.amount, 'string');
    expectType(order?.currencyName, 'string');
    expectType(order?.currency, 'string');
    expectType(order?.orderState, 'string');
};

export const validateLendingMarket = (market?: Entity | null) => {
    expectType(market?.id, 'string');
    expectType(market?.marketRate, 'string');
    expectType(market?.spread, 'string');
    expectType(market?.term, 'string');
    expectType(market?.totalLiquidity, 'string');
    expectType(market?.totalLiquidityInUSD, 'string');
    expectType(market?.totalAvailableLiquidity, 'string');
    expectType(market?.totalAvailableLiquidityInUSD, 'string');
};

export const validateOrderbookRow = (row?: Entity | null) => {
    expectType(row?.rate, 'string');
    expectType(row?.totalAmount, 'string');
    expectType(row?.usdAmount, 'number');
};

export const validateTradingHistoryRow = (row?: Entity | null) => {
    expectType(row?.rate, 'string');
    expectType(row?.side, 'string');
    expectType(row?.createdAtTimestamp, 'string');
    expectType(row?.amount, 'number');
};
