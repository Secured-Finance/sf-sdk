/* eslint-disable no-console */

import { Provider } from '@ethersproject/providers';
import type { BaseContract as EthersBaseContract } from 'ethers';
import { Signer } from 'ethers';
import { NetworkName } from '../utils';

const environments = ['development', 'staging', 'production'] as const;
type Environment = (typeof environments)[number];
type NetworkMap = Record<NetworkName, string>;

const DEPLOYMENT_PATH_MAP: Record<Environment, Partial<NetworkMap>> = {
    development: {
        goerli: 'development',
    },
    staging: {
        goerli: 'development',
    },
    production: {
        goerli: 'goerli',
        mainnet: 'production',
    },
};

export interface BaseContractStatic {
    getInstance(
        signerOrProvider: Signer | Provider,
        networkName: NetworkName
    ): Promise<BaseContract<EthersBaseContract>>;
}

export abstract class BaseContract<T extends EthersBaseContract> {
    contract: T;

    constructor(contract: T) {
        this.contract = contract;
    }

    static async getAddress(contractName: string, networkName: NetworkName) {
        const environment = (environments.find(
            env => env === process.env.SF_ENV
        ) || 'production') as Environment;

        const deploymentPath = DEPLOYMENT_PATH_MAP[environment][networkName];

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const deployment = require(`./../deployments/${deploymentPath}/${contractName}.json`);

        return deployment.address;
    }
}

export default BaseContract;
