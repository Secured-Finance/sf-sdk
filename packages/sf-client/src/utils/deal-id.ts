import { utils } from 'ethers/lib/ethers';
import { leftPad, numberToHex, rightPad, toBN } from 'web3-utils';

export const generatePrefix = (val: string) => {
    const encodedPosition = utils.defaultAbiCoder.encode(['string'], [val]);

    const hash = utils.keccak256(encodedPosition);
    return hash.slice(0, 10);
};

export const generateId = (value: number | string, prefixOrName: string) => {
    let prefix;
    if (utils.isHexString(prefixOrName)) {
        prefix = prefixOrName;
    } else {
        prefix = generatePrefix(prefixOrName);
    }
    const right = toBN(rightPad(prefix, 64));
    const left = toBN(leftPad(value, 64));

    const id = numberToHex(right.or(left));

    return id;
};
