import { Token } from '@secured-finance/sf-core';
import MockEFIL from '@secured-finance/smart-contracts/deployments/development/MockEFIL.json';

export class Filecoin extends Token {
    private constructor() {
        super(1, MockEFIL.address, 18, 'FIL', 'Filecoin');
    }

    private static instance: Filecoin;

    public static onChain(): Filecoin {
        this.instance = this.instance || new Filecoin();
        return this.instance;
    }
}
