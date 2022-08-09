import { BaseCurrency } from './baseCurrency';
import { NativeCurrency } from './nativeCurrency';

export class Ether extends NativeCurrency {
    public constructor(chainId: number) {
        super(chainId, 18, 'ETH', 'Ether');
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
