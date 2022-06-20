import {
    Currency,
    FilledLendingMarketOrder,
    Maybe,
    Scalars,
    UserTradingHistoryQuery,
} from '../../.graphclient';

type FilledLendingMarketOrderLocal = Maybe<
    Pick<
        FilledLendingMarketOrder,
        | 'id'
        | 'orderId'
        | 'side'
        | 'marketAddr'
        | 'term'
        | 'rate'
        | 'amount'
        | 'maker'
        | 'taker'
        | 'createdAtTimestamp'
        | 'createdAtBlockNumber'
    > & {
        currency: Pick<
            Currency,
            'identifier' | 'shortName' | 'name' | 'chainId'
        >;
    }
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

    parsedHistory.sort(function (x, y) {
        return y.createdAtTimestamp - x.createdAtTimestamp;
    });

    return parsedHistory;
};
