const { SecuredFinanceClient } = require('../dist/index');
const { Wallet, providers } = require('ethers');
require('dotenv/config');

(async function () {
    const provider = new providers.JsonRpcProvider();
    let wallet = new Wallet(`0x${process.env.PRIVATE_KEY}`);
    wallet = wallet.connect(provider);
    let signer = provider.getSigner();
    let network = await provider.getNetwork();

    const sfClient = new SecuredFinanceClient(provider, wallet, network);

    const user = '0x8f4db50f2eb35016bd0e35efd18db15bc46419cb';
    const contract = sfClient.contracts.CollateralAggregator;

    let vaults = await contract.getUsedVaults(user);
    console.log(vaults);

    let status = await contract.checkRegisteredUser(wallet.address);
    console.log(status);

    await contract.register();
})();
