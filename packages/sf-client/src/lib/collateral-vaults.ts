import { CollateralVault } from "../contracts";
import { DEFAULT_ADDRESS } from "../utils/constants";

export interface CollateralVaultItem {
    address: string;
    ccy: string;
    tokenAddress: string;
    contract?: CollateralVault;
}

export interface CollateralVaults {
    [address: string]: CollateralVaultItem
}

const MAINNET_GATEWAY_TOKENS: CollateralVaultItem[] = [
    {
        address: DEFAULT_ADDRESS,
        ccy: 'ETH',
        tokenAddress: '0x0',
    }
];

const ROPSTEN_GATEWAY_TOKENS: CollateralVaultItem[] = [
    {
        address: DEFAULT_ADDRESS,
        ccy: 'ETH',
        tokenAddress: '0x0',
    }
];

const LOCALHOST_GATEWAY_TOKENS: CollateralVaultItem[] = [
    {
        address: DEFAULT_ADDRESS,
        ccy: 'ETH',
        tokenAddress: '0x0',
    }
];

export const collateralVaults: {[key: number]: CollateralVaultItem[]} = {
    1: MAINNET_GATEWAY_TOKENS,
    3: ROPSTEN_GATEWAY_TOKENS,
    1337: LOCALHOST_GATEWAY_TOKENS,
}