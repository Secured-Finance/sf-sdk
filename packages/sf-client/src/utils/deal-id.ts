import { utils } from 'ethers/lib/ethers';
import { toBN, rightPad, leftPad, numberToHex } from 'web3-utils';

export const generatePrefix = (val: string) => {
    let encodedPosition = utils.defaultAbiCoder.encode(['string'], [val]);

    let hash = utils.keccak256(encodedPosition);
    return hash.slice(0, 10);
};

export const generateId = (value: number | string, prefix: string) => {
    let right = toBN(rightPad(prefix, 64));
    let left = toBN(leftPad(value, 64));

    let id = numberToHex(right.or(left));

    return id;
};
