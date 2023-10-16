// Run this client to retrieve smart contract data
// SF_ENV=development node packages/sf-client/dist/test/client.js
import { Token } from '@secured-finance/sf-core';
import { createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';
import { SecuredFinanceClient } from '../secured-finance-client';

class WBTC extends Token {
    constructor() {
        super(
            1,
            '0xBc38CC10b73FA8daE91aFf98a1EEb30E70E774FF',
            8,
            'WBTC',
            'Bitcoin'
        );
    }
}

const sfClient = new SecuredFinanceClient();

const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
});

const account = '0x'; // insert your account here

sfClient
    .init(
        {
            chainId: 11155111,
            name: 'sepolia',
        },
        publicClient
    )
    .then(() => {
        // sfClient.getCollateralParameters().then(res => console.log(res));
        // sfClient
        //     .getWithdrawableCollateral(new WBTC(), acc)
        //     .then(res => console.log(res));
        // sfClient
        //     .getBestLendUnitPrices(new WBTC())
        //     .then(res => console.log(res));
        // sfClient
        //     .getBestBorrowUnitPrices(new WBTC())
        //     .then(res => console.log(res));
        // sfClient.getMaturities(new WBTC()).then(res => console.log(res));
        // sfClient
        //     .getOrderBookDetail(new WBTC(), 1698364800)
        //     .then(res => console.log(res));
        // sfClient
        //     .getOrderBookDetails([new WBTC()])
        //     .then(res => console.log(res));
        // sfClient.getERC20Balance(new WBTC(), acc).then(res => console.log(res));
        sfClient.getProtocolDepositAmount().then(res => console.log(res));
    });
