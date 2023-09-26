import { hexToString, stringToHex } from 'viem';

export const toBytes32 = (text: string) => {
    return stringToHex(text, { size: 32 });
};

export const fromBytes32 = (hex: string) => {
    return hexToString(hex as `0x${string}`, { size: 32 });
};
