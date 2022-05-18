import { hashPosition } from './timeslot';
import assert = require('assert');

describe('Check time slot position hash functions', function () {
    it('Try to compute time slot position, validate result', async () => {
        let day = 30;
        let month = 3;
        let year = 2025;
        let result = hashPosition(year, month, day);
        let expectedResult =
            '0x75e8cb5539715fcd2cfb1fbf875b2769139fe9b4c86b43c9d168166d99256b6f';

        assert.equal(result, expectedResult);

        day = 31;
        month = 3;
        year = 2023;
        expectedResult =
            '0x67f8fc17374365da0a688a0df455589f8966589e4baac86a330e60ff2cc98b47';
        result = hashPosition(year, month, day);
        assert.equal(result, expectedResult);
    });
});
