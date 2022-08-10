import { generateId, generatePrefix } from './deal-id';

describe('Check deal id generation functions', function () {
    it('Try to generate product prefix string', async () => {
        let result = generatePrefix('0xLoan');
        let expectedResult = '0x21aaa47b';
        expect(result).toEqual(expectedResult);

        result = generatePrefix('0xSwap');
        expectedResult = '0x12ee719a';
        expect(result).toEqual(expectedResult);
    });

    it('Try to generate deal id string', async () => {
        let productName = '0xLoan';
        const prefix = generatePrefix(productName);
        let result = generateId(1, prefix);
        let expectedResult =
            '0x21aaa47b00000000000000000000000000000000000000000000000000000001';
        expect(result).toEqual(expectedResult);

        result = generateId(1, productName);
        expect(result).toEqual(expectedResult);

        productName = '0xSwap';
        result = generateId(124, productName);
        expectedResult =
            '0x12ee719a0000000000000000000000000000000000000000000000000000007c';
        expect(result).toEqual(expectedResult);
    });
});
