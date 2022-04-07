import { BigNumber, getDefaultProvider, Signer } from 'ethers';
import { JsonRpcSigner, Provider } from '@ethersproject/providers';
import { Network } from '@ethersproject/networks';

import { NETWORKS } from './utils/networks';
import { ContractsInstance } from './contract-instance';

export class SFClient {
    signerOrProvider: any;
    networkId: number;
    blockGasLimit: BigNumber;
    defaultGas: number;
    defaultGasPrice: number;
    network: string;
    contracts: ContractsInstance;

    constructor(
        signerOrProvider: Signer | Provider,
        network?: Network,
        options?: { defaultGas?: number; defaultGasPrice?: any }
    ) {
        this.defaultGas = options?.defaultGas || 6000000;
        this.defaultGasPrice = options?.defaultGasPrice || 1000000000000;

        this.signerOrProvider = signerOrProvider || getDefaultProvider();

        this.networkId = network.chainId;
        this.network = NETWORKS[this.networkId];

        const contractsInstance = new ContractsInstance(
            signerOrProvider,
            network.chainId
        );
        this.contracts = contractsInstance;
    }
}
