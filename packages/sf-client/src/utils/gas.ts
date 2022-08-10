import { BigNumber, BytesLike, utils, Wallet } from 'ethers';
import { GasPriceOracle } from 'gas-price-oracle';
import { DEFAULT_CHAIN_ID } from './constants';
import { TxBase } from './eth-tx';
import { getProvider } from './providers';
import { mnemonicSigner } from './signer';

export declare type GasPrices = {
    instant: number;
    fast: number;
    standard: number;
    low: number;
};

export declare type GasPriceOracleOptions = {
    chainId: number;
    defaultRpc: string;
    timeout: number;
    defaultFallbackGasPrices: GasPrices;
};

export declare type GasPriceKey = 'instant' | 'fast' | 'standard' | 'low';

export const DEFAULT_GAS_PRICES: { [key: number]: GasPrices } = {
    1: {
        instant: 23,
        fast: 17,
        standard: 13,
        low: 9,
    },
    3: {
        instant: 10,
        fast: 5,
        standard: 3,
        low: 1,
    },
    4: {
        instant: 10,
        fast: 5,
        standard: 3,
        low: 1,
    },
    1337: {
        instant: 1,
        fast: 1,
        standard: 1,
        low: 1,
    },
};

const options: GasPriceOracleOptions = {
    chainId: 1,
    defaultRpc: 'https://api.mycryptoapi.com/eth',
    timeout: 10000,
    defaultFallbackGasPrices: DEFAULT_GAS_PRICES[DEFAULT_CHAIN_ID],
};

export const SUBTRACT_GAS_LIMIT = 100000;

export const getDefaultOracle = (chainId = 1): GasPriceOracle => {
    options.defaultFallbackGasPrices = DEFAULT_GAS_PRICES[chainId];
    options.chainId = chainId;

    return new GasPriceOracle(options);
};

export const currentGasPrices = async (
    oracle?: GasPriceOracle,
    fallbackGasPrices?: GasPrices
) => {
    if (!oracle) {
        oracle = new GasPriceOracle(options);
    }

    if (!fallbackGasPrices) {
        fallbackGasPrices = oracle.configuration.defaultFallbackGasPrices;
    }

    if (oracle.configuration.chainId !== 1) {
        return fallbackGasPrices;
    }

    oracle
        .gasPrices(fallbackGasPrices)
        .then((gasPrices: GasPrices): GasPrices => {
            return gasPrices;
        });
};

export const estimateGasPrice = async (
    priceKey: GasPriceKey = 'fast',
    oracle?: GasPriceOracle,
    fallbackGasPrices?: GasPrices
): Promise<number | BigNumber> => {
    const prices = await currentGasPrices(oracle, fallbackGasPrices);

    if (!prices) {
        return DEFAULT_GAS_PRICES[DEFAULT_CHAIN_ID][priceKey];
    }
    const gweiPrice = prices[priceKey].toString();
    const weiPrice = utils.parseUnits(gweiPrice, 'gwei');

    return weiPrice;
};

export const estimateGasLimit = async (
    toAddress: string,
    value?: number,
    data?: BytesLike,
    signer?: Wallet
): Promise<number | BigNumber> => {
    if (!signer) {
        signer = mnemonicSigner();
        const provider = getProvider();

        signer = signer.connect(provider);
    }

    const tx: TxBase = {
        to: toAddress,
        value: value ? value : 0,
        data: data ? data : undefined,
    };

    const gasLimit = await signer.estimateGas(tx);
    return gasLimit;
};
