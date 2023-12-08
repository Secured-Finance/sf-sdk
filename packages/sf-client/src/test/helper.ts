import { Token } from '@secured-finance/sf-core';
import { createPublicClient, custom } from 'viem';
import { sepolia } from 'viem/chains';

export class WBTC extends Token {
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

export const publicClient = createPublicClient({
    chain: sepolia,
    transport: custom({
        async request({ method }) {
            if (method === 'eth_chainId') {
                return Promise.resolve(sepolia.id);
            }
        },
    }),
});
