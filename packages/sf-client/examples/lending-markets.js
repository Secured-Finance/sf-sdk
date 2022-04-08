const { SecuredFinanceClient, utils } = require('../dist/index');
const { Wallet, providers } = require('ethers');
require('dotenv/config');

(async function () {
    const provider = new providers.JsonRpcProvider();
    let wallet = new Wallet(`0x${process.env.PRIVATE_KEY}`);
    wallet = wallet.connect(provider);
    let signer = provider.getSigner();
    let network = await provider.getNetwork();

    const sfClient = new SecuredFinanceClient(provider, network);

    const market = utils.getLendingMarketByCcyAndTerm(
        'FIL',
        '3 month',
        network.chainId
    );
    const contractAddress = market.address;
    console.log(sfClient.contracts.lendingMarkets);
    const contract =
        sfClient.contracts.lendingMarkets[contractAddress].contract;

    const rate = await contract.getLendRate();
    console.log(rate.toString());
})();
