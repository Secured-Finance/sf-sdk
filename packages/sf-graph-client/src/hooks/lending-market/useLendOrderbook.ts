import { useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import { LendOrderbookDocument, LendOrderbookQuery } from '../../.graphclient';
import { client } from '../../client';
import { OrderbookRow, QueryResult, toBN } from '../../utils';
import { modifyOrderbook } from './common';

export const useLendOrderbook = (
    lendingMarket: string,
    skip: number = 0
): QueryResult<LendOrderbookQuery> => {
    const variables = {
        market: lendingMarket.toLowerCase(),
        skip: skip,
    };

    const { error, data } = useQuery<LendOrderbookQuery>(
        LendOrderbookDocument,
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

    if (data?.lendingMarket?.lendOrderbook) {
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

export const useLendOrderbookQuery = (
    lendingMarket: string,
    assetPrice: number,
    skip: number = 0
): QueryResult<Array<OrderbookRow>> => {
    const [orderbook, setOrderbook] = useState<Array<OrderbookRow>>([]);
    const { data, error } = useLendOrderbook(lendingMarket, skip);

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
                'lend',
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
