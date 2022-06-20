import { expect } from 'chai';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const expectType = (value: any, type: string) => {
    if (value !== undefined) {
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        return expect(value).to.satisfy(function (s: any) {
            return s === null || typeof s === type;
        });
    }
};
