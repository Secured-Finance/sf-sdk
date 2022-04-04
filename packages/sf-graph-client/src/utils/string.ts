import { utils } from 'ethers';

export const toBytes32 = (text: string) => {
    return utils.formatBytes32String(text);
};

export const fromBytes32 = (bytes32: string) => {
    return utils.parseBytes32String(bytes32);
};

export const getProductPrefix = (name: string) => {
    let encodedPosition = utils.defaultAbiCoder.encode(['string'], [name]);

    let hash = utils.keccak256(encodedPosition);
    return hash.slice(0, 10);
};

export const getCurrencyIdentifier = (shortName: string) => {
    return toBytes32(shortName);
};
