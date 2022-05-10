const { SecuredFinanceClient } = require('../dist/index');
const { getDefaultProvider, Wallet, providers } = require('ethers');
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
    const contracts = sfClient.contracts;

    let address = await contracts.crosschainAddressResolver.getUserAddress(
        '0x8f4db50f2eb35016bd0e35efd18db15bc46419cb',
        0
    );

    console.log(address);
    console.log(await sfClient.getBorrowYieldCurve('FIL'));
})();
