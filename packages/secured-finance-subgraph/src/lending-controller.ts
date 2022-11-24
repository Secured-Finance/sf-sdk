import { CreateLendingMarket } from '../generated/LendingMarketController/LendingMarketController';
import { LendingMarket as LendingMarketTemplate } from '../generated/templates';

import { LendingMarket } from '../generated/schema';

export function handleCreateLendingMarket(event: CreateLendingMarket): void {
    const market = new LendingMarket(event.params.marketAddr.toHexString());
    market.currency = event.params.ccy;
    market.maturity = event.params.maturity;
    market.contractAddress = event.params.marketAddr;

    LendingMarketTemplate.create(event.params.marketAddr);
    market.save();
}
