import { utils as ethersUtils } from 'ethers';
import { getCurrencyIdentifier } from './string';

export const generateCurrencyId = (shortName: string) => {
    if (ethersUtils.isHexString(shortName) === true) {
        return shortName;
    } else {
        return getCurrencyIdentifier(shortName);
    }
};
