import {
    LendingMarketCreated,
    OrderFilled,
} from '../generated/LendingMarketController/LendingMarketController';
import { LendingMarket, Transaction } from '../generated/schema';

export function handleLendingMarketCreated(event: LendingMarketCreated): void {
    const market = new LendingMarket(event.params.marketAddr.toHexString());
    market.contractAddress = event.params.marketAddr;
    market.currencyName = event.params.ccy.toString();
    market.currency = event.params.ccy;
    market.maturity = event.params.maturity;

    market.createdAt = event.block.timestamp;
    market.blockNumber = event.block.number;
    market.txHash = event.transaction.hash;

    market.save();
}

export function handleOrderFilled(event: OrderFilled): void {
    for (let i = 0; i < event.params.orderIds.length; i++) {
        const transaction = new Transaction(
            `${event.params.maturity.toString()}-${event.params.orderIds[
                i
            ].toString()}`
        );
        transaction.orderId = event.params.orderIds[i];
        transaction.buyerAddr = event.params.taker;
        transaction.sellerAddr = event.params.makers[i];
        transaction.currency = event.params.ccy;
        transaction.side = event.params.side;
        transaction.maturity = event.params.maturity;
        transaction.rate = event.params.rate;
        transaction.amount = event.params.amounts[i];

        transaction.createdAt = event.block.timestamp;
        transaction.blockNumber = event.block.number;
        transaction.txHash = event.transaction.hash;

        transaction.save();
    }
}
