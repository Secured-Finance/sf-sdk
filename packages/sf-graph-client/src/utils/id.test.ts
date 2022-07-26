import * as assert from 'assert';
import { generateCurrencyId } from './id';

describe('Check id string generation functions', function () {
    it('Try to generate currency ID strings', async () => {
        let ccyShortIdentifier = 'FIL';
        let expectedResult =
            '0x46494c0000000000000000000000000000000000000000000000000000000000';

        let result = generateCurrencyId(ccyShortIdentifier);
        assert.equal(result, expectedResult);

        ccyShortIdentifier = 'BTC';
        expectedResult =
            '0x4254430000000000000000000000000000000000000000000000000000000000';
        result = generateCurrencyId(ccyShortIdentifier);
        assert.equal(result, expectedResult);

        ccyShortIdentifier = 'ETH';
        expectedResult =
            '0x4554480000000000000000000000000000000000000000000000000000000000';
        result = generateCurrencyId(ccyShortIdentifier);
        assert.equal(result, expectedResult);
    });
});
