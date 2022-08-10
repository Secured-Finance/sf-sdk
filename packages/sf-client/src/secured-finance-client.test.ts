import { Ether } from '@secured-finance/sf-core';
import { SecuredFinanceClient } from './secured-finance-client';
import { getProvider } from './utils';

describe('Secured Finance Client', () => {
    beforeAll(() => {
        process.env.SF_ENV = 'development';
    });

    it('should be able to create a new client', async () => {
        const client = new SecuredFinanceClient();
        expect(client).toBeTruthy();
    });

    it('should be able to init the client', async () => {
        const client = new SecuredFinanceClient();
        const provider = getProvider('rinkeby');
        await client.init(provider, await provider.getNetwork());
        expect(client).toBeTruthy();
    });

    it('should thrown an error if the client is not initialized when calling a function', async () => {
        const client = new SecuredFinanceClient();
        expect(
            client.depositCollateral(Ether.onChain(1), 1)
        ).rejects.toThrowError('Client is not initialized');
    });
});
