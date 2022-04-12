import { useCallback, useEffect, useState } from 'react';
import { client } from '../../client';
import { LENDING_LEND_ORDERBOOK } from '../../queries';
import { OrderbookRow, toBN } from '../../utils';
import { utils } from 'ethers';

export const useLendOrderbook = (
    lendingMarket: string,
    assetUsdPrice: number,
    skip: number = 0
) => {
    const [lendOrderbook, setLendOrderbook] = useState<Array<OrderbookRow>>([]);
    const fixedAssetPrice = toBN((assetUsdPrice * 100).toFixed(0));

    const fetchLendOrderbook = useCallback(async () => {
        try {
            let res = await client.query({
                query: LENDING_LEND_ORDERBOOK,
                variables: {
                    market: lendingMarket.toLowerCase(),
                    skip: skip,
                },
                fetchPolicy: 'cache-first',
            });
            if (res?.data.lendingMarket.lendOrderbook) {
                let parsedOrderbook: Array<OrderbookRow> = [];
                res.data.lendingMarket.lendOrderbook.map(
                    (item: any, index: number) => {
                        const usdAmountBN = toBN(
                            res.data.lendingMarket.lendOrderbook[index]
                                .totalAmount
                        ).mul(fixedAssetPrice);
                        const usdAmount = utils.formatUnits(usdAmountBN, 2);
                        const orderbookItem = Object.assign(
                            {},
                            res.data.lendingMarket.lendOrderbook[index],
                            { usdAmount: usdAmount }
                        );
                        parsedOrderbook.push(orderbookItem);
                    }
                );
                setLendOrderbook(parsedOrderbook);
            }
        } catch (err) {
            console.log(err);
        }
    }, [lendingMarket, skip, assetUsdPrice]);

    useEffect(() => {
        let isMounted = true;
        if (client) {
            fetchLendOrderbook();
        }
        return () => {
            isMounted = false;
        };
    }, [client, lendingMarket, skip, assetUsdPrice]);

    return lendOrderbook;
};
