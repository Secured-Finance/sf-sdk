const { SecuredFinanceClient, utils } = require('../dist/index');
const { Wallet, providers } = require('ethers');
require('dotenv/config');

(async function () {
    const provider = new providers.JsonRpcProvider();
    let wallet = new Wallet(`0x${process.env.PRIVATE_KEY}`);
    wallet = wallet.connect(provider);
    let signer = provider.getSigner();
    let network = await provider.getNetwork();

    const sfClient = new SecuredFinanceClient(provider, network);

    const contract = sfClient.contracts.lendingMarketController.contract;

    const terms = await contract.getSupportedTerms(utils.toBytes32('FIL'));
    console.log(terms.toString());
})();
