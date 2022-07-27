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

    const user = '0x8f4db50f2eb35016bd0e35efd18db15bc46419cb';
    const ccy = utils.formatBytes32String('ETH');

    const independentCollateral =
        await sfClient.collateralVault.contract.getIndependentCollateral(
            user,
            ccy
        );
    console.log(independentCollateral.toString());

    const lockedCollateral = await sfClient.collateralVault.getLockedCollateral(
        user,
        ccy
    );
    console.log(lockedCollateral.toString());
})();
