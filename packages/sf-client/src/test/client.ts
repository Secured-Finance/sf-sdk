// Run this client to retrieve smart contract data
// SF_ENV=development ALCHEMY_API_KEY=xxx node packages/sf-client/dist/test/client.js
import { createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';
import { SecuredFinanceClient } from '../secured-finance-client';

const rpcUrl = `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;

const sfClient = new SecuredFinanceClient();

const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(rpcUrl),
});

sfClient.init(publicClient).then(() => {
    sfClient.getProtocolDepositAmount().then(res => console.log(res));
});
