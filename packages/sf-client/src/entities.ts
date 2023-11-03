import { Chain } from 'viem';

export interface SecuredFinanceClientConfig {
    defaultGas: number;
    defaultGasPrice: number;
    network: string;
    chain: Chain;
    networkId: number;
    env: string;
}
