// Run this client to retrieve smart contract data
// SF_ENV=development ALCHEMY_API_KEY=xxx node packages/sf-client/dist/test/client.js
import { Token } from '@secured-finance/sf-core';
import { getDefaultProvider } from 'ethers';
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

const client = new SecuredFinanceClient();
const provider = getDefaultProvider(
    `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
);

client
    .init(provider, {
        chainId: 11155111,
        name: 'sepolia',
    })
    .then(() => {
        client.getLendingMarketDetailsPerCurrency(new WBTC()).then(markets => {
            console.log(markets);
        });
    });
