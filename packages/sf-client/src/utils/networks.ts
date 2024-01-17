import {
    Chain,
    arbitrum,
    arbitrumSepolia,
    avalanche,
    avalancheFuji,
    mainnet,
    sepolia,
} from 'viem/chains';

export const NETWORKS: { [key: number]: string } = {
    1: 'mainnet',
    11155111: 'sepolia',
    42161: 'arbitrum-one',
    421614: 'arbitrum-sepolia',
    43114: 'avalanche-mainnet',
    43113: 'avalanche-fuji',
};

export const CHAINS: { [key: number]: Chain } = {
    1: mainnet,
    11155111: sepolia,
    42161: arbitrum,
    421614: arbitrumSepolia,
    43114: avalanche,
    43113: avalancheFuji,
};

export const networkNames = [
    'sepolia',
    'mainnet',
    'arbitrum-sepolia',
    'arbitrum-one',
    'avalanche-fuji',
    'avalanche-mainnet',
] as const;
export type NetworkName = (typeof networkNames)[number];

export type Network = {
    name: string;
    chainId: number;
};

const environments = ['development', 'staging', 'production'] as const;
const contractEnvironments = [
    'development',
    'development-arb',
    'development-ava',
    'staging',
    'staging-arb',
    'staging-ava',
    'sepolia',
    'mainnet',
    'arbitrum-sepolia',
    'arbitrum-one',
    'avalanche-mainnet',
] as const;
type Environment = (typeof environments)[number];
export type ContractEnvironments = (typeof contractEnvironments)[number];
type NetworkMap = Record<NetworkName, ContractEnvironments>;

const DEPLOYMENT_PATH_MAP: Record<Environment, Partial<NetworkMap>> = {
    development: {
        sepolia: 'development',
        'arbitrum-sepolia': 'development-arb',
        'avalanche-fuji': 'development-ava',
    },
    staging: {
        sepolia: 'staging',
        'arbitrum-sepolia': 'staging-arb',
        'avalanche-fuji': 'staging-ava',
    },
    production: {
        sepolia: 'sepolia',
        mainnet: 'mainnet',
        'arbitrum-sepolia': 'arbitrum-sepolia',
        'arbitrum-one': 'arbitrum-one',
        'avalanche-mainnet': 'avalanche-mainnet',
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
