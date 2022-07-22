import { expect } from 'chai';

export const expectType = (value: unknown, type: string) => {
    if (value !== undefined) {
        return expect(value).to.satisfy(function (s: unknown) {
            return s === null || typeof s === type;
        });
    }
};
