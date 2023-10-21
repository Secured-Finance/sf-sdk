import { Chain } from 'viem';

export interface SecuredFinanceClientConfig {
    defaultGas: number;
    defaultGasPrice: number;
    chain: Chain;
    networkId: number;
    env: string;
}
