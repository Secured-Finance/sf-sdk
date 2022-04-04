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
    crosschainAddressResolver: string;
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
    crosschainAddressResolver: DEFAULT_ADDRESS,
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
    crosschainAddressResolver: DEFAULT_ADDRESS,
};

const LOCALHOST_ADDRESSES: ContractAddresses = {
    collateralAggregator: '0x3A622a4a83b832D422529185596F97cf1E718820',
    loan: '0x71c5fb4914e5D9F1756F6F9Bef320020145E6f76',
    lendingMarketController: '0xfF57Ea13383B4284f749F718a889Af922B00B1a0',
    currencyController: '0xD5A3b0b7E1Bcd00260e644D623cacc625690c813',
    closeOutNetting: '0x24de19E5A9A7b1089Fd27662A4CB8579B887290a',
    paymentAggregator: '0xC904506d6C52676d7A2572c5C76cb6bD3B33B58e',
    productAddressResolver: '0x674e55dEFfef3d6621Af83fB2F8BEB10D5e96Cf9',
    markToMarket: DEFAULT_ADDRESS,
    termStructure: '0xBb9c1fe31BF38B87727197e6fdFe84a45F132431',
    crosschainAddressResolver: '0x9623EdC69b56FfED2928a2500aD7DD6f974Afa92',
};

export const addresses: { [key: number]: ContractAddresses } = {
    1: MAINNET_ADDRESSES,
    3: ROPSTEN_ADDRESSES,
    1337: LOCALHOST_ADDRESSES,
};
