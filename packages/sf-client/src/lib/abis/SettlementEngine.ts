export default [
    {
        inputs: [
            {
                internalType: 'address',
                name: '_paymentAggregator',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_currencyController',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_crosschainResolver',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_WETH9',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'string',
                name: 'payer',
                type: 'string',
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'receiver',
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
                name: 'amount',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'timestamp',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'txHash',
                type: 'string',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'settlementId',
                type: 'bytes32',
            },
        ],
        name: 'CrosschainSettlementRequestFulfilled',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'payer',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'receiver',
                type: 'address',
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
                name: 'timestamp',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'txHash',
                type: 'string',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'requestId',
                type: 'bytes32',
            },
        ],
        name: 'CrosschainSettlementRequested',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'adapter',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
        ],
        name: 'ExternalAdapterAdded',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'adapter',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
        ],
        name: 'ExternalAdapterUpdated',
        type: 'event',
    },
    {
        inputs: [],
        name: 'WETH9',
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
                internalType: 'address',
                name: '_adapter',
                type: 'address',
            },
            {
                internalType: 'bytes32',
                name: '_ccy',
                type: 'bytes32',
            },
        ],
        name: 'addExternalAdapter',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint16',
                name: '',
                type: 'uint16',
            },
        ],
        name: 'externalAdapters',
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
                name: '_requestId',
                type: 'bytes32',
            },
            {
                components: [
                    {
                        internalType: 'string',
                        name: 'from',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: 'to',
                        type: 'string',
                    },
                    {
                        internalType: 'uint256',
                        name: 'value',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'timestamp',
                        type: 'uint256',
                    },
                    {
                        internalType: 'string',
                        name: 'txHash',
                        type: 'string',
                    },
                ],
                internalType: 'struct IExternalAdapterTxResponse.FulfillData',
                name: '_txData',
                type: 'tuple',
            },
            {
                internalType: 'bytes32',
                name: '_ccy',
                type: 'bytes32',
            },
        ],
        name: 'fullfillSettlementRequest',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getVersion',
        outputs: [
            {
                internalType: 'uint16',
                name: '',
                type: 'uint16',
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
                internalType: 'address',
                name: '_adapter',
                type: 'address',
            },
            {
                internalType: 'bytes32',
                name: '_ccy',
                type: 'bytes32',
            },
        ],
        name: 'replaceExternalAdapter',
        outputs: [],
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
        name: 'settlementRequests',
        outputs: [
            {
                internalType: 'address',
                name: 'payer',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'receiver',
                type: 'address',
            },
            {
                internalType: 'uint16',
                name: 'chainId',
                type: 'uint16',
            },
            {
                internalType: 'uint256',
                name: 'timestamp',
                type: 'uint256',
            },
            {
                internalType: 'string',
                name: 'txHash',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_counterparty',
                type: 'address',
            },
            {
                internalType: 'bytes32',
                name: '_ccy',
                type: 'bytes32',
            },
            {
                internalType: 'uint256',
                name: '_payment',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '_timestamp',
                type: 'uint256',
            },
            {
                internalType: 'string',
                name: '_txHash',
                type: 'string',
            },
        ],
        name: 'verifyPayment',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        stateMutability: 'payable',
        type: 'receive',
    },
];