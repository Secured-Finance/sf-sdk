import { DEFAULT_ADDRESS } from "../utils/constants";

export interface ContractAddresses {
    collateralAggregator: string,
    loan: string,
    lendingMarketController: string,
}

const MAINNET_ADDRESSES: ContractAddresses = {
    collateralAggregator: DEFAULT_ADDRESS,
    loan: DEFAULT_ADDRESS,
    lendingMarketController: DEFAULT_ADDRESS,
};

const ROPSTEN_ADDRESSES: ContractAddresses = {
    collateralAggregator: DEFAULT_ADDRESS,
    loan: DEFAULT_ADDRESS,
    lendingMarketController: DEFAULT_ADDRESS,
};

const LOCALHOST_ADDRESSES: ContractAddresses = {
    collateralAggregator: DEFAULT_ADDRESS,
    loan: DEFAULT_ADDRESS,
    lendingMarketController: DEFAULT_ADDRESS,
};

export const addresses:{[key: number]: ContractAddresses}  = {
    1: MAINNET_ADDRESSES,
    3: ROPSTEN_ADDRESSES,
    1337: LOCALHOST_ADDRESSES,
};