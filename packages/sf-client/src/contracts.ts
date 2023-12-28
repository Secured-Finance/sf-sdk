import { Hex } from 'viem';
import {
    abi as currencyControllerAbi,
    addresses as currencyControllerAddresses,
} from './deployments/CurrencyController';
import {
    abi as lendingMarketControllerAbi,
    addresses as lendingMarketControllerAddresses,
} from './deployments/LendingMarketController';
import {
    abi as lendingMarketReaderAbi,
    addresses as lendingMarketReaderAddresses,
} from './deployments/LendingMarketReader';
import {
    abi as tokenFaucetAbi,
    addresses as tokenFaucetAddresses,
} from './deployments/TokenFaucet';
import {
    abi as tokenVaultAbi,
    addresses as tokenVaultAddresses,
} from './deployments/TokenVault';
import { ContractEnvironments } from './utils';

export const getTokenVaultContract = (env: ContractEnvironments) => {
    return {
        abi: tokenVaultAbi,
        address: tokenVaultAddresses[env] as Hex,
    };
};

export const getTokenFaucetContract = (env: ContractEnvironments) => {
    return {
        abi: tokenFaucetAbi,
        address: tokenFaucetAddresses[env] as Hex,
    };
};

export const getLendingMarketReaderContract = (env: ContractEnvironments) => {
    return {
        abi: lendingMarketReaderAbi,
        address: lendingMarketReaderAddresses[env] as Hex,
    };
};

export const getLendingMarketControllerContract = (
    env: ContractEnvironments
) => {
    return {
        abi: lendingMarketControllerAbi,
        address: lendingMarketControllerAddresses[env] as Hex,
    };
};

export const getCurrencyControllerContract = (env: ContractEnvironments) => {
    return {
        abi: currencyControllerAbi,
        address: currencyControllerAddresses[env] as Hex,
    };
};
