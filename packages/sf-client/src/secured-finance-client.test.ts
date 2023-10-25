import { createPublicClient, http } from 'viem';
import { goerli, polygon, sepolia } from 'viem/chains';
import { SecuredFinanceClient } from './secured-finance-client';

const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
});

beforeAll(() => {
    process.env.SF_ENV = 'development';
});

beforeEach(() => jest.resetAllMocks());

describe('Secured Finance Client', () => {
    it('should be able to create a new client', async () => {
        const client = new SecuredFinanceClient();
        expect(client).toBeTruthy();
    });

    it('should be able to init the client', async () => {
        const client = new SecuredFinanceClient();
        await client.init(publicClient);
        expect(client).toBeTruthy();
    });
});

describe('Unsupported chain on platform', () => {
    const pubClient = createPublicClient({
        chain: polygon,
        transport: http(),
    });

    it('should throw an error if the publicClient uses an unsupported chain', async () => {
        const client = new SecuredFinanceClient();
        expect(async () => await client.init(pubClient)).rejects.toThrowError(
            /ChainId 137 is not supported./
        );
    });
});

describe('Unsupported chain on environment', () => {
    const pubClient = createPublicClient({
        chain: goerli,
        transport: http(),
    });

    it('should throw an error if the publicClient uses an unsupported chain for a given environment', async () => {
        const client = new SecuredFinanceClient();
        expect(async () => await client.init(pubClient)).rejects.toThrowError(
            /goerli is not supported on development environment./
        );
    });
});

describe('config', () => {
    it('should throw an error if the client is not initialized when calling the config', async () => {
        const client = new SecuredFinanceClient();
        expect(() => client.config).toThrowError(/Client is not initialized/);
    });

    it('should return the config if the client is initialized', async () => {
        const client = new SecuredFinanceClient();
        await client.init(publicClient);
        expect(client.config).toBeTruthy();
    });
});

describe('getCollateralParameters', () => {
    it('should return the collateral parameters', async () => {
        jest.spyOn(publicClient, 'readContract').mockImplementationOnce(() =>
            Promise.resolve([12500n, 200n, 500n])
        );
        const client = new SecuredFinanceClient();
        await client.init(publicClient);

        expect(await client.getCollateralParameters()).toEqual({
            liquidationThresholdRate: 12500n,
            liquidationProtocolFeeRate: 200n,
            liquidatorFeeRate: 500n,
        });
    });
});

describe('getMarketTerminationDate', () => {
    it('should return the market termination date', async () => {
        jest.spyOn(publicClient, 'readContract').mockImplementation(() =>
            Promise.resolve(1698089813n)
        );
        const client = new SecuredFinanceClient();
        await client.init(publicClient);

        expect(await client.getMarketTerminationDate()).toEqual(1698089813n);
    });

    it('should return zero market termination date in staging', async () => {
        process.env.SF_ENV = 'staging';
        jest.spyOn(publicClient, 'readContract').mockImplementation(() =>
            Promise.resolve(123n)
        );
        const client = new SecuredFinanceClient();
        await client.init(publicClient);

        expect(await client.getMarketTerminationDate()).toEqual(123n);
    });
});
