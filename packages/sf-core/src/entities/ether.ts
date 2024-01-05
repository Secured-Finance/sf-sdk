import { BaseCurrency } from './baseCurrency';
import { NativeCurrency } from './nativeCurrency';

export class Ether extends NativeCurrency {
    private constructor() {
        super(18, 'ETH', 'Ethereum');
    }

    private static instance: Ether;

    public static onChain(): Ether {
        return this.instance ?? (this.instance = new Ether());
    }

    public readonly wrapped = this;
    public equals(other: BaseCurrency): boolean {
        return other.isNative && other.symbol === this.symbol;
    }
}
