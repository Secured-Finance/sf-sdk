import { useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import { LendingMarketOrderRow, Query } from '../../generated';
import { LENDING_LEND_ORDERBOOK } from '../../queries';
import { OrderbookRow, toBN } from '../../utils';
import { modifyOrderbook } from './common';

export const useLendOrderbook = (
    lendingMarket: string,
    skip: number = 0
): Array<LendingMarketOrderRow> | undefined => {
    const variables = {
        market: lendingMarket.toLowerCase(),
        skip: skip,
    };

    const { error, data } = useQuery<Query>(LENDING_LEND_ORDERBOOK, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.lendingMarket.lendOrderbook) {
        return data.lendingMarket.lendOrderbook;
    } else {
        return undefined;
    }
};

export const useLendOrderbookQuery = (
    lendingMarket: string,
    assetPrice: number,
    skip: number = 0
): OrderbookRow[] => {
    const [orderbook, setOrderbook] = useState<Array<OrderbookRow>>([]);
    const lendOrders = useLendOrderbook(lendingMarket, skip);

    useMemo(() => {
        if (lendOrders) {
            const parsedOrderbook: Array<OrderbookRow> = [];
            const fixedAssetPrice = toBN((assetPrice * 100).toFixed(0));
            modifyOrderbook(lendOrders, fixedAssetPrice, parsedOrderbook);
            setOrderbook(parsedOrderbook);
        } else {
            return undefined;
        }
    }, [lendOrders, assetPrice]);

    return orderbook;
};
