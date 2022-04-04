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

const MAINNET_GATEWAY_TOKENS: CollateralVaultItem[] = [
    {
        address: DEFAULT_ADDRESS,
        ccy: 'ETH',
        tokenAddress: '0x0',
    },
];

const ROPSTEN_GATEWAY_TOKENS: CollateralVaultItem[] = [
    {
        address: DEFAULT_ADDRESS,
        ccy: 'ETH',
        tokenAddress: '0x0',
    },
];

const LOCALHOST_GATEWAY_TOKENS: CollateralVaultItem[] = [
    {
        address: '0xbf5753ec480ec88b214ca7007068dd9d91ba6307',
        ccy: 'ETH',
        tokenAddress: '0x7d5a6b3c3e2e70fb13c2ad495a065f5c59b3bf15',
    },
];

export const collateralVaults: { [key: number]: CollateralVaultItem[] } = {
    1: MAINNET_GATEWAY_TOKENS,
    3: ROPSTEN_GATEWAY_TOKENS,
    1337: LOCALHOST_GATEWAY_TOKENS,
};
