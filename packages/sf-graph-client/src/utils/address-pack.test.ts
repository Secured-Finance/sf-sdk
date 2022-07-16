import * as assert from 'assert';
import { packAddresses, sortAddresses } from './address-pack';

describe('Test address pack functions', function () {
    it('Try to pack addresses, check result hash', async () => {
        const address0 = '0x16dbe39c7685be8f4b6bfb6905b78b3da8378d16';
        const address1 = '0x9dbe956abda9b6bd514408c157dbe51157391ad4';
        const result = packAddresses(address0, address1);
        const expectedResult =
            '0x5e0432d61f07a05a9044ec882d104d2231acef930b68b0f115ce6311c6ed9646';
        assert.equal(result[0], expectedResult);
    });

    it('Try to pack addresses with incorrect address, expect failed result', async () => {
        const address0 = '0x16dbe39c7685be8f4b6bfb6905b78b3da8378d16';
        const address1 = '';

        assert.throws(() => {
            packAddresses(address0, address1);
        });
    });

    it('Try to sort 2 addresses with different order, validate correct order on both ways', async () => {
        const address0 = '0x16dbe39c7685be8f4b6bfb6905b78b3da8378d16';
        const address1 = '0x9dbe956abda9b6bd514408c157dbe51157391ad4';

        const result = sortAddresses(address0, address1);
        const secondResult = sortAddresses(address1, address0);

        assert.deepEqual(result, secondResult);
    });
});
