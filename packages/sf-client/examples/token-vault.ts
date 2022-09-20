import 'dotenv/config';
import { providers, Wallet } from 'ethers';
import { SecuredFinanceClient } from '../src';
import { Filecoin } from './tokens/filecoin';

(async function () {
    const provider = new providers.JsonRpcProvider(
        process.env.DEV_RPC_ENDPOINT
    );

    let network = await provider.getNetwork();

    let wallet = new Wallet(`0x${process.env.DEV_PRIVATE_KEY}`);
    wallet = wallet.connect(provider);

    const sfClient = new SecuredFinanceClient();
    await sfClient.init(wallet, network);
    const FIL = Filecoin.onChain();

    await sfClient.depositCollateral(FIL, 1000).then(tx => tx.wait());
    const { collateralAmount, collateralCoverage } =
        await sfClient.getCollateralBook(wallet.address, FIL);

    const allowance = await sfClient.getTokenAllowance(FIL, wallet.address);

    console.log('Allowance:', allowance.toString());
    console.log('Collateral Amount:', collateralAmount.toString());
    console.log('Collateral Coverage:', collateralCoverage.toString());
})();
