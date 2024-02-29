import { createPublicClient, custom } from 'viem';
import { goerli, mainnet } from 'viem/chains';
import { SecuredFinanceClient } from '../secured-finance-client';
import { WBTC, publicClient } from './helper';

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
        chain: goerli,
        transport: custom({
            async request({ method }) {
                if (method === 'eth_chainId') {
                    return Promise.resolve(goerli.id);
                }
            },
        }),
    });

    it('should throw an error if the publicClient uses an unsupported chain', async () => {
        const client = new SecuredFinanceClient();
        expect(async () => await client.init(pubClient)).rejects.toThrowError(
            /ChainId 5 is not supported./
        );
    });
});

describe('Unsupported chain on environment', () => {
    const pubClient = createPublicClient({
        chain: mainnet,
        transport: custom({
            async request({ method }) {
                if (method === 'eth_chainId') {
                    return Promise.resolve(mainnet.id);
                }
            },
        }),
    });

    it('should throw an error if the publicClient uses an unsupported chain for a given environment', async () => {
        const client = new SecuredFinanceClient();
        expect(async () => await client.init(pubClient)).rejects.toThrowError(
            /mainnet is not supported on development environment./
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

describe('getOrderEstimation', () => {
    it('should return the order estimation parameters', async () => {
        jest.spyOn(publicClient, 'readContract').mockImplementationOnce(() =>
            Promise.resolve([9991n, 1000n, 1002n, 149n, 0n, 6334n, true])
        );
        const client = new SecuredFinanceClient();
        await client.init(publicClient);

        expect(
            await client.getOrderEstimation(
                new WBTC(),
                123,
                '0x123',
                0,
                123n,
                9912
            )
        ).toEqual({
            lastUnitPrice: 9991n,
            filledAmount: 1000n,
            filledAmountInFV: 1002n,
            orderFeeInFV: 149n,
            placedAmount: 0n,
            coverage: 6334n,
            isInsufficientDepositAmount: true,
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

    it('should return the market termination date in staging', async () => {
        process.env.SF_ENV = 'staging';
        jest.spyOn(publicClient, 'readContract').mockImplementation(() =>
            Promise.resolve(123n)
        );
        const client = new SecuredFinanceClient();
        await client.init(publicClient);

        expect(await client.getMarketTerminationDate()).toEqual(123n);
    });
});

describe('getOrderBookDetails', () => {
    it('should return the order book details', async () => {
        jest.spyOn(publicClient, 'readContract').mockImplementation(() =>
            Promise.resolve([
                {
                    ccy: '0x5742544300000000000000000000000000000000000000000000000000000000',
                    maturity: 1703203200n,
                    bestLendUnitPrice: 10000n,
                    bestBorrowUnitPrice: 0n,
                    marketUnitPrice: 0n,
                    lastOrderBlockNumber: 0n,
                    blockUnitPriceHistory: [0n, 0n, 0n, 0n, 0n],
                    maxLendUnitPrice: 10000n,
                    minBorrowUnitPrice: 1n,
                    openingUnitPrice: 0n,
                    openingDate: 1698710400n,
                    preOpeningDate: 1698105600n,
                    isReady: true,
                },
                {
                    ccy: '0x5742544300000000000000000000000000000000000000000000000000000000',
                    maturity: 1703808000n,
                    bestLendUnitPrice: 9800n,
                    bestBorrowUnitPrice: 0n,
                    marketUnitPrice: 0n,
                    lastOrderBlockNumber: 0n,
                    blockUnitPriceHistory: [0n, 0n, 0n, 0n, 0n],
                    maxLendUnitPrice: 10000n,
                    minBorrowUnitPrice: 1n,
                    openingUnitPrice: 0n,
                    openingDate: 1698969600n,
                    preOpeningDate: 1698364800n,
                    isReady: false,
                },
            ])
        );
        const client = new SecuredFinanceClient();
        await client.init(publicClient);

        expect(await client.getOrderBookDetails([])).toEqual([
            {
                ccy: '0x5742544300000000000000000000000000000000000000000000000000000000',
                maturity: 1703203200n,
                bestLendUnitPrice: 10000n,
                bestBorrowUnitPrice: 0n,
                marketUnitPrice: 0n,
                lastOrderBlockNumber: 0n,
                blockUnitPriceHistory: [0n, 0n, 0n, 0n, 0n],
                maxLendUnitPrice: 10000n,
                minBorrowUnitPrice: 1n,
                openingUnitPrice: 0n,
                openingDate: 1698710400n,
                preOpeningDate: 1698105600n,
                isReady: true,
                name: 'DEC2023',
                isMatured: false,
                isOpened: true,
                isItayosePeriod: false,
                isPreOrderPeriod: false,
            },
            {
                ccy: '0x5742544300000000000000000000000000000000000000000000000000000000',
                maturity: 1703808000n,
                bestLendUnitPrice: 9800n,
                bestBorrowUnitPrice: 0n,
                marketUnitPrice: 0n,
                lastOrderBlockNumber: 0n,
                blockUnitPriceHistory: [0n, 0n, 0n, 0n, 0n],
                maxLendUnitPrice: 10000n,
                minBorrowUnitPrice: 1n,
                openingUnitPrice: 0n,
                openingDate: 1698969600n,
                preOpeningDate: 1698364800n,
                isReady: false,
                name: 'DEC2023',
                isMatured: false,
                isOpened: false,
                isItayosePeriod: false,
                isPreOrderPeriod: true,
            },
        ]);
    });
});

describe('getDecimals', () => {
    it('should return the decimals', async () => {
        jest.spyOn(publicClient, 'readContract').mockImplementation(() =>
            Promise.resolve(8n)
        );
        const client = new SecuredFinanceClient();
        await client.init(publicClient);

        expect(await client.getDecimals(new WBTC())).toEqual(8n);
    });
});
