export default [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "dealId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "acceptedBy",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "payment",
          "type": "uint256"
        }
      ],
      "name": "EarlyTermination",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "dealId",
          "type": "bytes32"
        }
      ],
      "name": "Liquidate",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "dealId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "prevPV",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "currPV",
          "type": "uint256"
        }
      ],
      "name": "MarkToMarket",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "dealId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "currLender",
          "type": "address"
        }
      ],
      "name": "Novation",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "lender",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "borrower",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "ccy",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "term",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "notional",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "rate",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "dealId",
          "type": "bytes32"
        }
      ],
      "name": "Register",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "dealId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "rejectedBy",
          "type": "address"
        }
      ],
      "name": "RejectTermination",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "dealId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "requestedBy",
          "type": "address"
        }
      ],
      "name": "RequestTermination",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "loanId",
          "type": "bytes32"
        }
      ],
      "name": "acceptTermination",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_ccy",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "_term",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "addLendingMarket",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "loanId",
          "type": "bytes32"
        }
      ],
      "name": "getDealCurrency",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "party0",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "party1",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "loanId",
          "type": "bytes32"
        }
      ],
      "name": "getDealLastPV",
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
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "loanId",
          "type": "bytes32"
        }
      ],
      "name": "getDealPV",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "pv",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "loanId",
          "type": "bytes32"
        }
      ],
      "name": "getDealSettlementStatus",
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
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "loanId",
          "type": "bytes32"
        }
      ],
      "name": "getLastSettledPayment",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "settlementTime",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "loanId",
          "type": "bytes32"
        }
      ],
      "name": "getLoanDeal",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "lender",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "borrower",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "ccy",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "term",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "notional",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rate",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "start",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "end",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "pv",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "startTxHash",
              "type": "bytes32"
            }
          ],
          "internalType": "struct LoanV2.LoanDeal",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "loanId",
          "type": "bytes32"
        }
      ],
      "name": "getPaymentSchedule",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256[6]",
              "name": "payments",
              "type": "uint256[6]"
            },
            {
              "internalType": "uint256[6]",
              "name": "amounts",
              "type": "uint256[6]"
            },
            {
              "internalType": "bool[6]",
              "name": "isSettled",
              "type": "bool[6]"
            }
          ],
          "internalType": "struct IProductWithOneLeg.Schedule",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "loanId",
          "type": "bytes32"
        }
      ],
      "name": "getTerminationState",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "terminationAsker",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "terminationDate",
              "type": "uint256"
            }
          ],
          "internalType": "struct LoanV2.Termination",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getVersion",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isTransferable",
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
      "name": "last_loan_id",
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
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "lendingMarkets",
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
          "internalType": "bytes32",
          "name": "loanId",
          "type": "bytes32"
        }
      ],
      "name": "liquidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "loanId",
          "type": "bytes32"
        }
      ],
      "name": "markToMarket",
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
          "internalType": "bytes32",
          "name": "loanId",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "novation",
      "outputs": [],
      "stateMutability": "nonpayable",
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
          "name": "maker",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "taker",
          "type": "address"
        },
        {
          "internalType": "uint8",
          "name": "side",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "ccy",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "term",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "notional",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "rate",
          "type": "uint256"
        }
      ],
      "name": "register",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "loanId",
          "type": "bytes32"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "loanId",
          "type": "bytes32"
        }
      ],
      "name": "rejectTermination",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "loanId",
          "type": "bytes32"
        }
      ],
      "name": "requestTermination",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "setCollateralAddr",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "isAccepted",
          "type": "bool"
        }
      ],
      "name": "setIsTransferable",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "setLendingControllerAddr",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "setLiquidations",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "setPaymentAggregator",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "setTermStructure",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "settlementWindow",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
]