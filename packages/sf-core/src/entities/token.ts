import { BaseCurrency } from './baseCurrency';
import { Currency } from './currency';

export class Token extends BaseCurrency {
    public readonly isNative = false;
    public readonly isToken = true;

    public constructor(decimals: number, symbol: string, name: string) {
        super(decimals, symbol, name);
    }

    /**
     * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
     * @param other other token to compare
     */
    public equals(other: Currency): boolean {
        return (
            other.isToken &&
            this.decimals === other.decimals &&
            this.symbol === other.symbol &&
            this.name === other.name
        );
    }

    public get wrapped(): BaseCurrency {
        return this;
    }
}
