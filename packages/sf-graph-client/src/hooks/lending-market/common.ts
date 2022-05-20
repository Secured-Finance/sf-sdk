import { BigNumber, utils } from 'ethers';
import { LendingMarketOrderRow } from '../../generated';
import { OrderbookRow, toBN } from '../../utils';

export const modifyOrderbook = async (
    orderbook: Array<LendingMarketOrderRow>,
    fixedAssetPrice: BigNumber
): Promise<Array<OrderbookRow>> => {
    const parsedOrderbook: Array<OrderbookRow> = [];

    orderbook.forEach((item: LendingMarketOrderRow) => {
        const usdAmountBN = toBN(item.totalAmount).mul(fixedAssetPrice);
        const usdAmount = Number(utils.formatUnits(usdAmountBN, 2));
        const orderbookItem = Object.assign({}, item, {
            usdAmount: usdAmount,
        });
        parsedOrderbook.push(orderbookItem);
    });

    return parsedOrderbook;
};
