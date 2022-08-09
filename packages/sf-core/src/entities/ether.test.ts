import { Ether } from './ether';
import { Token } from './token';

describe('ether', () => {
    const eth = new Ether(1);
    it('should create an instance', () => {
        expect(eth).toBeTruthy();
    });

    it('should be a native currency', () => {
        expect(eth.isNative).toBeTruthy();
    });

    it('should not be a token', () => {
        expect(eth.isToken).toBeFalsy();
    });

    it('should return the correct chainId', () => {
        expect(eth.chainId).toBe(1);
    });

    it('should be different from other network ether', () => {
        const eth2 = new Ether(2);
        expect(eth.equals(eth2)).toBeFalsy();
    });

    it('should be equal to itself', () => {
        expect(eth.equals(eth)).toBeTruthy();
    });

    it('should be different from other currencies', () => {
        const token = new Token(1, '0x123', 18, 'TKN', 'Token');
        expect(eth.equals(token)).toBeFalsy();
    });
});
