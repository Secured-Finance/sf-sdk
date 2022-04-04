import { utils } from 'ethers/lib/ethers';
import {
    CollateralVaultItem,
    collateralVaults,
} from '../lib/collateral-vaults';
import {
    LendingMarketItem,
    lendingMarkets,
} from '../lib/lending-markets';

export const packAddresses = (
    addr0: string,
    addr1: string
): [string, boolean] => {
    let encodedAddrs;
    let _addr0, _addr1;

    addr0 < addr1
        ? ((_addr0 = addr0), (_addr1 = addr1))
        : ((_addr0 = addr1), (_addr1 = addr0));

    if (_addr0 != addr0) {
        encodedAddrs = utils.defaultAbiCoder.encode(
            ['address', 'address'],
            [_addr0, _addr1]
        );
        let packed = utils.keccak256(encodedAddrs);
        return [packed, true];
    } else {
        encodedAddrs = utils.defaultAbiCoder.encode(
            ['address', 'address'],
            [_addr0, _addr1]
        );
        let packed = utils.keccak256(encodedAddrs);
        return [packed, false];
    }
};

export const getCollateralVaultByCcy = (
    ccy: string,
    networkID: number,
): CollateralVaultItem => {
    return collateralVaults[networkID].find(
        (collateralVault: CollateralVaultItem) => {
            return ccy === collateralVault.ccy;
        }
    );
};

export const getCollateralVaultAddressByCcy = (
    ccy: string,
    networkID: number,
): string => {
    return getCollateralVaultByCcy(ccy, networkID).address;
};

export const getLendingMarketByCcyAndTerm = (
    ccy: string,
    term: string,
    networkID: number,
): LendingMarketItem => {
    return lendingMarkets[networkID].find(
        (market: LendingMarketItem) => {
            return ccy === market.ccy && term === market.term;
        }
    );
};

export const getLendingMarketAddressByCcyAndTerm = (
    ccy: string,
    term: string,
    networkID: number,
): string => {
    return getLendingMarketByCcyAndTerm(ccy, term, networkID).address;
};
