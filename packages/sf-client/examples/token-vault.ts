import { Ether } from '@secured-finance/sf-core';
import 'dotenv/config';
import { providers } from 'ethers';
import { SecuredFinanceClient } from '../src';

(async function () {
    const provider = new providers.JsonRpcProvider(
        `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
        'rinkeby'
    );

    let network = await provider.getNetwork();

    const sfClient = new SecuredFinanceClient();
    await sfClient.init(provider, network);

    const user = '0x8f4db50f2eb35016bd0e35efd18db15bc46419cb';
    const ETH = Ether.onChain(4);

    const { collateralAmount, collateralCoverage } =
        await sfClient.getCollateralBook(user, ETH);
    console.log(collateralAmount.toString());
    console.log(collateralCoverage.toString());
})();
