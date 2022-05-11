const { SecuredFinanceClient } = require('../dist/index');
const { Wallet, providers, BigNumber } = require('ethers');
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

    const requests =
        await sfClient.contracts.settlementEngine.settlementRequests(
            toBytes32('0xTestRequest')
        );
    console.log(requests);

    // const user = '0x8f4db50f2eb35016bd0e35efd18db15bc46419cb';
    // await sfClient.verifyPayment(
    //     user,
    //     'FIL',
    //     BigNumber.from('1000000000000000000'),
    //     BigNumber.from('1652218985'),
    //     '0xTest'
    // );
})();
