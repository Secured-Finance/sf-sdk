import 'dotenv/config';
import { providers, Wallet } from 'ethers';
import { SecuredFinanceClient } from '../src';

(async function () {
    const provider = new providers.JsonRpcProvider(
        process.env.DEV_RPC_ENDPOINT
    );

    let wallet = new Wallet(`0x${process.env.DEV_PRIVATE_KEY}`);
    wallet = wallet.connect(provider);
    let network = await provider.getNetwork();

    const sfClient = new SecuredFinanceClient();
    await sfClient.init(wallet, network);

    const transaction = await sfClient.sendEther(1, wallet.address);
    console.log(transaction);
})();
