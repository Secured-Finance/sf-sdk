import { BigNumber, utils } from 'ethers';
import { BorrowOrderbookQuery, LendOrderbookQuery } from '../../.graphclient';
import { LendingMarketOrderRow } from '../../generated';
import { OrderbookRow, toBN } from '../../utils';

type ExtendedOrderbookQuery = BorrowOrderbookQuery & LendOrderbookQuery;

type ExtendedOrderbookItem = Pick<
    LendingMarketOrderRow,
    'rate' | 'totalAmount'
>;

export const modifyOrderbook = async (
    data: ExtendedOrderbookQuery,
    orderbookType: string,
    fixedAssetPrice: BigNumber
): Promise<Array<OrderbookRow>> => {
    const parsedOrderbook: Array<OrderbookRow> = [];
    let orderbook;

    if (orderbookType === 'borrow') {
        orderbook = data?.lendingMarket?.borrowOrderbook;
    } else {
        orderbook = data?.lendingMarket?.lendOrderbook;
    }

    orderbook.forEach((item: ExtendedOrderbookItem) => {
        const usdAmountBN = toBN(item.totalAmount).mul(fixedAssetPrice);
        const usdAmount = Number(utils.formatUnits(usdAmountBN, 2));
        const orderbookItem = Object.assign({}, item, {
            usdAmount: usdAmount,
        });
        parsedOrderbook.push(orderbookItem);
    });

    return parsedOrderbook;
};
