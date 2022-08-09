import * as assert from 'assert';
export abstract class BaseCurrency {
    public abstract readonly isNative: boolean;
    public abstract readonly isToken: boolean;
    public readonly chainId: number;
    public readonly decimals: number;
    public readonly symbol: string;
    public readonly name: string;

    /**
     * Constructs an instance of the base class `BaseCurrency`.
     * @param chainId the chain ID on which this currency resides
     * @param decimals decimals of the currency
     * @param symbol symbol of the currency
     * @param name of the currency
     */
    protected constructor(
        chainId: number,
        decimals: number,
        symbol: string,
        name: string
    ) {
        assert(Number.isSafeInteger(chainId), 'CHAIN_ID');
        assert(
            decimals >= 0 && decimals < 255 && Number.isInteger(decimals),
            'DECIMALS'
        );

        this.chainId = chainId;
        this.decimals = decimals;
        this.symbol = symbol;
        this.name = name;
    }

    /**
     * Returns whether this currency is functionally equivalent to the other currency
     * @param other the other currency
     */
    public abstract equals(other: BaseCurrency): boolean;

    /**
     * Return the wrapped version of this currency that can be used with the Secured Finance contracts.
     */
    public abstract get wrapped(): BaseCurrency;
}
