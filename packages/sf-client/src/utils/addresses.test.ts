import {
    getCollateralVaultAddressByCcy,
    getLendingMarketAddressByCcyAndTerm,
} from './addresses';
import { DEFAULT_ADDRESS } from './constants';
import assert = require('assert');

describe('Check addresses utils functions', function () {
    const ropstenNetworkID = 3;
    const localhostNetworkID = 1337;

    it('Try get collateral vault address by currency, check addresses', async () => {
        let result = getCollateralVaultAddressByCcy('ETH', localhostNetworkID);
        const expectedResult = '0xbf5753ec480ec88b214ca7007068dd9d91ba6307';
        assert.equal(result, expectedResult);

        result = getCollateralVaultAddressByCcy('ETH', ropstenNetworkID);
        assert.equal(result, '0x62E09A147445AF26EDB7a67F51AE11E09eD37407');

        result = getCollateralVaultAddressByCcy('FIL', ropstenNetworkID);
        assert.equal(result, DEFAULT_ADDRESS);
    });

    it('Try get lending market addresses by currency and term, check addresses', async () => {
        let result = getLendingMarketAddressByCcyAndTerm(
            'FIL',
            '3 month',
            localhostNetworkID
        );
        const expectedResult = '0xdf12940a13c08715ab481e97cb521c3b395be019';
        assert.equal(result, expectedResult);

        result = getLendingMarketAddressByCcyAndTerm(
            'ETH',
            '3 month',
            ropstenNetworkID
        );
        assert.equal(result, DEFAULT_ADDRESS);

        result = getLendingMarketAddressByCcyAndTerm(
            'BTC',
            '1 year',
            ropstenNetworkID
        );
        assert.equal(result, DEFAULT_ADDRESS);
    });
});
