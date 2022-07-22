import { useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import { GraphApolloClient } from '../../';
import { LendOrderbookDocument, LendOrderbookQuery } from '../../graphclients';
import { OrderbookRow, QueryResult, toBN } from '../../utils';
import { modifyOrderbook } from './common';

export interface LendOrderbookVariables {
    lendingMarket: string;
    skip?: number;
}

export interface LendOrderbookQueryVariables {
    lendingMarket: string;
    assetPrice: number;
    skip?: number;
}

export const useLendOrderbook = (
    { lendingMarket, skip = 0 }: LendOrderbookVariables,
    client?: GraphApolloClient
): QueryResult<LendOrderbookQuery> => {
    const variables = {
        market: lendingMarket.toLowerCase(),
        skip: skip,
    };

    const { error, data } = useQuery<LendOrderbookQuery>(
        LendOrderbookDocument,
        { variables, client }
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
            error: undefined,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};

export const useLendOrderbookQuery = (
    { lendingMarket, assetPrice, skip = 0 }: LendOrderbookQueryVariables,
    client?: GraphApolloClient
): QueryResult<Array<OrderbookRow>> => {
    const [orderbook, setOrderbook] = useState<Array<OrderbookRow>>([]);
    const { data, error } = useLendOrderbook({ lendingMarket, skip }, client);

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

    if (error) {
        return {
            data: undefined,
            error: error,
        };
    }

    return {
        data: orderbook,
        error: undefined,
    };
};
