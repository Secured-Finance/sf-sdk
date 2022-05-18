import { FilledLendingMarketOrder, Scalars, User } from '../../generated';

export interface LendingMarketExtendedOrder extends FilledLendingMarketOrder {
    couterparty: Scalars['Bytes'];
}

export const modifyUsersTradingHistory = async (
    userHistory: User,
    parsedHistory: Array<FilledLendingMarketOrder>
) => {
    const tradingHistory = [userHistory.madeOrders, userHistory.takenOrders];
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
};
