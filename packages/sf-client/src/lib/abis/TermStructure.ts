export default [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_currencyController",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_productAddressResolver",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "oldOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnerChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "numDays",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes4",
          "name": "product",
          "type": "bytes4"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "_ccy",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isSupported",
          "type": "bool"
        }
      ],
      "name": "ProductTermSupportUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "numDays",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "dfFrac",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "numPayments",
          "type": "uint256"
        }
      ],
      "name": "TermAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "numDays",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isSupported",
          "type": "bool"
        }
      ],
      "name": "TermSupportUpdated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_numDays",
          "type": "uint256"
        }
      ],
      "name": "getDfFrac",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_numDays",
          "type": "uint256"
        }
      ],
      "name": "getNumDays",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_numDays",
          "type": "uint256"
        }
      ],
      "name": "getNumPayments",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_numDays",
          "type": "uint256"
        }
      ],
      "name": "getTerm",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_numDays",
          "type": "uint256"
        }
      ],
      "name": "getTermSchedule",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "_product",
          "type": "bytes4"
        },
        {
          "internalType": "bytes32",
          "name": "_ccy",
          "type": "bytes32"
        },
        {
          "internalType": "bool",
          "name": "sort",
          "type": "bool"
        }
      ],
      "name": "getTermsForProductAndCcy",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_numDays",
          "type": "uint256"
        },
        {
          "internalType": "bytes4",
          "name": "_product",
          "type": "bytes4"
        },
        {
          "internalType": "bytes32",
          "name": "_ccy",
          "type": "bytes32"
        }
      ],
      "name": "isSupportedTerm",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "last_term_index",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_currencyController",
          "type": "address"
        }
      ],
      "name": "setCurrencyController",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "setOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_numDays",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_dfFrac",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_numPayments",
          "type": "uint256"
        },
        {
          "internalType": "uint256[]",
          "name": "_couponSchedule",
          "type": "uint256[]"
        },
        {
          "internalType": "bytes4[]",
          "name": "_products",
          "type": "bytes4[]"
        },
        {
          "internalType": "bytes32[]",
          "name": "_currencies",
          "type": "bytes32[]"
        }
      ],
      "name": "supportTerm",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_numDays",
          "type": "uint256"
        },
        {
          "internalType": "bytes4",
          "name": "_product",
          "type": "bytes4"
        },
        {
          "internalType": "bytes32",
          "name": "_ccy",
          "type": "bytes32"
        },
        {
          "internalType": "bool",
          "name": "_isSupported",
          "type": "bool"
        }
      ],
      "name": "updateTermSupport",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
]