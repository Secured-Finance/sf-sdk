export default [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_productResolver",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
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
          "internalType": "bytes32",
          "name": "dealId",
          "type": "bytes32"
        }
      ],
      "name": "updatePV",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32[]",
          "name": "dealIds",
          "type": "bytes32[]"
        }
      ],
      "name": "updatePVs",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
]