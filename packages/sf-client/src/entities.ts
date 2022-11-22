import { Provider } from '@ethersproject/providers';
import { BigNumber, Signer } from 'ethers';

export interface SecuredFinanceClientConfig {
    defaultGas: number;
    defaultGasPrice: number;
    network: string;
    networkId: number;
    signerOrProvider: Signer | Provider;
}

export interface LendingMarketInfo {
    maturity: number;
    name: string;
    lendUnitPrice: BigNumber;
    borrowUnitPrice: BigNumber;
    midUnitPrice: BigNumber;
}
