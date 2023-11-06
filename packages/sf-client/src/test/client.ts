// Run this client to retrieve smart contract data
// SF_ENV=development node packages/sf-client/dist/test/client.js
import { createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';
import { SecuredFinanceClient } from '../secured-finance-client';

const sfClient = new SecuredFinanceClient();

const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
});

const account = '0x'; // insert your account here

sfClient.init(publicClient).then(() => {
    sfClient.getProtocolDepositAmount().then(res => console.log(res));
});
