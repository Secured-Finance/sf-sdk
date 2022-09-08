import { BigNumber, utils } from 'ethers';
import {
    BorrowOrderbookQuery,
    LendingMarketOrderRow,
    LendOrderbookQuery,
} from '../../graphclients';

type ExtendedOrderbookQuery = BorrowOrderbookQuery & LendOrderbookQuery;

type ExtendedOrderbookItem = Pick<
    LendingMarketOrderRow,
    'rate' | 'totalAmount'
>;

export interface OrderbookRow {
    rate: bigint;
    totalAmount: bigint;
    usdAmount: number | string;
}

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
        const usdAmountBN = BigNumber.from(item.totalAmount).mul(
            fixedAssetPrice
        );
        const usdAmount = Number(utils.formatUnits(usdAmountBN, 2));
        const orderbookItem = Object.assign({}, item, {
            usdAmount: usdAmount,
        });
        parsedOrderbook.push(orderbookItem);
    });

    return parsedOrderbook;
};
