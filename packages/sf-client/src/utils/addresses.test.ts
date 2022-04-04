import { BaseProvider, JsonRpcProvider } from '@ethersproject/providers';
import {
    getCollateralVaultAddressByCcy,
    getLendingMarketAddressByCcyAndTerm,
    packAddresses,
} from './addresses';
import assert = require('assert');
import { DEFAULT_ADDRESS } from './constants';

describe('Check addresses utils functions', function () {
    const userAddress: string = '0x8f4db50f2eb35016bd0e35efd18db15bc46419cb';
    let counterparty: string;
    const mainnetNetworkID: number = 1;
    const ropstenNetworkID: number = 3;
    const localhostNetworkID: number = 1337;

    it('Try to pack addresses, check result hash', async () => {
        counterparty = '0x16dbe39c7685be8f4b6bfb6905b78b3da8378d16';
        let result = packAddresses(userAddress, counterparty);
        let expectedResult =
            '0xb656c9d359dd75ec87bbb7408823138e9a91aa5cb666a27a80210256a2372825';
        assert.equal(result[0], expectedResult);
    });

    it('Try to pack addresses with incorrect address, expect failed result', async () => {
        counterparty = '';

        assert.throws(() => {
            packAddresses(userAddress, counterparty);
        });
    });

    it('Try get collateral vault address by currency, check addresses', async () => {
        let result = getCollateralVaultAddressByCcy('ETH', localhostNetworkID);
        let expectedResult = '0xbf5753ec480ec88b214ca7007068dd9d91ba6307';
        assert.equal(result, expectedResult);

        result = getCollateralVaultAddressByCcy('ETH', ropstenNetworkID);
        assert.equal(result, DEFAULT_ADDRESS);

        assert.throws(() => {
            getCollateralVaultAddressByCcy('FIL', mainnetNetworkID);
        });
    });

    it('Try get lending market addresses by currency and term, check addresses', async () => {
        let result = getLendingMarketAddressByCcyAndTerm(
            'FIL',
            '3 month',
            localhostNetworkID
        );
        let expectedResult = '0xdf12940a13c08715ab481e97cb521c3b395be019';
        assert.equal(result, expectedResult);

        result = getLendingMarketAddressByCcyAndTerm(
            'ETH',
            '3 month',
            ropstenNetworkID
        );
        assert.equal(result, DEFAULT_ADDRESS);

        assert.throws(() => {
            getLendingMarketAddressByCcyAndTerm(
                'BTC',
                '1 year',
                mainnetNetworkID
            );
        });
    });
});
