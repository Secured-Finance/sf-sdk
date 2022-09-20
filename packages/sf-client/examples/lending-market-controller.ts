import 'dotenv/config';
import { providers, Wallet } from 'ethers';
import { SecuredFinanceClient } from '../src';
import { Filecoin } from './tokens/filecoin';

(async function () {
    const provider = new providers.JsonRpcProvider(
        process.env.DEV_RPC_ENDPOINT
    );
    let wallet = new Wallet(`0x${process.env.DEV_PRIVATE_KEY}`);
    wallet = wallet.connect(provider);

    let network = await provider.getNetwork();

    const sfClient = new SecuredFinanceClient();
    await sfClient.init(wallet, network);
    const FIL = Filecoin.onChain();

    const lendingMarkets = await sfClient.getLendingMarkets(FIL);
    console.table(lendingMarkets);

    await sfClient.placeLendingOrder(
        FIL,
        lendingMarkets[0].maturity,
        '0',
        1000,
        100000
    );
})();
