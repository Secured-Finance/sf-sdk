const { SecuredFinanceClient } = require('../dist/index');
const { Wallet, providers } = require('ethers');
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

    const contract = sfClient.contracts.collateralAggregator;

    let vaults = await contract.getUsedVaults(wallet.address);
    console.log(vaults);

    let status = await contract.checkRegisteredUser(wallet.address);
    console.log(status);

    // await contract.register();
})();
