import { Hex } from 'viem';
import {
    abi as currencyControllerDevAbi,
    address as currencyControllerDevAddress,
} from './deployments/development/CurrencyController';
import {
    abi as lendingMarketControllerDevAbi,
    address as lendingMarketControllerDevAddress,
} from './deployments/development/LendingMarketController';
import {
    abi as lendingMarketReaderDevAbi,
    address as lendingMarketReaderDevAddress,
} from './deployments/development/LendingMarketReader';
import {
    abi as tokenFaucetDevAbi,
    address as tokenFaucetDevAddress,
} from './deployments/development/TokenFaucet';
import {
    abi as tokenVaultDevAbi,
    address as tokenVaultDevAddress,
} from './deployments/development/TokenVault';
import {
    abi as liquidatorDevAbi,
    address as liquidatorDevAddress,
} from './deployments/development/Liquidator';
import { address as currencyControllerMainnetAddress } from './deployments/mainnet/CurrencyController';
import { address as lendingMarketControllerMainnetAddress } from './deployments/mainnet/LendingMarketController';
import { address as lendingMarketReaderMainnetAddress } from './deployments/mainnet/LendingMarketReader';
import { address as tokenVaultMainnetAddress } from './deployments/mainnet/TokenVault';
import { address as liquidatorMainnetAddress } from './deployments/mainnet/Liquidator';
import { address as currencyControllerSepoliaAddress } from './deployments/sepolia/CurrencyController';
import { address as lendingMarketControllerSepoliaAddress } from './deployments/sepolia/LendingMarketController';
import { address as lendingMarketReaderSepoliaAddress } from './deployments/sepolia/LendingMarketReader';
import { address as tokenVaultSepoliaAddress } from './deployments/sepolia/TokenVault';
import { address as liquidatorSepoliaAddress } from './deployments/sepolia/Liquidator';
import { address as currencyControllerStgAddress } from './deployments/staging/CurrencyController';
import { address as lendingMarketControllerStgAddress } from './deployments/staging/LendingMarketController';
import { address as lendingMarketReaderStgAddress } from './deployments/staging/LendingMarketReader';
import { address as tokenFaucetStgAddress } from './deployments/staging/TokenFaucet';
import { address as tokenVaultStgAddress } from './deployments/staging/TokenVault';
import { address as liquidatorStagingAddress } from './deployments/staging/Liquidator';
import { ContractEnvironments } from './utils';

export const getTokenVaultContract = (env: ContractEnvironments) => {
    let contractAddress = '';
    switch (env) {
        case 'development':
            contractAddress = tokenVaultDevAddress;
            break;
        case 'staging':
            contractAddress = tokenVaultStgAddress;
            break;
        case 'sepolia':
            contractAddress = tokenVaultSepoliaAddress;
            break;
        case 'mainnet':
            contractAddress = tokenVaultMainnetAddress;
    }
    return {
        abi: tokenVaultDevAbi,
        address: contractAddress as Hex,
    };
};

export const getTokenFaucetContract = (env: ContractEnvironments) => {
    let contractAddress = '';
    switch (env) {
        case 'development':
            contractAddress = tokenFaucetDevAddress;
            break;
        case 'staging':
            contractAddress = tokenFaucetStgAddress;
            break;
        case 'sepolia':
        case 'mainnet':
            contractAddress = '';
    }
    return {
        abi: tokenFaucetDevAbi,
        address: contractAddress as Hex,
    };
};

export const getLendingMarketReaderContract = (env: ContractEnvironments) => {
    let contractAddress = '';
    switch (env) {
        case 'development':
            contractAddress = lendingMarketReaderDevAddress;
            break;
        case 'staging':
            contractAddress = lendingMarketReaderStgAddress;
            break;
        case 'sepolia':
            contractAddress = lendingMarketReaderSepoliaAddress;
            break;
        case 'mainnet':
            contractAddress = lendingMarketReaderMainnetAddress;
    }
    return {
        abi: lendingMarketReaderDevAbi,
        address: contractAddress as Hex,
    };
};

export const getLendingMarketControllerContract = (
    env: ContractEnvironments
) => {
    let contractAddress = '';
    switch (env) {
        case 'development':
            contractAddress = lendingMarketControllerDevAddress;
            break;
        case 'staging':
            contractAddress = lendingMarketControllerStgAddress;
            break;
        case 'sepolia':
            contractAddress = lendingMarketControllerSepoliaAddress;
            break;
        case 'mainnet':
            contractAddress = lendingMarketControllerMainnetAddress;
    }
    return {
        abi: lendingMarketControllerDevAbi,
        address: contractAddress as Hex,
    };
};

export const getCurrencyControllerContract = (env: ContractEnvironments) => {
    let contractAddress = '';
    switch (env) {
        case 'development':
            contractAddress = currencyControllerDevAddress;
            break;
        case 'staging':
            contractAddress = currencyControllerStgAddress;
            break;
        case 'sepolia':
            contractAddress = currencyControllerSepoliaAddress;
            break;
        case 'mainnet':
            contractAddress = currencyControllerMainnetAddress;
    }
    return {
        abi: currencyControllerDevAbi,
        address: contractAddress as Hex,
    };
};

export const getLiquidatorContract = (env: ContractEnvironments) => {
    let contractAddress = '';
    switch (env) {
        case 'development':
            contractAddress = liquidatorDevAddress;
            break;
        case 'staging':
            contractAddress = liquidatorStagingAddress;
            break;
        case 'sepolia':
            contractAddress = liquidatorSepoliaAddress;
            break;
        case 'mainnet':
            contractAddress = liquidatorMainnetAddress;
    }
    return {
        abi: liquidatorDevAbi,
        address: contractAddress as Hex,
    };
};
