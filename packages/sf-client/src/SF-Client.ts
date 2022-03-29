import { BigNumber, getDefaultProvider, Signer, Wallet } from 'ethers';
import { BaseProvider } from '@ethersproject/providers';

import { toBytes32 } from './utils/string';
import { NETWORKS } from './utils/networks';
import { ContractsInstance } from './contract-instance';

export class SFClient {
    provider: BaseProvider;
    networkId: number;
    blockGasLimit: BigNumber;
    defaultGas: number;
    defaultGasPrice: number;
    network: string;
    wallet: Wallet;
    contracts: ContractsInstance;

    constructor(
        provider: BaseProvider,
        wallet?: Wallet,
        options?: { defaultGas?: number; defaultGasPrice?: any }
    ) {
        this.defaultGas = options?.defaultGas || 6000000;
        this.defaultGasPrice = options?.defaultGasPrice || 1000000000000;

        this.wallet = wallet;

        this.provider = provider || getDefaultProvider();
    }

    async init(): Promise<void> {
        const network = await this.provider.getNetwork();

        this.networkId = network.chainId;
        this.network = NETWORKS[this.networkId];

        const contractsInstance = new ContractsInstance();
        await contractsInstance.init(this.provider, this.networkId);
        this.contracts = contractsInstance;
    }
}
