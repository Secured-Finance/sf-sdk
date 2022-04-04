import utils from 'web3-utils';
import { utils as ethersUtils } from 'ethers';
import { getProductPrefix, toBytes32 } from './string';
import { packAddresses } from './address-pack';

export const generateDealId = (prefixOrName: string, dealNumber: number) => {
    let prefix = generateProductId(prefixOrName);
    let right = utils.toBN(utils.rightPad(prefix, 64));
    let left = utils.toBN(utils.leftPad(dealNumber, 64));

    let id = utils.numberToHex(right.or(left));

    return id;
};

export const generateProductId = (prefixOrName: string) => {
    if (ethersUtils.isHexString(prefixOrName) === true) {
        return prefixOrName;
    } else {
        return getProductPrefix(prefixOrName);
    }
};

export const generateCurrencyId = (shortName: string) => {
    let bytesShortName = toBytes32(shortName);
    let right = utils.toBN(utils.rightPad(bytesShortName, 64));
    return utils.numberToHex(right);
};

export const generateTermId = (numberOfDays: number) => {
    return ethersUtils.hexValue(numberOfDays);
};

export const generateCrosschainAddressID = (address: string, chainId: number | string) => {
    return address + '-' + chainId.toString();
};

export const generateTimeSlotId = (
    address0: string,
    address1: string,
    ccy: string,
    year: number, 
    month: number, 
    day: number
) => {
    const packedAddresses = packAddresses(address0,address1);
    const currencyId = generateCurrencyId(ccy);

    return packedAddresses[0] + '-' + currencyId + '-' + year + '-' + month + '-' + day 
};

export const generateCloseOutNettingId = (
    user: string, 
    counterparty: string,
    ccyShortName: string,
) => {
    const packedAddresses = packAddresses(user, counterparty);
    const currencyId = generateCurrencyId(ccyShortName);

    return packedAddresses[0] + '-' + currencyId;
};
