import { utils } from 'ethers/lib/ethers';
import {
    CollateralVaultItem,
    collateralVaults,
} from '../lib/collateral-vaults';
import {
    LendingMarketItem,
    lendingMarkets,
    Market,
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
    networkID = 1
): CollateralVaultItem => {
    return collateralVaults[networkID].find(
        (collateralVault: CollateralVaultItem) => {
            return ccy === collateralVault.ccy;
        }
    );
};

export const getLendingMarketByCcyAndTerm = (
    ccy: string,
    term: string,
    networkID = 1
): Market => {
    let market = lendingMarkets[networkID].find((market: LendingMarketItem) => {
        return ccy === market.ccy;
    });

    return market.markets.find((market: Market) => {
        return term === market.term;
    });
};
