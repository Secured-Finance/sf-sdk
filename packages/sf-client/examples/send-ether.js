const { SecuredFinanceClient } = require('../dist/index');
const { Wallet, providers } = require('ethers');
const { toBytes32 } = require('../dist/utils');
require('dotenv/config');

(async function () {
    const provider = new providers.JsonRpcProvider(
        `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
        'rinkeby'
    );

    let wallet = new Wallet(`0x${process.env.PRIVATE_KEY}`);
    wallet = wallet.connect(provider);
    let network = await provider.getNetwork();

    const sfClient = new SecuredFinanceClient(wallet, network);

    const transaction = await sfClient.sendEther(1, wallet.address);
    console.log(transaction);
})();
