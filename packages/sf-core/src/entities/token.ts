import { BaseCurrency } from './baseCurrency';
import { Currency } from './currency';

export class Token extends BaseCurrency {
    public readonly isNative = false;
    public readonly isToken = true;

    public readonly address: string;

    public constructor(
        chainId: number,
        address: string,
        decimals: number,
        symbol: string,
        name: string
    ) {
        super(chainId, decimals, symbol, name);
        this.address = address;
    }

    /**
     * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
     * @param other other token to compare
     */
    public equals(other: Currency): boolean {
        return (
            other.isToken &&
            this.chainId === other.chainId &&
            this.address === other.address
        );
    }

    public get wrapped(): BaseCurrency {
        return this;
    }
}
