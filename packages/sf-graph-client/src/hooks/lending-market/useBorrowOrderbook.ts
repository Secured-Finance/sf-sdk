import { useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import {
    BorrowOrderbookDocument,
    BorrowOrderbookQuery,
} from '../../.graphclient';
import { client } from '../../client';
import { OrderbookRow, QueryResult, toBN } from '../../utils';
import { modifyOrderbook } from './common';

export const useBorrowOrderbook = (
    lendingMarket: string,
    skip: number = 0
): QueryResult<BorrowOrderbookQuery> => {
    const variables = {
        market: lendingMarket.toLowerCase(),
        skip: skip,
    };

    const { error, data } = useQuery<BorrowOrderbookQuery>(
        BorrowOrderbookDocument,
        {
            variables: variables,
            client: client,
        }
    );

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.lendingMarket?.borrowOrderbook) {
        return {
            data: data,
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

    useMemo(async () => {
        if (data) {
            const fixedAssetPrice = toBN((assetPrice * 100).toFixed(0));
            const parsedOrderbook = await modifyOrderbook(
                data,
                'borrow',
                fixedAssetPrice
            );

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
