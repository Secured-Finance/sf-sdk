import { BigInt } from '@graphprotocol/graph-ts';
import {
    LendingMarketCreated,
    OrderFilled
} from '../generated/LendingMarketController/LendingMarketController';
import { LendingMarket, TransactionTable } from '../generated/schema';
import { LendingMarket as LendingMarketTemplate } from '../generated/templates';

export function handleNewLendingMarket(event: LendingMarketCreated): void {
    let market = new LendingMarket(
        event.params.marketAddr.toHexString()
    ) as LendingMarket;
    market.marketAddr = event.params.marketAddr;
    market.currencyName = event.params.ccy.toString();
    market.currency = event.params.ccy;
    market.maturity = event.params.maturity;
    market.index = event.params.index;
    market.controllerAddr = event.address;
    market.spread = BigInt.fromI32(0);
    market.marketRate = BigInt.fromI32(0);
    market.orderCount = 0;

    market.totalAvailableLiquidity = BigInt.fromI32(0);
    market.totalLiquidity = BigInt.fromI32(0);

    market.totalAvailableLiquidityInUSD = BigInt.fromI32(0);
    market.totalLiquidityInUSD = BigInt.fromI32(0);

    market.createdAtTimestamp = event.block.timestamp;
    market.createdAtBlockNumber = event.block.number;

    LendingMarketTemplate.create(event.params.marketAddr);
    market.save();
}

export function handleOrderFilled(event: OrderFilled): void {
    let order = new TransactionTable(
        event.params.orderId.toString()
    ) as TransactionTable;
    order.orderId = event.params.orderId;
    order.buyerAddr = event.params.taker;
    order.sellerAddr = event.params.maker;
    order.currency = event.params.ccy;
    order.side = event.params.side;
    order.maturity = event.params.maturity;

    order.rate = event.params.rate;
    order.amount = event.params.amount;

    order.createdAtTimestamp = event.block.timestamp;
    order.createdAtBlockNumber = event.block.number;

    order.save();
}
