import { Token } from '@secured-finance/sf-core';
import { createPublicClient, custom } from 'viem';
import { sepolia } from 'viem/chains';
import { SecuredFinanceClient } from '../secured-finance-client';

const publicClient = createPublicClient({
    chain: sepolia,
    transport: custom({
        async request({ method }) {
            if (method === 'eth_chainId') {
                return Promise.resolve(sepolia.id);
            }
        },
    }),
});

beforeAll(() => {
    process.env.SF_ENV = 'development';
});

beforeEach(() => jest.resetAllMocks());

afterAll(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
});

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

describe('TokenVault', () => {
    it('should return the token address for a given currency', async () => {
        jest.spyOn(publicClient, 'readContract').mockImplementation(() =>
            Promise.resolve('0xBc38CC10b73FA8daE91aFf98a1EEb30E70E774FF')
        );
        const client = new SecuredFinanceClient();
        await client.init(publicClient);
        const tokenVault = client.tokenVault;
        const tokenAddress = await tokenVault.getTokenAddress(new WBTC());
        expect(tokenAddress).toEqual(
            '0xBc38CC10b73FA8daE91aFf98a1EEb30E70E774FF'
        );
    });
});

describe('getCollateralParameters', () => {
    it('should return the collateral parameters', async () => {
        jest.spyOn(publicClient, 'readContract').mockImplementationOnce(() =>
            Promise.resolve([12500n, 200n, 500n])
        );
        const client = new SecuredFinanceClient();
        await client.init(publicClient);

        expect(await client.tokenVault.getCollateralParameters()).toEqual({
            liquidationThresholdRate: 12500n,
            liquidationProtocolFeeRate: 200n,
            liquidatorFeeRate: 500n,
        });
    });
});
