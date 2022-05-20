import { FilledLendingMarketOrder, Scalars, User } from '../../generated';

export interface LendingMarketExtendedOrder extends FilledLendingMarketOrder {
    couterparty: Scalars['Bytes'];
}

export const modifyUsersTradingHistory = async (
    userHistory: User
): Promise<Array<LendingMarketExtendedOrder>> => {
    const tradingHistory = [userHistory.madeOrders, userHistory.takenOrders];
    const parsedHistory: Array<LendingMarketExtendedOrder> = [];

    tradingHistory.forEach((historyType: Array<FilledLendingMarketOrder>) => {
        historyType.forEach((order: FilledLendingMarketOrder) => {
            const counterparty = order.maker;
            const historyItem: LendingMarketExtendedOrder = {
                ...order,
                couterparty: counterparty,
            };
            parsedHistory.push(historyItem);
        });
    });

    parsedHistory.sort(function (x, y) {
        return y.createdAtTimestamp - x.createdAtTimestamp;
    });

    return parsedHistory;
};
