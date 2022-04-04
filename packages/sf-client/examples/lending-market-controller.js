const { SecuredFinanceClient, utils } = require('../dist/index');
const { Wallet, providers } = require('ethers');
require('dotenv/config');

(async function () {
    const provider = new providers.JsonRpcProvider();
    let wallet = new Wallet(`0x${process.env.PRIVATE_KEY}`);
    wallet = wallet.connect(provider);

    const sfClient = new SecuredFinanceClient(provider, wallet);
    await sfClient.init();

    const contract = sfClient.contracts.LendingMarketController.contract;

    const terms = await contract.getSupportedTerms(utils.toBytes32('FIL'))
    console.log(terms.toString());
})();
