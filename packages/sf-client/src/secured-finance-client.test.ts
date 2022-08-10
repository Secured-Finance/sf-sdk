import { Ether } from '@secured-finance/sf-core';
import { CollateralVault } from './contracts';
import { SecuredFinanceClient } from './secured-finance-client';
import { getProvider } from './utils';

const CcyBytes32 = {
    ETH: '0x4554480000000000000000000000000000000000000000000000000000000000',
};
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
        const provider = getProvider('rinkeby');
        await client.init(provider, await provider.getNetwork());
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
        const provider = getProvider('rinkeby');
        await client.init(provider, await provider.getNetwork());
        expect(client.config).toBeTruthy();
    });
});

describe('depositCollateral method', () => {
    it('should thrown an error if the client is not initialized when calling depositCollateral', async () => {
        const client = new SecuredFinanceClient();
        expect(
            client.depositCollateral(Ether.onChain(1), 1)
        ).rejects.toThrowError('Client is not initialized');
    });

    it('should call the depositCollateral contract in a payable way for ETH', async () => {
        const client = new SecuredFinanceClient();
        const provider = getProvider('rinkeby');
        const network = await provider.getNetwork();
        await client.init(provider, network);

        const spy = jest
            .spyOn(CollateralVault.prototype, 'deposit')
            .mockImplementation(jest.fn().mockResolvedValue(true));
        const result = await client.depositCollateral(
            Ether.onChain(network.chainId),
            1
        );
        expect(result).toBeTruthy();
        expect(spy).toHaveBeenCalledWith(CcyBytes32['ETH'], 1, { value: 1 });
    });

    it('should call the depositCollateral contract in a non payable way for ERC20 token', async () => {
        const client = new SecuredFinanceClient();
        const provider = getProvider('rinkeby');
        const network = await provider.getNetwork();
        await client.init(provider, network);

        const spy = jest
            .spyOn(CollateralVault.prototype, 'deposit')
            .mockImplementation(jest.fn().mockResolvedValue(true));
        const result = await client.depositCollateral(Ether.onChain(1221), 1);
        expect(result).toBeTruthy();
        expect(spy).toHaveBeenCalledWith(CcyBytes32['ETH'], 1, undefined);
    });
});

describe('withdrawCollateral method', () => {
    it('should thrown an error if the client is not initialized when calling a withdrawCollateral', async () => {
        const client = new SecuredFinanceClient();
        expect(
            client.withdrawCollateral(Ether.onChain(1), 1)
        ).rejects.toThrowError('Client is not initialized');
    });

    it('should call the withdrawCollateral contract', async () => {
        const client = new SecuredFinanceClient();
        const provider = getProvider('rinkeby');
        const network = await provider.getNetwork();
        await client.init(provider, network);

        const spy = jest
            .spyOn(CollateralVault.prototype, 'withdraw')
            .mockImplementation(jest.fn().mockResolvedValue(true));
        const result = await client.withdrawCollateral(
            Ether.onChain(network.chainId),
            1
        );
        expect(result).toBeTruthy();
        expect(spy).toHaveBeenCalledWith(CcyBytes32['ETH'], 1);
    });
});
