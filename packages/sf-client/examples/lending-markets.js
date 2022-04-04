const { SecuredFinanceClient, utils } = require('../dist/index');
const { Wallet, providers } = require('ethers');
require('dotenv/config');

(async function () {
    const provider = new providers.JsonRpcProvider();
    let wallet = new Wallet(`0x${process.env.PRIVATE_KEY}`);
    wallet = wallet.connect(provider);

    const sfClient = new SecuredFinanceClient(provider, wallet);
    await sfClient.init();

    const market = utils.getLendingMarketByCcyAndTerm('FIL', '3 month', 1337);
    const contractAddress = market.address;
    const contract =
        sfClient.contracts.lendingMarkets[contractAddress].contract;

    const rate = await contract.getLendRate();
    console.log(rate.toString());
})();
