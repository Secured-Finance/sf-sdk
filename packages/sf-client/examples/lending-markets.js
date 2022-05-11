const { SecuredFinanceClient, utils } = require('../dist/index');
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

    const sfClient = new SecuredFinanceClient(provider, network);

    const market = utils.getLendingMarketByCcyAndTerm(
        'FIL',
        '3 month',
        network.chainId
    );
    const contractAddress = market.address;

    const contract =
        sfClient.contracts.lendingMarkets[contractAddress].contract;

    const rate = await contract.getLendRate();
    console.log(rate.toString());
})();
