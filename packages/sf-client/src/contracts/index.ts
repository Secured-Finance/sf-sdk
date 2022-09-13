import CurrencyController from './currency-controller';
import LendingMarket from './lending-market';
import LendingMarketController from './lending-market-controller';
import TokenVault from './token-vault';

export * from './base-contract';
export {
    CurrencyController,
    LendingMarket,
    LendingMarketController,
    TokenVault,
};

export const contracts = {
    currencyController: CurrencyController,
    lendingMarketController: LendingMarketController,
    tokenVault: TokenVault,
};
