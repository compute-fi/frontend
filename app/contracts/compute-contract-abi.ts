export const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "id",
                "type": "bytes32"
            }
        ],
        "name": "ChainlinkCancelled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "id",
                "type": "bytes32"
            }
        ],
        "name": "ChainlinkFulfilled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "id",
                "type": "bytes32"
            }
        ],
        "name": "ChainlinkRequested",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferRequested",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "requestId",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "string",
                "name": "receivedID",
                "type": "string"
            }
        ],
        "name": "RequestComputeFulfilled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "requestDate",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "status",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "computeTime",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "fee",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "string",
                "name": "computeID",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "logCID",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "transactionHash",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "caller",
                "type": "address"
            }
        ],
        "name": "TransactionUpdated",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "acceptOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_computeID",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_computeTime",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_logCID",
                "type": "string"
            }
        ],
        "name": "addTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_oracle",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_jobId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_fileUrl",
                "type": "string"
            }
        ],
        "name": "callAPI",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_oracle",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_jobId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_computeID",
                "type": "string"
            }
        ],
        "name": "callLogAPI",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_oracle",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_jobId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_computeID",
                "type": "string"
            }
        ],
        "name": "callStatus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_requestId",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "_payment",
                "type": "uint256"
            },
            {
                "internalType": "bytes4",
                "name": "_callbackFunctionId",
                "type": "bytes4"
            },
            {
                "internalType": "uint256",
                "name": "_expiration",
                "type": "uint256"
            }
        ],
        "name": "cancelRequest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "computeBalances",
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
        "inputs": [],
        "name": "computePrice",
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
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "computeTransactions",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "requestDate",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "status",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "computeTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "fee",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "computeID",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "logCID",
                "type": "string"
            },
            {
                "internalType": "bytes32",
                "name": "transactionHash",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "caller",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "currentFolderID",
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
        "name": "currentLogCID",
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
        "name": "currentStatus",
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
        "name": "currentTransactionHash",
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
                "internalType": "bytes32",
                "name": "_requestId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "_receivedID",
                "type": "string"
            }
        ],
        "name": "fulfillComputeRequest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_requestId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "_receivedID",
                "type": "string"
            }
        ],
        "name": "fulfillLogRequest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_requestId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "_receivedID",
                "type": "string"
            }
        ],
        "name": "fulfillStatusRequest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getChainlinkToken",
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
                "internalType": "uint256",
                "name": "_price",
                "type": "uint256"
            }
        ],
        "name": "setComputePrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_computeID",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_status",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_logCID",
                "type": "string"
            }
        ],
        "name": "updateTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdrawLink",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
];