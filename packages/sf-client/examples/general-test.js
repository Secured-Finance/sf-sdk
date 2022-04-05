const { SecuredFinanceClient } = require('../dist/index');
const { getDefaultProvider, Wallet, providers } = require('ethers');
require('dotenv/config');

(async function () {
    // const provider = getDefaultProvider('localhost', {
    //     infura: process.env.INFURA_KEY,
    // });

    const provider = new providers.JsonRpcProvider();
    let wallet = new Wallet(`0x${process.env.PRIVATE_KEY}`);
    wallet = wallet.connect(provider);
    let signer = provider.getSigner();
    let network = await provider.getNetwork();

    const sfClient = new SecuredFinanceClient(provider, signer, network);

    const contracts = sfClient.contracts;

    let address = await contracts.CrosschainAddressResolver.getUserAddress(
        '0x8f4db50f2eb35016bd0e35efd18db15bc46419cb',
        0
    );
    console.log(address);
})();
