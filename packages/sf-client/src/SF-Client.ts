import { BigNumber, getDefaultProvider, Signer } from 'ethers';
import { BaseProvider, JsonRpcSigner } from '@ethersproject/providers';
import { Network } from '@ethersproject/networks';

import { NETWORKS } from './utils/networks';
import { ContractsInstance } from './contract-instance';

export class SFClient {
    provider: BaseProvider;
    networkId: number;
    blockGasLimit: BigNumber;
    defaultGas: number;
    defaultGasPrice: number;
    network: string;
    wallet: Signer;
    contracts: ContractsInstance;

    constructor(
        provider: BaseProvider,
        wallet?: Signer | JsonRpcSigner,
        network?: Network,
        options?: { defaultGas?: number; defaultGasPrice?: any }
    ) {
        this.defaultGas = options?.defaultGas || 6000000;
        this.defaultGasPrice = options?.defaultGasPrice || 1000000000000;

        this.wallet = wallet;

        this.provider = provider || getDefaultProvider();

        this.networkId = network.chainId;
        this.network = NETWORKS[this.networkId];

        const contractsInstance = new ContractsInstance(
            wallet,
            network.chainId
        );
        this.contracts = contractsInstance;
    }
}
