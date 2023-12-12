import { Token } from './token';

describe('token', () => {
    const token = new Token(1, 18, 'TKN', 'Token');
    it('should create an instance', () => {
        expect(token).toBeTruthy();
    });

    it('should not be a native currency', () => {
        expect(token.isNative).toBeFalsy();
    });

    it('should be a token', () => {
        expect(token.isToken).toBeTruthy();
    });

    it('should return the correct chainId', () => {
        expect(token.chainId).toBe(1);
    });

    it('should be wrapped by itself', () => {
        expect(token.wrapped).toBe(token);
    });
});
