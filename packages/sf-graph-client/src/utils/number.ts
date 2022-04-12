import { BigNumber } from 'ethers';

export const toBN = (value: string | number) => {
    return BigNumber.from(value.toString());
};
