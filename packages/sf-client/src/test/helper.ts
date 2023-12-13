import { Token } from '@secured-finance/sf-core';
import { createPublicClient, custom, PublicClient } from 'viem';
import { sepolia } from 'viem/chains';

export class WBTC extends Token {
    constructor() {
        super(1, 8, 'WBTC', 'Bitcoin');
    }
}

export const publicClient: PublicClient = createPublicClient({
    chain: sepolia,
    transport: custom({
        async request({ method }) {
            if (method === 'eth_chainId') {
                return Promise.resolve(sepolia.id);
            }
        },
    }),
});
