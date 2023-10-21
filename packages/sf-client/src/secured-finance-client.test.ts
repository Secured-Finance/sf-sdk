import { createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';
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
