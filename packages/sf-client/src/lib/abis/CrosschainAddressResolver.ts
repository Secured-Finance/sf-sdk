export default [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_collateralAggregator",
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
          "indexed": false,
          "internalType": "address",
          "name": "_user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_chainId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_address",
          "type": "string"
        }
      ],
      "name": "UpdateAddress",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_chainId",
          "type": "uint256"
        }
      ],
      "name": "getUserAddress",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
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
          "name": "_user",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_chainId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_address",
          "type": "string"
        }
      ],
      "name": "updateAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_chainId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_address",
          "type": "string"
        }
      ],
      "name": "updateAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        },
        {
          "internalType": "uint256[]",
          "name": "_chainIds",
          "type": "uint256[]"
        },
        {
          "internalType": "string[]",
          "name": "_addresses",
          "type": "string[]"
        }
      ],
      "name": "updateAddresses",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
]