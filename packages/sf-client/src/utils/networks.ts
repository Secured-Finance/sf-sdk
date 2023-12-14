import { Chain, mainnet, sepolia } from 'viem/chains';

export const NETWORKS: { [key: number]: string } = {
    1: 'mainnet',
    11155111: 'sepolia',
};

export const CHAINS: { [key: number]: Chain } = {
    1: mainnet,
    11155111: sepolia,
};

export const networkNames = ['sepolia', 'mainnet'] as const;
export type NetworkName = (typeof networkNames)[number];

export type Network = {
    name: string;
    chainId: number;
};

const environments = ['development', 'staging', 'production'] as const;
const contractEnvironments = ['development', 'staging', 'mainnet'] as const;
type Environment = (typeof environments)[number];
export type ContractEnvironments = (typeof contractEnvironments)[number];
type NetworkMap = Record<NetworkName, ContractEnvironments>;

const DEPLOYMENT_PATH_MAP: Record<Environment, Partial<NetworkMap>> = {
    development: {
        sepolia: 'development',
    },
    staging: {
        sepolia: 'staging',
    },
    production: {
        mainnet: 'mainnet',
    },
};

export const getContractEnvironment = (networkName: NetworkName) => {
    const environment = (environments.find(env => env === process.env.SF_ENV) ||
        'production') as Environment;

    const contractEnv = DEPLOYMENT_PATH_MAP[environment][networkName];
    if (contractEnv) {
        return contractEnv;
    } else {
        throw new Error(
            `${networkName} is not supported on ${process.env.SF_ENV} environment.`
        );
    }
};
