import utils from 'web3-utils';
import { toBytes32 } from './string';

export const generateDealId = (prefix: string, dealNumber: number) => {
    let right = utils.toBN(utils.rightPad(prefix, 64));
    let left = utils.toBN(utils.leftPad(dealNumber, 64));

    let id = utils.numberToHex(right.or(left));

    return id;
};

export const generateProductId = (prefix: string) => {
    let right = utils.toBN(utils.rightPad(prefix, 64));
    return utils.numberToHex(right);
};

export const generateCurrencyId = (shortName: string) => {
    let bytesShortName = toBytes32(shortName);
    let right = utils.toBN(utils.rightPad(bytesShortName, 64));
    return utils.numberToHex(right);
};

export const generateTermId = (numberOfDays: number) => {
    let right = utils.toBN(utils.rightPad(numberOfDays, 64));
    return utils.numberToHex(right);
};
