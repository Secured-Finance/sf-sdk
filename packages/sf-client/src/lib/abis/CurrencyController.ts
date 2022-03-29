export default [
    {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'name',
                type: 'string',
            },
            {
                indexed: false,
                internalType: 'uint16',
                name: 'chainId',
                type: 'uint16',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'ltv',
                type: 'uint256',
            },
        ],
        name: 'CcyAdded',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'bool',
                name: 'isCollateral',
                type: 'bool',
            },
        ],
        name: 'CcyCollateralUpdate',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'bool',
                name: 'isSupported',
                type: 'bool',
            },
        ],
        name: 'CcySupportUpdate',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'ltv',
                type: 'uint256',
            },
        ],
        name: 'LTVUpdated',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'minMargin',
                type: 'uint256',
            },
        ],
        name: 'MinMarginUpdated',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'oldOwner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'OwnerChanged',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'secondCcy',
                type: 'string',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'priceFeed',
                type: 'address',
            },
        ],
        name: 'PriceFeedAdded',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'secondCcy',
                type: 'string',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'priceFeed',
                type: 'address',
            },
        ],
        name: 'PriceFeedRemoved',
        type: 'event',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_ccy',
                type: 'bytes32',
            },
            {
                internalType: 'uint256[]',
                name: '_amounts',
                type: 'uint256[]',
            },
        ],
        name: 'convertBulkToETH',
        outputs: [
            {
                internalType: 'uint256[]',
                name: '',
                type: 'uint256[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_ccy',
                type: 'bytes32',
            },
            {
                internalType: 'uint256',
                name: '_amountETH',
                type: 'uint256',
            },
        ],
        name: 'convertFromETH',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_ccy',
                type: 'bytes32',
            },
            {
                internalType: 'uint256',
                name: '_amount',
                type: 'uint256',
            },
        ],
        name: 'convertToETH',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        name: 'currencies',
        outputs: [
            {
                internalType: 'bool',
                name: 'isSupported',
                type: 'bool',
            },
            {
                internalType: 'string',
                name: 'name',
                type: 'string',
            },
            {
                internalType: 'uint16',
                name: 'chainId',
                type: 'uint16',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        name: 'ethDecimals',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        name: 'ethPriceFeeds',
        outputs: [
            {
                internalType: 'contract AggregatorV3Interface',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_ccy',
                type: 'bytes32',
            },
            {
                internalType: 'uint80',
                name: '_roundId',
                type: 'uint80',
            },
        ],
        name: 'getHistoricalETHPrice',
        outputs: [
            {
                internalType: 'int256',
                name: '',
                type: 'int256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_ccy',
                type: 'bytes32',
            },
            {
                internalType: 'uint80',
                name: '_roundId',
                type: 'uint80',
            },
        ],
        name: 'getHistoricalUSDPrice',
        outputs: [
            {
                internalType: 'int256',
                name: '',
                type: 'int256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_ccy',
                type: 'bytes32',
            },
        ],
        name: 'getLTV',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_ccy',
                type: 'bytes32',
            },
        ],
        name: 'getLastETHPrice',
        outputs: [
            {
                internalType: 'int256',
                name: '',
                type: 'int256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_ccy',
                type: 'bytes32',
            },
        ],
        name: 'getLastUSDPrice',
        outputs: [
            {
                internalType: 'int256',
                name: '',
                type: 'int256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_ccy',
                type: 'bytes32',
            },
        ],
        name: 'getMinMargin',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        name: 'isCollateral',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_ccy',
                type: 'bytes32',
            },
        ],
        name: 'isSupportedCcy',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'last_ccy_index',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_ccy',
                type: 'bytes32',
            },
            {
                internalType: 'address',
                name: '_priceFeedAddr',
                type: 'address',
            },
            {
                internalType: 'bool',
                name: '_isEthPriceFeed',
                type: 'bool',
            },
        ],
        name: 'linkPriceFeed',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        name: 'ltvs',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        name: 'minMargins',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'owner',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_ccy',
                type: 'bytes32',
            },
            {
                internalType: 'bool',
                name: '_isEthPriceFeed',
                type: 'bool',
            },
        ],
        name: 'removePriceFeed',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_owner',
                type: 'address',
            },
        ],
        name: 'setOwner',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_ccy',
                type: 'bytes32',
            },
            {
                internalType: 'string',
                name: '_name',
                type: 'string',
            },
            {
                internalType: 'uint16',
                name: '_chainId',
                type: 'uint16',
            },
            {
                internalType: 'address',
                name: '_ethPriceFeed',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '_ltv',
                type: 'uint256',
            },
        ],
        name: 'supportCurrency',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'supportedCurrencies',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_ccy',
                type: 'bytes32',
            },
            {
                internalType: 'uint256',
                name: '_ltv',
                type: 'uint256',
            },
        ],
        name: 'updateCcyLTV',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_ccy',
                type: 'bytes32',
            },
            {
                internalType: 'bool',
                name: '_isSupported',
                type: 'bool',
            },
        ],
        name: 'updateCollateralSupport',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_ccy',
                type: 'bytes32',
            },
            {
                internalType: 'bool',
                name: '_isSupported',
                type: 'bool',
            },
        ],
        name: 'updateCurrencySupport',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_ccy',
                type: 'bytes32',
            },
            {
                internalType: 'uint256',
                name: '_minMargin',
                type: 'uint256',
            },
        ],
        name: 'updateMinMargin',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        name: 'usdDecimals',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        name: 'usdPriceFeeds',
        outputs: [
            {
                internalType: 'contract AggregatorV3Interface',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
];
