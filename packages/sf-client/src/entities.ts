import { PublicClient, WalletClient } from 'viem';

export interface SecuredFinanceClientConfig {
    defaultGas: number;
    defaultGasPrice: number;
    network: string;
    networkId: number;
    publicClient: PublicClient;
    walletClient?: WalletClient;
}
