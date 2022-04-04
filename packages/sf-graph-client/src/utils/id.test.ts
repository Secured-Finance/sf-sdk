import {
    generateCrosschainAddressID,
    generateTermId,
    generateProductId,
    generateCurrencyId,
    generateDealId,
    generateTimeSlotId,
    generateCloseOutNettingId,
} from './id';
import assert = require('assert');
import { getProductPrefix } from './string';

describe('Check id string generation functions', function () {
    it('Try to generate term ID string', async () => {
        let numberOfDays = 90;
        let expectedResult = '0x5a';
        let result = generateTermId(numberOfDays);
        assert.equal(result, expectedResult);

        numberOfDays = 180;
        expectedResult = '0xb4';
        result = generateTermId(numberOfDays);
        assert.equal(result, expectedResult);
    });

    it('Try to generate crosschain address ID strings', async () => {
        let userAddress = '0x16dbe39c7685be8f4b6bfb6905b78b3da8378d16';
        let chainId = 0;
        let expectedResult = '0x16dbe39c7685be8f4b6bfb6905b78b3da8378d16-0';

        let result = generateCrosschainAddressID(userAddress, chainId);
        assert.equal(result, expectedResult);

        chainId = 461;
        expectedResult = '0x16dbe39c7685be8f4b6bfb6905b78b3da8378d16-461';
        result = generateCrosschainAddressID(userAddress, chainId);
        assert.equal(result, expectedResult);
    });

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

    it('Try to generate product ID strings', async () => {
        let productName = '0xLoan';
        let prefix = getProductPrefix(productName);
        let expectedResult = '0x21aaa47b';

        let result = generateProductId(prefix);
        assert.equal(result, expectedResult);

        result = generateProductId(productName);
        assert.equal(result, expectedResult);
    });

    it('Try to deal ID strings', async () => {
        let productName = '0xLoan';
        let dealNumber = 1;
        let expectedResult =
            '0x21aaa47b00000000000000000000000000000000000000000000000000000001';

        let result = generateDealId(productName, dealNumber);
        assert.equal(result, expectedResult);

        let prefix = getProductPrefix(productName);
        dealNumber = 2;
        expectedResult =
            '0x21aaa47b00000000000000000000000000000000000000000000000000000002';
        result = generateDealId(prefix, dealNumber);
        assert.equal(result, expectedResult);
    });

    it('Try to generate time slot id', async () => {
        let address0 = '0x16dbe39c7685be8f4b6bfb6905b78b3da8378d16';
        let address1 = '0x9dbe956abda9b6bd514408c157dbe51157391ad4';
        let ccy = 'BTC';
        let day = 2;
        let month = 4;
        let year = 2022;

        let expectedResult =
            '0x5e0432d61f07a05a9044ec882d104d2231acef930b68b0f115ce6311c6ed9646-0x4254430000000000000000000000000000000000000000000000000000000000-2022-4-2';

        let result = generateTimeSlotId(
            address0,
            address1,
            ccy,
            year,
            month,
            day
        );
        assert.equal(result, expectedResult);
    });

    it('Try to generate close out netting id', async () => {
        let address0 = '0x16dbe39c7685be8f4b6bfb6905b78b3da8378d16';
        let address1 = '0x9dbe956abda9b6bd514408c157dbe51157391ad4';
        let ccy = 'BTC';

        let expectedResult =
            '0x5e0432d61f07a05a9044ec882d104d2231acef930b68b0f115ce6311c6ed9646-0x4254430000000000000000000000000000000000000000000000000000000000';

        let result = generateCloseOutNettingId(address0, address1, ccy);
        assert.equal(result, expectedResult);

        ccy = 'FIL';
        result = generateCloseOutNettingId(address0, address1, ccy);
        expectedResult =
            '0x5e0432d61f07a05a9044ec882d104d2231acef930b68b0f115ce6311c6ed9646-0x46494c0000000000000000000000000000000000000000000000000000000000';

        assert.equal(result, expectedResult);
    });
});
