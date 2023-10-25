import { Chain, goerli, mainnet, sepolia } from 'viem/chains';

export const NETWORKS: { [key: number]: string } = {
    1: 'mainnet',
    11155111: 'sepolia',
    1337: 'localhost',
    5: 'goerli',
};

export const CHAINS: { [key: number]: Chain } = {
    1: mainnet,
    11155111: sepolia,
    5: goerli,
};

export const networkNames = ['sepolia', 'mainnet', 'goerli'] as const;
export type NetworkName = (typeof networkNames)[number];

export type Network = {
    name: string;
    chainId: number;
};

const environments = ['development', 'staging', 'production'] as const;
type Environment = (typeof environments)[number];
type NetworkMap = Record<NetworkName, string>;

const DEPLOYMENT_PATH_MAP: Record<Environment, Partial<NetworkMap>> = {
    development: {
        sepolia: 'development',
    },
    staging: {
        sepolia: 'staging',
    },
    production: {
        goerli: 'goerli',
        mainnet: 'production',
    },
};

export const getContractEnvironment = (networkName: NetworkName) => {
    const environment = (environments.find(env => env === process.env.SF_ENV) ||
        'production') as Environment;

    return DEPLOYMENT_PATH_MAP[environment][networkName];
};
