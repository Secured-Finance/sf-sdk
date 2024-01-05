import { Ether } from './ether';
import { Token } from './token';

describe('ether', () => {
    const eth = Ether.onChain();
    it('should create an instance', () => {
        expect(eth).toBeTruthy();
    });

    it('should be a native currency', () => {
        expect(eth.isNative).toBeTruthy();
    });

    it('should not be a token', () => {
        expect(eth.isToken).toBeFalsy();
    });

    it('should be equal to itself', () => {
        expect(eth.equals(eth)).toBeTruthy();
    });

    it('should be different from other currencies', () => {
        const token = new Token(18, 'TKN', 'Token');
        expect(eth.equals(token)).toBeFalsy();
    });
});
