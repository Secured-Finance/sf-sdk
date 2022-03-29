import { utils } from 'ethers';

export const toBytes32 = (text: string) => {
    return utils.formatBytes32String(text);
};

export const fromBytes32 = (bytes32: string) => {
    return utils.parseBytes32String(bytes32);
};

export const getProductPrefix = (name: string) => {
    return toBytes32(name);
};

export const getCurrencyIdentifier = (shortName: string) => {
    return toBytes32(shortName);
};
