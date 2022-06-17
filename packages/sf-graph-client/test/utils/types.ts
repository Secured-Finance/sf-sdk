// eslint-disable  @typescript-eslint/no-explicit-any
import { expect } from 'chai';

export const expectType = (value: any, type: string) => {
    if (value != undefined) {
        return expect(value).to.satisfy(function (s: any) {
            return s === null || typeof s === type;
        });
    }
};
