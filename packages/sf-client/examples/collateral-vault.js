const { SecuredFinanceClient, utils } = require('../dist/index');
const { getDefaultProvider, Wallet, providers } = require('ethers');
require('dotenv/config');

(async function () {
    const provider = new providers.JsonRpcProvider(
        'https://ropsten.infura.io/v3/32c8b65c63544d9093c2e230aef2fada',
        'ropsten'
    );
    let wallet = new Wallet(
        `16cf319b463e6e8db6fc525ad2cb300963a0f0661dbb94b5209073e29b43abfe`,
        provider
    );

    // const provider = new providers.JsonRpcProvider();
    // let wallet = new Wallet(`0x${process.env.PRIVATE_KEY}`);
    // wallet = wallet.connect(provider);
    // let signer = provider.getSigner();
    let network = await provider.getNetwork();

    const sfClient = new SecuredFinanceClient(provider, network);

    const contracts = sfClient.contracts;
    const user = '0x8f4db50f2eb35016bd0e35efd18db15bc46419cb';
    const vault = utils.getCollateralVaultByCcy('ETH', network.chainId);
    console.log(vault);
    const contractAddress = vault.address;
    const contract = contracts.collateralVaults[contractAddress].contract;

    const independentCollateral = await contract.getIndependentCollateral(user);
    console.log(independentCollateral.toString());

    const lockedCollateral = await contract.getLockedCollateral(user);
    console.log(lockedCollateral.toString());
})();
