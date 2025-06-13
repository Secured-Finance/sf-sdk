import { Currency } from '@secured-finance/sf-core';
import { PublicClient, WalletClient, stringToHex } from 'viem';
import { SecuredFinanceClientConfig } from '../entities';
import { TokenVault } from '../contracts/TokenVault';

export interface BaseServiceConfig {
    config: SecuredFinanceClientConfig;
    publicClient: PublicClient;
    walletClient?: WalletClient;
    tokenVault: TokenVault;
}

export class BaseService {
    protected config: SecuredFinanceClientConfig;
    protected publicClient: PublicClient;
    protected walletClient?: WalletClient;
    protected tokenVault: TokenVault;

    constructor(config: BaseServiceConfig) {
        this.config = config.config;
        this.publicClient = config.publicClient;
        this.walletClient = config.walletClient;
        this.tokenVault = config.tokenVault;
    }

    protected calculateAdjustedGas(amount: bigint): bigint {
        // NOTE: This adjustment is for the function that executes the collateral coverage check.
        // Without this adjustment, the transaction often fails due to out-of-gas error.
        return (amount * 11n) / 10n;
    }

    protected convertCurrencyToBytes32(ccy: Currency) {
        return stringToHex(ccy.isNative ? ccy.symbol : ccy.wrapped.symbol, {
            size: 32,
        });
    }
}
