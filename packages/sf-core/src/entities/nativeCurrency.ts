import { BaseCurrency } from './baseCurrency';

export abstract class NativeCurrency extends BaseCurrency {
    public readonly isNative = true;
    public readonly isToken = false;
}
