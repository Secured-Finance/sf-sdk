import { useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import { LendingMarketOrderRow, Query } from '../../generated';
import { LENDING_BORROW_ORDERBOOK } from '../../queries';
import { OrderbookRow, toBN } from '../../utils';
import { modifyOrderbook } from './common';

export const useBorrowOrderbook = (
    lendingMarket: string,
    skip: number = 0
): Array<LendingMarketOrderRow> | undefined => {
    const variables = {
        market: lendingMarket.toLowerCase(),
        skip: skip,
    };

    const { error, data } = useQuery<Query>(LENDING_BORROW_ORDERBOOK, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.lendingMarket.borrowOrderbook) {
        return data.lendingMarket.borrowOrderbook;
    } else {
        return undefined;
    }
};

export const useBorrowOrderbookQuery = (
    lendingMarket: string,
    assetPrice: number,
    skip: number = 0
): OrderbookRow[] => {
    const [orderbook, setOrderbook] = useState<Array<OrderbookRow>>([]);
    const borrowOrders = useBorrowOrderbook(lendingMarket, skip);

    useMemo(() => {
        if (borrowOrders) {
            const parsedOrderbook: Array<OrderbookRow> = [];
            const fixedAssetPrice = toBN((assetPrice * 100).toFixed(0));
            modifyOrderbook(borrowOrders, fixedAssetPrice, parsedOrderbook);
            setOrderbook(parsedOrderbook);
        } else {
            return undefined;
        }
    }, [borrowOrders, assetPrice]);

    return orderbook;
};
