import { useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import { LendingMarketOrderRow, Query } from '../../generated';
import { LENDING_BORROW_ORDERBOOK } from '../../queries';
import { OrderbookRow, QueryResult, toBN } from '../../utils';
import { modifyOrderbook } from './common';

export const useBorrowOrderbook = (
    lendingMarket: string,
    skip: number = 0
): QueryResult<Array<LendingMarketOrderRow>> => {
    const variables = {
        market: lendingMarket.toLowerCase(),
        skip: skip,
    };

    const { error, data } = useQuery<Query>(LENDING_BORROW_ORDERBOOK, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.lendingMarket.borrowOrderbook) {
        return {
            data: data.lendingMarket.borrowOrderbook,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};

export const useBorrowOrderbookQuery = (
    lendingMarket: string,
    assetPrice: number,
    skip: number = 0
): QueryResult<Array<OrderbookRow>> => {
    const [orderbook, setOrderbook] = useState<Array<OrderbookRow>>([]);
    const { data, error } = useBorrowOrderbook(lendingMarket, skip);

    if (error) {
        return {
            data: undefined,
            error: error,
        };
    }

    useMemo(() => {
        if (data) {
            const parsedOrderbook: Array<OrderbookRow> = [];
            const fixedAssetPrice = toBN((assetPrice * 100).toFixed(0));
            modifyOrderbook(data, fixedAssetPrice, parsedOrderbook);
            setOrderbook(parsedOrderbook);
        } else {
            return undefined;
        }
    }, [data, assetPrice]);

    return {
        data: orderbook,
        error: undefined,
    };
};
