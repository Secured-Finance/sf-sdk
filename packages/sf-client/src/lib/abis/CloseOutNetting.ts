export default [
    {
        inputs: [
            {
                internalType: 'address',
                name: '_paymentAggregator',
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
                indexed: true,
                internalType: 'address',
                name: 'party0',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'party1',
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
                name: 'payment0',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'payment1',
                type: 'uint256',
            },
        ],
        name: 'AddCloseOutPayments',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'party0',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'party1',
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
                name: 'payment0',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'payment1',
                type: 'uint256',
            },
        ],
        name: 'RemoveCloseOutPayments',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'party0',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'party1',
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
                name: 'netPayment',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'txHash',
                type: 'bytes32',
            },
        ],
        name: 'SettleCloseOut',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'prevAddr',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'addr',
                type: 'address',
            },
        ],
        name: 'UpdateCollateralAggregator',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'prevAddr',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'addr',
                type: 'address',
            },
        ],
        name: 'UpdatePaymentAggregator',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'party0',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'party1',
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
                name: 'netPayment',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'txHash',
                type: 'bytes32',
            },
        ],
        name: 'VerifyCloseOut',
        type: 'event',
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
                name: 'payment0',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'payment1',
                type: 'uint256',
            },
        ],
        name: 'addPayments',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_party',
                type: 'address',
            },
        ],
        name: 'checkDefault',
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
        ],
        name: 'getCloseOutPayment',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'netPayment',
                        type: 'uint256',
                    },
                    {
                        internalType: 'bool',
                        name: 'flipped',
                        type: 'bool',
                    },
                    {
                        internalType: 'bool',
                        name: 'closed',
                        type: 'bool',
                    },
                ],
                internalType: 'struct CloseOut.Payment',
                name: 'payment',
                type: 'tuple',
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
                name: 'payment0',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'payment1',
                type: 'uint256',
            },
        ],
        name: 'removePayments',
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
        name: 'updateCollateralAggregator',
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
        name: 'updatePaymentAggregator',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];
