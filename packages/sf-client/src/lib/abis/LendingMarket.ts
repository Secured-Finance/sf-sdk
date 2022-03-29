export default [
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_ccy',
                type: 'bytes32',
            },
            {
                internalType: 'uint256',
                name: '_term',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: '_lendingController',
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
                internalType: 'uint256',
                name: 'orderId',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'maker',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'enum ProtocolTypes.Side',
                name: 'side',
                type: 'uint8',
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
                name: 'rate',
                type: 'uint256',
            },
        ],
        name: 'CancelOrder',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint256',
                name: 'orderId',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'maker',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'enum ProtocolTypes.Side',
                name: 'side',
                type: 'uint8',
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
                name: 'term',
                type: 'uint256',
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
                name: 'rate',
                type: 'uint256',
            },
        ],
        name: 'MakeOrder',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'Paused',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint256',
                name: 'orderId',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'taker',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'enum ProtocolTypes.Side',
                name: 'side',
                type: 'uint8',
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
                name: 'rate',
                type: 'uint256',
            },
        ],
        name: 'TakeOrder',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'Unpaused',
        type: 'event',
    },
    {
        inputs: [],
        name: 'MarketCcy',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'MarketTerm',
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
                name: 'orderId',
                type: 'uint256',
            },
        ],
        name: 'cancelOrder',
        outputs: [
            {
                internalType: 'bool',
                name: 'success',
                type: 'bool',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getBorrowRate',
        outputs: [
            {
                internalType: 'uint256',
                name: 'rate',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getLendRate',
        outputs: [
            {
                internalType: 'uint256',
                name: 'rate',
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
                name: 'orderId',
                type: 'uint256',
            },
        ],
        name: 'getMaker',
        outputs: [
            {
                internalType: 'address',
                name: 'maker',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getMidRate',
        outputs: [
            {
                internalType: 'uint256',
                name: 'rate',
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
                name: 'orderId',
                type: 'uint256',
            },
        ],
        name: 'getOrder',
        outputs: [
            {
                components: [
                    {
                        internalType: 'enum ProtocolTypes.Side',
                        name: 'side',
                        type: 'uint8',
                    },
                    {
                        internalType: 'uint256',
                        name: 'amount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'rate',
                        type: 'uint256',
                    },
                    {
                        internalType: 'address',
                        name: 'maker',
                        type: 'address',
                    },
                ],
                internalType: 'struct LendingMarket.MarketOrder',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'orderId',
                type: 'uint256',
            },
        ],
        name: 'getOrderFromTree',
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
        name: 'last_order_id',
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
        name: 'lendingController',
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
                internalType: 'enum ProtocolTypes.Side',
                name: 'side',
                type: 'uint8',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'rate',
                type: 'uint256',
            },
        ],
        name: 'matchOrders',
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
                internalType: 'enum ProtocolTypes.Side',
                name: 'side',
                type: 'uint8',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'rate',
                type: 'uint256',
            },
        ],
        name: 'order',
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
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'orders',
        outputs: [
            {
                internalType: 'enum ProtocolTypes.Side',
                name: 'side',
                type: 'uint8',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'rate',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'maker',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'pauseMarket',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'paused',
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
                name: 'colAddr',
                type: 'address',
            },
        ],
        name: 'setCollateral',
        outputs: [],
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
        name: 'setLoan',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'unpauseMarket',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];
