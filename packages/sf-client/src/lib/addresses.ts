import { DEFAULT_ADDRESS } from '../utils/constants';

export interface ContractAddresses {
    collateralAggregator: string;
    loan: string;
    lendingMarketController: string;
    currencyController: string;
    closeOutNetting: string;
    paymentAggregator: string;
    productAddressResolver: string;
    markToMarket: string;
    termStructure: string;
}

const MAINNET_ADDRESSES: ContractAddresses = {
    collateralAggregator: DEFAULT_ADDRESS,
    loan: DEFAULT_ADDRESS,
    lendingMarketController: DEFAULT_ADDRESS,
    currencyController: DEFAULT_ADDRESS,
    closeOutNetting: DEFAULT_ADDRESS,
    paymentAggregator: DEFAULT_ADDRESS,
    productAddressResolver: DEFAULT_ADDRESS,
    markToMarket: DEFAULT_ADDRESS,
    termStructure: DEFAULT_ADDRESS,
};

const ROPSTEN_ADDRESSES: ContractAddresses = {
    collateralAggregator: DEFAULT_ADDRESS,
    loan: DEFAULT_ADDRESS,
    lendingMarketController: DEFAULT_ADDRESS,
    currencyController: DEFAULT_ADDRESS,
    closeOutNetting: DEFAULT_ADDRESS,
    paymentAggregator: DEFAULT_ADDRESS,
    productAddressResolver: DEFAULT_ADDRESS,
    markToMarket: DEFAULT_ADDRESS,
    termStructure: DEFAULT_ADDRESS,
};

const LOCALHOST_ADDRESSES: ContractAddresses = {
    collateralAggregator: DEFAULT_ADDRESS,
    loan: DEFAULT_ADDRESS,
    lendingMarketController: DEFAULT_ADDRESS,
    currencyController: DEFAULT_ADDRESS,
    closeOutNetting: DEFAULT_ADDRESS,
    paymentAggregator: DEFAULT_ADDRESS,
    productAddressResolver: DEFAULT_ADDRESS,
    markToMarket: DEFAULT_ADDRESS,
    termStructure: DEFAULT_ADDRESS,
};

export const addresses: { [key: number]: ContractAddresses } = {
    1: MAINNET_ADDRESSES,
    3: ROPSTEN_ADDRESSES,
    1337: LOCALHOST_ADDRESSES,
};
