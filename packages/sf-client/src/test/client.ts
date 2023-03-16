// Run this client to retrieve smart contract data
// SF_ENV=development ALCHEMY_API_KEY=xxx node packages/sf-client/dist/test/client.js
import { Token } from '@secured-finance/sf-core';
import { providers } from 'ethers';
import { SecuredFinanceClient } from '../secured-finance-client';

class Filecoin extends Token {
    constructor() {
        super(
            1,
            '0xed4733fe7bac4c2934f7e9ce4e0696b2169701d8',
            18,
            'FIL',
            'Filecoin'
        );
    }
}

const client = new SecuredFinanceClient();
const provider = new providers.AlchemyProvider(
    'goerli',
    process.env.ALCHEMY_API_KEY
);

client
    .init(provider, {
        chainId: 5,
        name: 'goerli',
    })
    .then(() => {
        client.getLendingMarkets(new Filecoin()).then(markets => {
            console.log(markets);
        });
    });
