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
    collateralAggregator: '0x74B405Ec5dC45e5c7ea9d581D4A3907e60B724d4',
    loan: '0x884254b0fc1e7bF2fE14177CFd63fd4f50a93528',
    lendingMarketController: '0x80143B3C92b635cF8A5892899a6634eEE731cff5',
    currencyController: '0x8682Fa83785B7F51A14101122CCb1DCb4A247B80',
    closeOutNetting: '0xB26348D051da2dd8AE9402b3E3060A48F632114e',
    paymentAggregator: '0xbf5c6641ab47307F48Ca74644011B8a76e37241b',
    productAddressResolver: '0x3Bb006345DA94AA05BEBD0Ec70CBe6f28A017cEe',
    markToMarket: DEFAULT_ADDRESS,
    termStructure: '0xB6AD6A3a356f208832e46aF4409e59B53287E44E',
    crosschainAddressResolver: '0x93E72CE258eB0a47aC0de06f012162afa5D84f15',
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
