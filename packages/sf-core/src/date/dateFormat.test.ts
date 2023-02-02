import { formatDate, getUTCMonthYear } from './dateFormat';

const timestamp_1 = 1677628800;
const timestamp_2 = 1733011200;

describe('dateFormat', () => {
    it('test getUTCMonthYear', () => {
        expect(getUTCMonthYear(timestamp_1)).toEqual('MAR23');
        expect(getUTCMonthYear(timestamp_2)).toEqual('DEC24');
    });

    it('test formatDate', () => {
        expect(formatDate(timestamp_1)).toEqual('Mar 1, 2023');
        expect(formatDate(timestamp_2)).toEqual('Dec 1, 2024');
    });
});
