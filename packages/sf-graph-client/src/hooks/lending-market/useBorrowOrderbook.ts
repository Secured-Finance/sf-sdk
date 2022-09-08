import { BigNumber } from 'ethers';
import { useMemo, useState } from 'react';
import { GraphApolloClient } from '../../';
import {
    BorrowOrderbookDocument,
    BorrowOrderbookQuery
} from '../../graphclients';
import { QueryResult, useQuery } from '../useQuery';
import { modifyOrderbook, OrderbookRow } from './common';

export interface BorrowOrderbookVariables {
    lendingMarket: string;
    skip?: number;
}

export interface BorrowOrderbookQueryVariables {
    lendingMarket: string;
    assetPrice: number;
    skip?: number;
}

export const useBorrowOrderbook = (
    { lendingMarket, skip = 0 }: BorrowOrderbookVariables,
    client?: GraphApolloClient
): QueryResult<BorrowOrderbookQuery> => {
    const variables = {
        id: lendingMarket.toLowerCase(),
        skip: skip,
    };

    const { error, data } = useQuery<BorrowOrderbookQuery>(
        BorrowOrderbookDocument,
        { variables, client }
    );

    const isExists = data?.lendingMarket?.borrowOrderbook;

    return {
        data: isExists ? data : undefined,
        error,
    };
};

export const useBorrowOrderbookQuery = (
    { lendingMarket, assetPrice, skip = 0 }: BorrowOrderbookQueryVariables,
    client?: GraphApolloClient
): QueryResult<Array<OrderbookRow>> => {
    const [orderbook, setOrderbook] = useState<Array<OrderbookRow>>([]);
    const { data, error } = useBorrowOrderbook({ lendingMarket, skip }, client);

    useMemo(async () => {
        if (data) {
            const fixedAssetPrice = BigNumber.from(
                (assetPrice * 100).toFixed(0)
            );
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

    if (error) {
        return {
            data: undefined,
            error,
        };
    }

    return {
        data: orderbook,
        error: undefined,
    };
};
