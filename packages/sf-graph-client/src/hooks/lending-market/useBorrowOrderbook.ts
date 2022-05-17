import { utils } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { client } from '../../client';
import { LENDING_BORROW_ORDERBOOK } from '../../queries';
import { OrderbookRow, toBN } from '../../utils';

export const useBorrowOrderbook = (
    lendingMarket: string,
    assetUsdPrice: number,
    skip: number = 0
) => {
    const [borrowOrderbook, setBorrowOrderbook] = useState<Array<OrderbookRow>>(
        []
    );
    const fixedAssetPrice = toBN((assetUsdPrice * 100).toFixed(0));

    const fetchBorrowOrderbook = useCallback(async () => {
        try {
            let res = await client.query({
                query: LENDING_BORROW_ORDERBOOK,
                variables: {
                    market: lendingMarket.toLowerCase(),
                    skip: skip,
                },
                fetchPolicy: 'cache-first',
            });
            if (res?.data.lendingMarket.borrowOrderbook) {
                let parsedOrderbook: Array<OrderbookRow> = [];
                res.data.lendingMarket.borrowOrderbook.map(
                    (_: unknown, index: number) => {
                        const usdAmountBN = toBN(
                            res.data.lendingMarket.borrowOrderbook[index]
                                .totalAmount
                        ).mul(fixedAssetPrice);
                        const usdAmount = utils.formatUnits(usdAmountBN, 2);
                        const orderbookItem = Object.assign(
                            {},
                            res.data.lendingMarket.borrowOrderbook[index],
                            { usdAmount: usdAmount }
                        );
                        parsedOrderbook.push(orderbookItem);
                    }
                );
                setBorrowOrderbook(parsedOrderbook);
            }
        } catch (err) {
            console.log(err);
        }
    }, [lendingMarket, skip, assetUsdPrice]);

    useEffect(() => {
        if (client) {
            fetchBorrowOrderbook();
        }
    }, [client, lendingMarket, skip, assetUsdPrice]);

    return borrowOrderbook;
};
