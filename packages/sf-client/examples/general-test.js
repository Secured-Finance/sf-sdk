const { SecuredFinanceClient } = require('../dist/index');
const { getDefaultProvider, Wallet } = require('ethers');
require("dotenv/config");

(async function() {
    const provider = getDefaultProvider('ropsten', {infura: process.env.INFURA_KEY});
    let wallet = new Wallet(`0x${process.env.PRIVATE_KEY}`);
    wallet = wallet.connect(provider);

    const sfClient = new SecuredFinanceClient(
        provider,
        wallet
    );
    await sfClient.init();

    console.log(sfClient.contracts.lendingMarkets);
})();