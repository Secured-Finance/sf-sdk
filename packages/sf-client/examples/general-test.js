const { SecuredFinanceClient } = require('../dist/index');
const { getDefaultProvider, Wallet, providers } = require('ethers');
require('dotenv/config');

(async function () {
    const ropsten = new providers.JsonRpcProvider(
        'https://ropsten.infura.io/v3/32c8b65c63544d9093c2e230aef2fada',
        'ropsten'
    );

    // const provider = new providers.JsonRpcProvider();

    let wallet = new Wallet(
        `16cf319b463e6e8db6fc525ad2cb300963a0f0661dbb94b5209073e29b43abfe`,
        ropsten
    );
    let network = await ropsten.getNetwork();

    const sfClient = new SecuredFinanceClient(ropsten, network);
    const contracts = sfClient.contracts;

    let address = await contracts.crosschainAddressResolver.getUserAddress(
        '0x8f4db50f2eb35016bd0e35efd18db15bc46419cb',
        0
    );

    console.log(address);
    console.log(await sfClient.getBorrowYieldCurve('FIL'));
})();
