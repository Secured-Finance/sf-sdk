import { Currency } from '@secured-finance/sf-core';
import { SecuredFinanceClientConfig } from 'src/entities';
import {
    Hex,
    PublicClient,
    WalletClient,
    hexToString,
    stringToHex,
} from 'viem';

const CLIENT_NOT_INITIALIZED = 'Client is not initialized';

function assertNonNullish<TValue>(
    value: TValue | undefined,
    message = CLIENT_NOT_INITIALIZED
): asserts value is NonNullable<TValue> {
    if (!value) {
        throw new Error(message);
    }
}
export abstract class BaseContract {
    protected _config: SecuredFinanceClientConfig | undefined;
    protected _publicClient: PublicClient;
    protected _walletClient: WalletClient | undefined;

    get config() {
        assertNonNullish(this._config);
        return this._config;
    }

    get publicClient() {
        assertNonNullish(this._publicClient);
        return this._publicClient;
    }

    get walletClient() {
        assertNonNullish(this._walletClient);
        return this._walletClient;
    }

    constructor(
        config: SecuredFinanceClientConfig,
        publicClient: PublicClient,
        walletClient?: WalletClient
    ) {
        this._config = config;
        this._publicClient = publicClient;
        this._walletClient = walletClient;
    }

    protected convertCurrencyToBytes32(ccy: Currency) {
        if (ccy.isNative) {
            return stringToHex(ccy.symbol, { size: 32 });
        } else {
            return stringToHex(ccy.wrapped.symbol, { size: 32 });
        }
    }

    protected parseBytes32String(ccy: string) {
        return hexToString(ccy as Hex, { size: 32 });
    }

    protected calculateAdjustedGas(amount: bigint) {
        // NOTE: This adjustment is for the function that executes the collateral coverage check.
        // Without this adjustment, the transaction often fails due to out-of-gas error.
        return (amount * 11n) / 10n;
    }
}
