import { DEFAULT_ADDRESS } from '.';
import {
    CollateralVaultItem,
    collateralVaults,
} from '../lib/collateral-vaults';
import { LendingMarketItem, lendingMarkets } from '../lib/lending-markets';

export const getCollateralVaultByCcy = (
    ccy: string,
    networkID: number
): CollateralVaultItem => {
    return collateralVaults[networkID].find(
        (collateralVault: CollateralVaultItem) => {
            return ccy === collateralVault.ccy;
        }
    );
};

export const getCollateralVaultAddressByCcy = (
    ccy: string,
    networkID: number
): string => {
    const vault = getCollateralVaultByCcy(ccy, networkID);

    if (vault) {
        return vault.address;
    } else {
        return DEFAULT_ADDRESS;
    }
};

export const getLendingMarketByCcyAndTerm = (
    ccy: string,
    term: string,
    networkID: number
): LendingMarketItem => {
    return lendingMarkets[networkID].find((market: LendingMarketItem) => {
        return ccy === market.ccy && term === market.term;
    });
};

export const getLendingMarketAddressByCcyAndTerm = (
    ccy: string,
    term: string,
    networkID: number
): string => {
    const lendingMarket = getLendingMarketByCcyAndTerm(ccy, term, networkID);

    if (lendingMarket) {
        return lendingMarket.address;
    } else {
        return DEFAULT_ADDRESS;
    }
};
