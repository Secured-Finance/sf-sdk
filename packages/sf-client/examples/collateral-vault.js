const { SecuredFinanceClient, utils } = require('../dist/index');
const { getDefaultProvider, Wallet, providers } = require('ethers');
require('dotenv/config');

(async function () {
    const provider = new providers.JsonRpcProvider();
    let wallet = new Wallet(`0x${process.env.PRIVATE_KEY}`);
    wallet = wallet.connect(provider);

    const sfClient = new SecuredFinanceClient(provider, wallet);
    await sfClient.init();

    const contracts = sfClient.contracts;
    const user = '0x8f4db50f2eb35016bd0e35efd18db15bc46419cb';
    const vault = utils.getCollateralVaultByCcy('ETH', 1337);
    const contractAddress = vault.address;
    const contract = contracts.collateralVaults[contractAddress].contract;

    const independentCollateral = await contract.getIndependentCollateral(user)
    console.log(independentCollateral.toString());

    const lockedCollateral = await contract.getLockedCollateral(user);
    console.log(lockedCollateral.toString());
})();
