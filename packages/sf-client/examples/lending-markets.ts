import 'dotenv/config';
import { providers, utils } from 'ethers';
import { SecuredFinanceClient } from '../src';

(async function () {
    const provider = new providers.JsonRpcProvider(
        `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
        'rinkeby'
    );

    let network = await provider.getNetwork();

    const sfClient = new SecuredFinanceClient();
    await sfClient.init(provider, network);

    const ccy = utils.formatBytes32String('FIL');
    const term = '90';

    const lendingMarket = await sfClient.lendingMarkets.get(ccy, term);

    const rate = await lendingMarket.contract.getLendRate();
    console.log(rate.toString());
})();
