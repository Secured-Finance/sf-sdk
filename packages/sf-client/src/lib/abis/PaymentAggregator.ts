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
                internalType: 'bytes32',
                name: 'timeSlot',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'year',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'month',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'day',
                type: 'uint256',
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
        name: 'RegisterPayment',
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
                internalType: 'bytes32',
                name: 'timeSlot',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'year',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'month',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'day',
                type: 'uint256',
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
        name: 'RemovePayment',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'verifier',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'counterparty',
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
                internalType: 'bytes32',
                name: 'timeSlot',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'year',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'month',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'day',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'settlementId',
                type: 'bytes32',
            },
        ],
        name: 'SettlePayment',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'prevContract',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'closeOutNetting',
                type: 'address',
            },
        ],
        name: 'UpdateCloseOutNetting',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'prevContract',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'closeOutNetting',
                type: 'address',
            },
        ],
        name: 'UpdateMarkToMarket',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'prevContract',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'settlementEngine',
                type: 'address',
            },
        ],
        name: 'UpdateSettlementEngine',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'verifier',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'counterparty',
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
                internalType: 'bytes32',
                name: 'timeSlot',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'year',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'month',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'day',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'payment',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'settlementId',
                type: 'bytes32',
            },
        ],
        name: 'VerifyPayment',
        type: 'event',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_user',
                type: 'address',
            },
        ],
        name: 'addPaymentAggregatorUser',
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
                name: 'targetTime',
                type: 'uint256',
            },
        ],
        name: 'checkSettlementWindow',
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
            {
                internalType: 'bytes32',
                name: 'slotPosition',
                type: 'bytes32',
            },
        ],
        name: 'getDealsFromSlot',
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
                name: 'year',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'month',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'day',
                type: 'uint256',
            },
        ],
        name: 'getTimeSlotByDate',
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
                internalType: 'bytes32',
                name: 'slot',
                type: 'bytes32',
            },
        ],
        name: 'getTimeSlotBySlotId',
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
                name: 'year',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'month',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'day',
                type: 'uint256',
            },
            {
                internalType: 'bytes32',
                name: 'settlementId',
                type: 'bytes32',
            },
        ],
        name: 'getTimeSlotPaymentConfirmation',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
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
                internalType: 'bytes32',
                name: 'slot',
                type: 'bytes32',
            },
            {
                internalType: 'bytes32',
                name: 'settlementId',
                type: 'bytes32',
            },
        ],
        name: 'getTimeSlotPaymentConfirmationById',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
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
        name: 'isPaymentAggregatorUser',
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
            {
                internalType: 'uint256',
                name: 'timestamp',
                type: 'uint256',
            },
        ],
        name: 'isSettled',
        outputs: [
            {
                internalType: 'bool',
                name: 'status',
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
                internalType: 'bytes32',
                name: 'dealId',
                type: 'bytes32',
            },
            {
                internalType: 'uint256[]',
                name: 'timestamps',
                type: 'uint256[]',
            },
            {
                internalType: 'uint256[]',
                name: 'payments0',
                type: 'uint256[]',
            },
            {
                internalType: 'uint256[]',
                name: 'payments1',
                type: 'uint256[]',
            },
        ],
        name: 'registerPayments',
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
        name: 'removePaymentAggregatorUser',
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
                internalType: 'bytes32',
                name: 'dealId',
                type: 'bytes32',
            },
            {
                internalType: 'uint256[]',
                name: 'timestamps',
                type: 'uint256[]',
            },
            {
                internalType: 'uint256[]',
                name: 'payments0',
                type: 'uint256[]',
            },
            {
                internalType: 'uint256[]',
                name: 'payments1',
                type: 'uint256[]',
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
                name: '_contract',
                type: 'address',
            },
        ],
        name: 'setCloseOutNetting',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_contract',
                type: 'address',
            },
        ],
        name: 'setMarkToMarket',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_contract',
                type: 'address',
            },
        ],
        name: 'setSettlementEngine',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'settlementWindow',
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
                name: 'verifier',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'counterparty',
                type: 'address',
            },
            {
                internalType: 'bytes32',
                name: 'ccy',
                type: 'bytes32',
            },
            {
                internalType: 'uint256',
                name: 'timestamp',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'payment',
                type: 'uint256',
            },
            {
                internalType: 'bytes32',
                name: 'settlementId',
                type: 'bytes32',
            },
        ],
        name: 'verifyPayment',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];
