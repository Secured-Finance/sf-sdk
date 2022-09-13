import {
    FilledLendingMarketOrder,
    Maybe,
    Scalars,
    UserTradingHistoryQuery,
} from '../../graphclients';

type FilledLendingMarketOrderLocal = Maybe<
    Pick<
        FilledLendingMarketOrder,
        | 'id'
        | 'orderId'
        | 'side'
        | 'marketAddr'
        | 'maturity'
        | 'rate'
        | 'amount'
        | 'maker'
        | 'taker'
        | 'createdAtTimestamp'
        | 'createdAtBlockNumber'
    >
>;

export interface LendingMarketExtendedOrder
    extends FilledLendingMarketOrderLocal {
    counterparty: Scalars['Bytes'];
}

export const modifyUsersTradingHistory = async (
    data: UserTradingHistoryQuery,
    account: string
): Promise<Array<LendingMarketExtendedOrder>> => {
    const tradingHistory = [data?.user?.madeOrders, data?.user?.takenOrders];
    const parsedHistory: Array<LendingMarketExtendedOrder> = [];

    tradingHistory.forEach(
        (historyType: Array<FilledLendingMarketOrderLocal>) => {
            historyType.forEach((order: FilledLendingMarketOrderLocal) => {
                let counterparty: string;

                order.maker === account
                    ? (counterparty = order.taker)
                    : (counterparty = order.maker);

                const historyItem: LendingMarketExtendedOrder = {
                    ...order,
                    counterparty: counterparty,
                };
                parsedHistory.push(historyItem);
            });
        }
    );

    parsedHistory.sort((x, y) => {
        if (y.createdAtTimestamp > x.createdAtTimestamp) {
            return 1;
        } else if (y.createdAtTimestamp < x.createdAtTimestamp) {
            return -1;
        } else {
            return 0;
        }
    });

    return parsedHistory;
};
