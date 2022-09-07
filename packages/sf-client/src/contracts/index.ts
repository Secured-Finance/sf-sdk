import CollateralAggregator from './collateral-aggregator';
import CollateralVault from './collateral-vault';
import CurrencyController from './currency-controller';
import LendingMarket from './lending-market';
import LendingMarketController from './lending-market-controller';

export * from './base-contract';
export {
    CollateralVault,
    LendingMarket,
    CollateralAggregator,
    LendingMarketController,
    CurrencyController,
};

export const contracts = {
    collateralAggregator: CollateralAggregator,
    collateralVault: CollateralVault,
    currencyController: CurrencyController,
    lendingMarketController: LendingMarketController,
};
