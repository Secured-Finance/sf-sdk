import * as assert from 'assert';
import { fromBytes32, toBytes32 } from './string';

describe('test string format functions', function () {
    it('toBytes32', async () => {
        const text = 'Hello World!';
        const expectedHex =
            '0x48656c6c6f20576f726c64210000000000000000000000000000000000000000';

        const result = toBytes32(text);
        assert.equal(result, expectedHex);
    });

    it('fromBytes32', async () => {
        const hex =
            '0x48656c6c6f20576f726c64210000000000000000000000000000000000000000';
        const expectedText = 'Hello World!';

        const result = fromBytes32(hex);
        assert.equal(result, expectedText);
    });
});
