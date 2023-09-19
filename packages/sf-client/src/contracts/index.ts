import CurrencyController from './currency-controller';
import GenesisValueVault from './genesis-value-vault';
import LendingMarket from './lending-market';
import LendingMarketController from './lending-market-controller';
import LendingMarketReader from './lending-market-reader';
import TokenFaucet from './token-faucet';
import TokenVault from './token-vault';

export * from './base-contract';
export {
    CurrencyController,
    GenesisValueVault,
    LendingMarket,
    LendingMarketController,
    LendingMarketReader,
    TokenFaucet,
    TokenVault,
};

export const contracts = {
    currencyController: CurrencyController,
    lendingMarketController: LendingMarketController,
    lendingMarketReader: LendingMarketReader,
    tokenVault: TokenVault,
    genesisValueVault: GenesisValueVault,
    tokenFaucet: TokenFaucet,
};
