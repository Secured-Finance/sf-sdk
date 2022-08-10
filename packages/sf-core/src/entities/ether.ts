import { BaseCurrency } from './baseCurrency';
import { NativeCurrency } from './nativeCurrency';

export class Ether extends NativeCurrency {
    private constructor(chainId: number) {
        super(chainId, 18, 'ETH', 'Ethereum');
    }

    private static etherCache: { [chainId: number]: Ether } = {};

    public static onChain(chainId: number): Ether {
        return (
            this.etherCache[chainId] ??
            (this.etherCache[chainId] = new Ether(chainId))
        );
    }

    public readonly wrapped = this;
    public equals(other: BaseCurrency): boolean {
        return (
            other.chainId === this.chainId &&
            other.isNative &&
            other.symbol === this.symbol
        );
    }
}
