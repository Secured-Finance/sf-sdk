import { Hex } from 'viem';
import {
    abi as currencyControllerDevAbi,
    address as currencyControllerDevAddress,
} from './deployments/development/CurrencyController';
import {
    abi as genesisValueVaultDevAbi,
    address as genesisValueVaultDevAddress,
} from './deployments/development/GenesisValueVault';
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
    abi as currencyControllerStgAbi,
    address as currencyControllerStgAddress,
} from './deployments/staging/CurrencyController';
import {
    abi as genesisValueVaultStgAbi,
    address as genesisValueVaultStgAddress,
} from './deployments/staging/GenesisValueVault';
import {
    abi as lendingMarketControllerStgAbi,
    address as lendingMarketControllerStgAddress,
} from './deployments/staging/LendingMarketController';
import {
    abi as lendingMarketReaderStgAbi,
    address as lendingMarketReaderStgAddress,
} from './deployments/staging/LendingMarketReader';
import {
    abi as tokenFaucetStgAbi,
    address as tokenFaucetStgAddress,
} from './deployments/staging/TokenFaucet';
import {
    abi as tokenVaultStgAbi,
    address as tokenVaultStgAddress,
} from './deployments/staging/TokenVault';

export const tokenVaultDevContract = {
    abi: tokenVaultDevAbi,
    address: tokenVaultDevAddress as Hex,
};

export const tokenVaultStgContract = {
    abi: tokenVaultStgAbi,
    address: tokenVaultStgAddress as Hex,
};

export const tokenFaucetDevContract = {
    abi: tokenFaucetDevAbi,
    address: tokenFaucetDevAddress as Hex,
};

export const tokenFaucetStgContract = {
    abi: tokenFaucetStgAbi,
    address: tokenFaucetStgAddress as Hex,
};

export const lendingMarketReaderDevContract = {
    abi: lendingMarketReaderDevAbi,
    address: lendingMarketReaderDevAddress as Hex,
};

export const lendingMarketReaderStgContract = {
    abi: lendingMarketReaderStgAbi,
    address: lendingMarketReaderStgAddress as Hex,
};

export const lendingMarketControllerDevContract = {
    abi: lendingMarketControllerDevAbi,
    address: lendingMarketControllerDevAddress as Hex,
};

export const lendingMarketControllerStgContract = {
    abi: lendingMarketControllerStgAbi,
    address: lendingMarketControllerStgAddress as Hex,
};

export const genesisValueVaultDevContract = {
    abi: genesisValueVaultDevAbi,
    address: genesisValueVaultDevAddress as Hex,
};

export const genesisValueVaultStgContract = {
    abi: genesisValueVaultStgAbi,
    address: genesisValueVaultStgAddress as Hex,
};

export const currencyControllerDevContract = {
    abi: currencyControllerDevAbi,
    address: currencyControllerDevAddress as Hex,
};

export const currencyControllerStgContract = {
    abi: currencyControllerStgAbi,
    address: currencyControllerStgAddress as Hex,
};
