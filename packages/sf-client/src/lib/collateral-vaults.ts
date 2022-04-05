import { CollateralVault } from '../contracts';
import { DEFAULT_ADDRESS } from '../utils/constants';

export interface CollateralVaultItem {
    address: string;
    ccy: string;
    tokenAddress: string;
    contract?: CollateralVault;
}

export interface CollateralVaults {
    [address: string]: CollateralVaultItem;
}

const MAINNET_COLLATERAL_VAULTS: CollateralVaultItem[] = [
    {
        address: DEFAULT_ADDRESS,
        ccy: 'ETH',
        tokenAddress: '0x0',
    },
];

const ROPSTEN_COLLATERAL_VAULTS: CollateralVaultItem[] = [
    {
        address: '0x62E09A147445AF26EDB7a67F51AE11E09eD37407',
        ccy: 'ETH',
        tokenAddress: '0x088E36970FC2222b244c0480671171e7E7C3a9eA',
    },
];

const LOCALHOST_COLLATERAL_VAULTS: CollateralVaultItem[] = [
    {
        address: '0xbf5753ec480ec88b214ca7007068dd9d91ba6307',
        ccy: 'ETH',
        tokenAddress: '0x7d5a6b3c3e2e70fb13c2ad495a065f5c59b3bf15',
    },
];

export const collateralVaults: { [key: number]: CollateralVaultItem[] } = {
    1: MAINNET_COLLATERAL_VAULTS,
    3: ROPSTEN_COLLATERAL_VAULTS,
    1337: LOCALHOST_COLLATERAL_VAULTS,
};
