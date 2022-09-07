import { BigInt } from '@graphprotocol/graph-ts';
import { LendingMarketCreated } from '../generated/LendingMarketController/LendingMarketController';
import { LendingMarket } from '../generated/schema';
import { LendingMarket as LendingMarketTemplate } from '../generated/templates';

export function handleNewLendingMarket(event: LendingMarketCreated): void {
    let market = new LendingMarket(
        event.params.marketAddr.toHexString()
    ) as LendingMarket;
    market.marketAddr = event.params.marketAddr;
    market.currencyName = event.params.ccy.toString();
    market.currency = event.params.ccy;
    market.maturity = event.params.maturity;
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
