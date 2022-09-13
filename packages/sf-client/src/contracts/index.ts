import CurrencyController from './currency-controller';
import LendingMarket from './lending-market';
import LendingMarketController from './lending-market-controller';
import TokenVault from './token-vault';

export * from './base-contract';
export {
    TokenVault,
    LendingMarket,
    LendingMarketController,
    CurrencyController,
};

export const contracts = {
    currencyController: CurrencyController,
    lendingMarketController: LendingMarketController,
    tokenVault: TokenVault,
};
