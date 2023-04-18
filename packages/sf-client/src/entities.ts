import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';

export interface SecuredFinanceClientConfig {
    defaultGas: number;
    defaultGasPrice: number;
    network: string;
    networkId: number;
    signerOrProvider: Signer | Provider;
}
