import assert = require('assert');
import { timeSlotPosition } from './time-slot';
import { timeSlotPositionByTimestamp } from '.';

describe('Check time slot position hash functions', function () {
    it('Try to compute time slot position, validate result', async () => {
        let day = 30;
        let month = 3;
        let year = 2025;
        let result = timeSlotPosition(year, month, day);
        let expectedResult =
            '0x75e8cb5539715fcd2cfb1fbf875b2769139fe9b4c86b43c9d168166d99256b6f';

        assert.equal(result, expectedResult);

        day = 31;
        month = 3;
        year = 2023;
        expectedResult =
            '0x67f8fc17374365da0a688a0df455589f8966589e4baac86a330e60ff2cc98b47';
        result = timeSlotPosition(year, month, day);
        assert.equal(result, expectedResult);
    });

    it('Try to compute time slot position by timestamp, validate result', async () => {
        let timestamp = 1711821552;
        let expectedResult =
            '0xe6a38d08fd21e332a53654a8eb17c34769566f4a2adcdd4bfa1672a9b334164d';
        let result = timeSlotPositionByTimestamp(timestamp);

        assert.equal(result, expectedResult);

        timestamp = 1806429552;
        expectedResult =
            '0x04e6b007460a391fe5f49ffdd0144eadf7f2adb4878fc955830dd9cb40615ea8';
        result = timeSlotPositionByTimestamp(timestamp);

        assert.equal(result, expectedResult);
    });
});
