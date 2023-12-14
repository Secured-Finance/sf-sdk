import { Chain } from 'viem';
import { ContractEnvironments } from './utils';

export interface SecuredFinanceClientConfig {
    defaultGas: number;
    defaultGasPrice: number;
    network: string;
    chain: Chain;
    networkId: number;
    env: ContractEnvironments;
}
