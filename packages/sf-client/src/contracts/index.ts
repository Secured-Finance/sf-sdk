import CurrencyController from './currency-controller';
import GenesisValueVault from './genesis-value-vault';
import LendingMarket from './lending-market';
import LendingMarketController from './lending-market-controller';
import TokenVault from './token-vault';

export * from './base-contract';
export {
    CurrencyController,
    LendingMarket,
    LendingMarketController,
    TokenVault,
    GenesisValueVault,
};

export const contracts = {
    currencyController: CurrencyController,
    lendingMarketController: LendingMarketController,
    tokenVault: TokenVault,
    genesisValueVault: GenesisValueVault,
};
