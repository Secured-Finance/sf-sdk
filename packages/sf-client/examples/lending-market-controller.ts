import { Token } from '@secured-finance/sf-core';
import 'dotenv/config';
import { providers, Wallet } from 'ethers';
import { SecuredFinanceClient } from '../src';

export class Filecoin extends Token {
    private constructor() {
        super(
            1,
            '0x0000000000000000000000000000000000000000',
            18,
            'FIL',
            'Filecoin'
        );
    }

    private static instance: Filecoin;

    public static onChain(): Filecoin {
        this.instance = this.instance || new Filecoin();
        return this.instance;
    }
}

(async function () {
    const provider = new providers.JsonRpcProvider(
        `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
        'rinkeby'
    );
    let wallet = new Wallet(`0x${process.env.PRIVATE_KEY}`);
    wallet = wallet.connect(provider);

    let network = await provider.getNetwork();

    const sfClient = new SecuredFinanceClient();
    await sfClient.init(wallet, network);
    const FIL = Filecoin.onChain();

    const lendingMarkets = await sfClient.getLendingMarkets(FIL);
    console.table(lendingMarkets);
})();
