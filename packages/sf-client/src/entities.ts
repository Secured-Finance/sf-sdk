import { Chain, Hex, PublicClient, WalletClient } from 'viem';

export interface SecuredFinanceClientConfig {
    defaultGas: number;
    defaultGasPrice: number;
    network: string;
    networkId: number;
    env: string;
    publicClient: PublicClient;
    walletClient?: WalletClient;
    walletAddress?: Hex;
    chain?: Chain;
}
