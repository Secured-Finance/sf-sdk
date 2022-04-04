export default [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint256',
                name: 'previousRatio',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'ratio',
                type: 'uint256',
            },
        ],
        name: 'AutoLiquidationThresholdUpdated',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'user',
                type: 'address',
            },
        ],
        name: 'CollateralUserAdded',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'user',
                type: 'address',
            },
        ],
        name: 'CollateralUserRemoved',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'vault',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'tokenAddress',
                type: 'address',
            },
        ],
        name: 'CollateralVaultLinked',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'vault',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'tokenAddress',
                type: 'address',
            },
        ],
        name: 'CollateralVaultRemoved',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'crosschainAddressResolver',
                type: 'address',
            },
        ],
        name: 'CrosschainAddressResolverUpdated',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'controller',
                type: 'address',
            },
        ],
        name: 'CurrencyControllerUpdated',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'liquidations',
                type: 'address',
            },
        ],
        name: 'LiquidationEngineUpdated',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint256',
                name: 'previousPrice',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
            },
        ],
        name: 'LiquidationPriceUpdated',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint256',
                name: 'previousRatio',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'ratio',
                type: 'uint256',
            },
        ],
        name: 'MarginCallThresholdUpdated',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint256',
                name: 'previousRatio',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
            },
        ],
        name: 'MinCollateralRatioUpdated',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'addr',
                type: 'address',
            },
        ],
        name: 'Register',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'partyA',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'partyB',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount0',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount1',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'bool',
                name: 'isSettled',
                type: 'bool',
            },
        ],
        name: 'Release',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'party',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'ReleaseUnsettled',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'partyA',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'partyB',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount0',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount1',
                type: 'uint256',
            },
        ],
        name: 'SettleCollateral',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'partyA',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'partyB',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'prevPV0',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'prevPV1',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'currentPV0',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'currentPV1',
                type: 'uint256',
            },
        ],
        name: 'UpdatePV',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'partyA',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'partyB',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount0',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount1',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'bool',
                name: 'isSettled',
                type: 'bool',
            },
        ],
        name: 'UseCollateral',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'party',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'UseUnsettledCollateral',
        type: 'event',
    },
    {
        inputs: [],
        name: 'AUTOLQLEVEL',
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
        name: 'LQLEVEL',
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
        name: 'MARGINLEVEL',
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
        name: 'MIN_COLLATERAL_RATIO',
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
                internalType: 'address',
                name: '_user',
                type: 'address',
            },
        ],
        name: 'addCollateralUser',
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
                internalType: 'address',
                name: 'addr',
                type: 'address',
            },
        ],
        name: 'checkRegisteredUser',
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
        name: 'crosschainAddressResolver',
        outputs: [
            {
                internalType: 'contract ICrosschainAddressResolver',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'currencyController',
        outputs: [
            {
                internalType: 'contract ICurrencyController',
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
                internalType: 'address',
                name: '_user',
                type: 'address',
            },
        ],
        name: 'enterVault',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_party0',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_party1',
                type: 'address',
            },
        ],
        name: 'enterVault',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_user',
                type: 'address',
            },
        ],
        name: 'exitVault',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_party0',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_party1',
                type: 'address',
            },
        ],
        name: 'exitVault',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'partyA',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'partyB',
                type: 'address',
            },
            {
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
        ],
        name: 'getCcyExposures',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
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
                internalType: 'address',
                name: '_party0',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_party1',
                type: 'address',
            },
        ],
        name: 'getCoverage',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
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
                internalType: 'address',
                name: 'partyA',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'partyB',
                type: 'address',
            },
        ],
        name: 'getExposedCurrencies',
        outputs: [
            {
                internalType: 'bytes32[]',
                name: '',
                type: 'bytes32[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_user',
                type: 'address',
            },
        ],
        name: 'getMaxCollateralBookWidthdraw',
        outputs: [
            {
                internalType: 'uint256',
                name: 'maxWithdraw',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_party0',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_party1',
                type: 'address',
            },
        ],
        name: 'getMaxCollateralWidthdraw',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
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
                internalType: 'address',
                name: '_party0',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_party1',
                type: 'address',
            },
        ],
        name: 'getNetAndTotalPV',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
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
                internalType: 'address',
                name: '_party0',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_party1',
                type: 'address',
            },
        ],
        name: 'getRebalanceCollateralAmounts',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
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
                internalType: 'address',
                name: '_user',
                type: 'address',
            },
        ],
        name: 'getTotalUnsettledExp',
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
                internalType: 'address',
                name: '_user',
                type: 'address',
            },
        ],
        name: 'getUnsettledCoverage',
        outputs: [
            {
                internalType: 'uint256',
                name: 'coverage',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'user',
                type: 'address',
            },
        ],
        name: 'getUsedVaults',
        outputs: [
            {
                internalType: 'address[]',
                name: '',
                type: 'address[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'party0',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'party1',
                type: 'address',
            },
        ],
        name: 'getUsedVaults',
        outputs: [
            {
                internalType: 'address[]',
                name: '',
                type: 'address[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_user',
                type: 'address',
            },
        ],
        name: 'isCollateralUser',
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
                internalType: 'address',
                name: '_vault',
                type: 'address',
            },
        ],
        name: 'isCollateralVault',
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
                internalType: 'address',
                name: '_party0',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_party1',
                type: 'address',
            },
            {
                internalType: 'bytes32',
                name: '_ccy',
                type: 'bytes32',
            },
            {
                internalType: 'uint256',
                name: '_party0PV',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '_party1PV',
                type: 'uint256',
            },
            {
                internalType: 'bool',
                name: '_isSettled',
                type: 'bool',
            },
        ],
        name: 'isCovered',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
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
                internalType: 'address',
                name: '_user',
                type: 'address',
            },
            {
                internalType: 'bytes32',
                name: '_ccy',
                type: 'bytes32',
            },
            {
                internalType: 'uint256',
                name: '_unsettledExp',
                type: 'uint256',
            },
        ],
        name: 'isCoveredUnsettled',
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
                internalType: 'address',
                name: '_vault',
                type: 'address',
            },
        ],
        name: 'linkCollateralVault',
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
                internalType: 'address',
                name: 'from',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'to',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'liquidationInETH',
                type: 'uint256',
            },
        ],
        name: 'liquidate',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'from',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'to',
                type: 'address',
            },
            {
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
            {
                internalType: 'uint256',
                name: 'liquidationAmount',
                type: 'uint256',
            },
            {
                internalType: 'bool',
                name: 'isSettled',
                type: 'bool',
            },
        ],
        name: 'liquidate',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'liquidationEngine',
        outputs: [
            {
                internalType: 'contract ILiquidations',
                name: '',
                type: 'address',
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
        inputs: [],
        name: 'register',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string[]',
                name: '_addresses',
                type: 'string[]',
            },
            {
                internalType: 'uint256[]',
                name: '_chainIds',
                type: 'uint256[]',
            },
        ],
        name: 'register',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'partyA',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'partyB',
                type: 'address',
            },
            {
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
            {
                internalType: 'uint256',
                name: 'amount0',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'amount1',
                type: 'uint256',
            },
            {
                internalType: 'bool',
                name: 'isSettled',
                type: 'bool',
            },
        ],
        name: 'releaseCollateral',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'user',
                type: 'address',
            },
            {
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'releaseUnsettledCollateral',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_user',
                type: 'address',
            },
        ],
        name: 'removeCollateralUser',
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
                internalType: 'address',
                name: '_vault',
                type: 'address',
            },
        ],
        name: 'removeCollateralVault',
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
                internalType: 'address',
                name: '_addr',
                type: 'address',
            },
        ],
        name: 'setCrosschainAddressResolver',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_addr',
                type: 'address',
            },
        ],
        name: 'setCurrencyController',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_addr',
                type: 'address',
            },
        ],
        name: 'setLiquidationEngine',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'partyA',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'partyB',
                type: 'address',
            },
            {
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
            {
                internalType: 'uint256',
                name: 'amount0',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'amount1',
                type: 'uint256',
            },
        ],
        name: 'settleCollateral',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        name: 'unsettledCollateral',
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
                internalType: 'uint256',
                name: '_ratio',
                type: 'uint256',
            },
        ],
        name: 'updateAutoLiquidationThreshold',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_price',
                type: 'uint256',
            },
        ],
        name: 'updateLiquidationPrice',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_marginCallRatio',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '_autoLiquidationThreshold',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '_liquidationPrice',
                type: 'uint256',
            },
        ],
        name: 'updateMainParameters',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_ratio',
                type: 'uint256',
            },
        ],
        name: 'updateMarginCallThreshold',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_ratio',
                type: 'uint256',
            },
        ],
        name: 'updateMinCollateralRatio',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'party0',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'party1',
                type: 'address',
            },
            {
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
            {
                internalType: 'uint256',
                name: 'prevPV0',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'prevPV1',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'currentPV0',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'currentPV1',
                type: 'uint256',
            },
        ],
        name: 'updatePV',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'partyA',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'partyB',
                type: 'address',
            },
            {
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
            {
                internalType: 'uint256',
                name: 'amount0',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'amount1',
                type: 'uint256',
            },
            {
                internalType: 'bool',
                name: 'isSettled',
                type: 'bool',
            },
        ],
        name: 'useCollateral',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'user',
                type: 'address',
            },
            {
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'useUnsettledCollateral',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];
