import { BaseCurrency } from './baseCurrency';
import { Currency } from './currency';

export class Token extends BaseCurrency {
    public readonly isNative = false;
    public readonly isToken = true;
    public readonly hasPermit: boolean;
    public readonly eip712Version?: string;

    public constructor(
        decimals: number,
        symbol: string,
        name: string,
        hasPermit = false,
        eip712Version?: string
    ) {
        super(decimals, symbol, name);
        this.hasPermit = hasPermit;
        this.eip712Version = eip712Version;
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
            this.name === other.name &&
            this.hasPermit === other.hasPermit &&
            this.eip712Version === other.eip712Version
        );
    }

    public get wrapped(): BaseCurrency {
        return this;
    }
}
