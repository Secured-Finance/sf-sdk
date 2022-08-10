import { utils } from 'ethers/lib/ethers';
import { toBytes32 } from './string';

describe('Check string conversions', function () {
    const sampleString = 'SampleString';
    const invalidString = 'ThisStringIsTooLongToPassConversionToBytes32';

    it('Try to convert string to bytes32 hex string', async () => {
        const result = toBytes32(sampleString);
        expect(utils.parseBytes32String(result)).toEqual(sampleString);
        expect(() => toBytes32(invalidString)).toThrow(
            new Error('bytes32 string must be less than 32 bytes')
        );
    });
});
