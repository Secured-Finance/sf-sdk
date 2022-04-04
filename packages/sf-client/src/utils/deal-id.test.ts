import { generatePrefix, generateId } from './deal-id';
import assert = require('assert');

describe('Check deal id generation functions', function () {
    it('Try to generate product prefix string', async () => {
        let result = generatePrefix('0xLoan');
        let expectedResult = '0x21aaa47b';
        assert.equal(result, expectedResult);

        result = generatePrefix('0xSwap');
        expectedResult = '0x12ee719a';
        assert.equal(result, expectedResult);
    });

    it('Try to generate deal id string', async () => {
        let productName = '0xLoan';
        let prefix = generatePrefix(productName);
        let result = generateId(1, prefix);
        let expectedResult =
            '0x21aaa47b00000000000000000000000000000000000000000000000000000001';
        assert.equal(result, expectedResult);

        result = generateId(1, productName);
        assert.equal(result, expectedResult);

        productName = '0xSwap';
        result = generateId(124, productName);
        expectedResult =
            '0x12ee719a0000000000000000000000000000000000000000000000000000007c';
        assert.equal(result, expectedResult);
    });
});
