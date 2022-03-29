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
                indexed: false,
                internalType: 'bytes4',
                name: 'prefix',
                type: 'bytes4',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'product',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'controller',
                type: 'address',
            },
        ],
        name: 'RegisterProduct',
        type: 'event',
    },
    {
        inputs: [
            {
                internalType: 'bytes4',
                name: '_prefix',
                type: 'bytes4',
            },
        ],
        name: 'getControllerContract',
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
                name: '_dealId',
                type: 'bytes32',
            },
        ],
        name: 'getControllerContractByDealId',
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
                internalType: 'bytes4',
                name: '_prefix',
                type: 'bytes4',
            },
        ],
        name: 'getProductContract',
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
                name: '_dealId',
                type: 'bytes32',
            },
        ],
        name: 'getProductContractByDealId',
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
                internalType: 'bytes4',
                name: '_prefix',
                type: 'bytes4',
            },
        ],
        name: 'isSupportedProduct',
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
                name: '_dealId',
                type: 'bytes32',
            },
        ],
        name: 'isSupportedProductByDealId',
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
                internalType: 'bytes4',
                name: '_prefix',
                type: 'bytes4',
            },
            {
                internalType: 'address',
                name: '_contract',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_controller',
                type: 'address',
            },
        ],
        name: 'registerProduct',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes4[]',
                name: '_prefixes',
                type: 'bytes4[]',
            },
            {
                internalType: 'address[]',
                name: '_contracts',
                type: 'address[]',
            },
            {
                internalType: 'address[]',
                name: '_controllers',
                type: 'address[]',
            },
        ],
        name: 'registerProducts',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];
