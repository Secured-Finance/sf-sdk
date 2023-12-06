import { SecuredFinanceClient } from '../secured-finance-client';
import { WBTC, publicClient } from './helper';

describe('getTokenAddress', () => {
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

describe('getWithdrawableCollateral', () => {
    it('should return the withdrawable collateral for a given currency and account', async () => {
        jest.spyOn(publicClient, 'readContract').mockImplementationOnce(() =>
            Promise.resolve(1000000000000000000n)
        );
        const client = new SecuredFinanceClient();
        await client.init(publicClient);
        const tokenVault = client.tokenVault;
        const withdrawableCollateral =
            await tokenVault.getWithdrawableCollateral(
                new WBTC(),
                '0x1234567890123456789012345678901234567890'
            );
        expect(withdrawableCollateral).toEqual(1000000000000000000n);
    });
});

describe('getUsedCurrencies', () => {
    it('should return the used currencies', async () => {
        jest.spyOn(publicClient, 'readContract').mockImplementationOnce(() =>
            Promise.resolve([
                '0xBc38CC10b73FA8daE91aFf98a1EEb30E70E774FF',
                '0x1234567890123456789012345678901234567890',
            ])
        );
        const client = new SecuredFinanceClient();
        await client.init(publicClient);
        const tokenVault = client.tokenVault;
        const usedCurrencies = await tokenVault.getUsedCurrencies(
            '0x1234567890123456789012345678901234567890'
        );
        expect(usedCurrencies).toEqual([
            '0xBc38CC10b73FA8daE91aFf98a1EEb30E70E774FF',
            '0x1234567890123456789012345678901234567890',
        ]);
    });
});
