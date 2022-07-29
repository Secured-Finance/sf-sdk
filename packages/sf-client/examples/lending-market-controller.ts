import 'dotenv/config';
import { providers, Wallet } from 'ethers';
import { SecuredFinanceClient, utils } from '../src';

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

    const contract = sfClient.lendingMarketController.contract;

    const terms = await contract.getSupportedTerms(utils.toBytes32('FIL'));
    console.log(terms.toString());
})();
