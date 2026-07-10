import { Currency } from '@secured-finance/sf-core';
import {
    PublicClient,
    WalletClient,
    stringToHex,
    Hex,
    hexToString,
} from 'viem';
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
        if (ccy.isNative) {
            return stringToHex(ccy.symbol, { size: 32 });
        } else {
            return stringToHex(ccy.wrapped.symbol, { size: 32 });
        }
    }

    protected convertCurrencyArrayToBytes32Array(currencies: Currency[]) {
        return currencies.map(currency =>
            this.convertCurrencyToBytes32(currency)
        );
    }

    protected parseBytes32String(ccy: string) {
        return hexToString(ccy as Hex, { size: 32 });
    }

    protected async getWalletAddress(): Promise<`0x${string}`> {
        if (!this.walletClient) {
            throw new Error('Wallet client not initialized');
        }
        const [address] = await this.walletClient.getAddresses();
        return address;
    }
}
