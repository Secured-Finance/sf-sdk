// Run this client to retrieve smart contract data
// SF_ENV=development ALCHEMY_API_KEY=xxx node packages/sf-client/dist/test/client.js
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

const rpcUrl = `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;

const sfClient = new SecuredFinanceClient();

const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(rpcUrl),
});

const account = '0x'; // insert your account here

sfClient.init(publicClient).then(() => {
    sfClient.getProtocolDepositAmount().then(res => console.log(res));
});
