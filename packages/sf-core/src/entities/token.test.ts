import { Token } from './token';

describe('token', () => {
    const token = new Token(18, 'TKN', 'Token');
    it('should create an instance', () => {
        expect(token).toBeTruthy();
    });

    it('should not be a native currency', () => {
        expect(token.isNative).toBeFalsy();
    });

    it('should be a token', () => {
        expect(token.isToken).toBeTruthy();
    });

    it('should be wrapped by itself', () => {
        expect(token.wrapped).toBe(token);
    });

    it('should be equal to itself', () => {
        expect(token.equals(token)).toBeTruthy();
    });

    it('should be different from another token', () => {
        const other = new Token(18, 'TKN1', 'Token');
        expect(token.equals(other)).toBeFalsy();
    });
});
