const ticTacToeAbi = [
    {
    "type": "function",
    "name": "acceptGame",
    "inputs": [
        {
        "name": "_newGameId",
        "type": "tuple",
        "internalType": "struct ICrossL2Inbox.Identifier",
        "components": [
            {
            "name": "origin",
            "type": "address",
            "internalType": "address"
            },
            {
            "name": "blockNumber",
            "type": "uint256",
            "internalType": "uint256"
            },
            {
            "name": "logIndex",
            "type": "uint256",
            "internalType": "uint256"
            },
            {
            "name": "timestamp",
            "type": "uint256",
            "internalType": "uint256"
            },
            {
            "name": "chainId",
            "type": "uint256",
            "internalType": "uint256"
            }
        ]
        },
        {
        "name": "_newGameData",
        "type": "bytes",
        "internalType": "bytes"
        }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
    },
    {
    "type": "function",
    "name": "gameState",
    "inputs": [
        {
        "name": "chainId",
        "type": "uint256",
        "internalType": "uint256"
        },
        {
        "name": "gameId",
        "type": "uint256",
        "internalType": "uint256"
        },
        {
        "name": "player",
        "type": "address",
        "internalType": "address"
        }
    ],
    "outputs": [
        {
        "name": "",
        "type": "tuple",
        "internalType": "struct TicTacToe.Game",
        "components": [
            {
            "name": "player",
            "type": "address",
            "internalType": "address"
            },
            {
            "name": "opponent",
            "type": "address",
            "internalType": "address"
            },
            {
            "name": "moves",
            "type": "uint8[3][3]",
            "internalType": "uint8[3][3]"
            },
            {
            "name": "movesLeft",
            "type": "uint8",
            "internalType": "uint8"
            },
            {
            "name": "lastId",
            "type": "tuple",
            "internalType": "struct ICrossL2Inbox.Identifier",
            "components": [
                {
                "name": "origin",
                "type": "address",
                "internalType": "address"
                },
                {
                "name": "blockNumber",
                "type": "uint256",
                "internalType": "uint256"
                },
                {
                "name": "logIndex",
                "type": "uint256",
                "internalType": "uint256"
                },
                {
                "name": "timestamp",
                "type": "uint256",
                "internalType": "uint256"
                },
                {
                "name": "chainId",
                "type": "uint256",
                "internalType": "uint256"
                }
            ]
            }
        ]
        }
    ],
    "stateMutability": "view"
    },
    {
    "type": "function",
    "name": "makeMove",
    "inputs": [
        {
        "name": "_movePlayedId",
        "type": "tuple",
        "internalType": "struct ICrossL2Inbox.Identifier",
        "components": [
            {
            "name": "origin",
            "type": "address",
            "internalType": "address"
            },
            {
            "name": "blockNumber",
            "type": "uint256",
            "internalType": "uint256"
            },
            {
            "name": "logIndex",
            "type": "uint256",
            "internalType": "uint256"
            },
            {
            "name": "timestamp",
            "type": "uint256",
            "internalType": "uint256"
            },
            {
            "name": "chainId",
            "type": "uint256",
            "internalType": "uint256"
            }
        ]
        },
        {
        "name": "_movePlayedData",
        "type": "bytes",
        "internalType": "bytes"
        },
        {
        "name": "_x",
        "type": "uint8",
        "internalType": "uint8"
        },
        {
        "name": "_y",
        "type": "uint8",
        "internalType": "uint8"
        }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
    },
    {
    "type": "function",
    "name": "newGame",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
    },
    {
    "type": "function",
    "name": "nextGameId",
    "inputs": [],
    "outputs": [
        {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
        }
    ],
    "stateMutability": "view"
    },
    {
    "type": "function",
    "name": "startGame",
    "inputs": [
        {
        "name": "_acceptedGameId",
        "type": "tuple",
        "internalType": "struct ICrossL2Inbox.Identifier",
        "components": [
            {
            "name": "origin",
            "type": "address",
            "internalType": "address"
            },
            {
            "name": "blockNumber",
            "type": "uint256",
            "internalType": "uint256"
            },
            {
            "name": "logIndex",
            "type": "uint256",
            "internalType": "uint256"
            },
            {
            "name": "timestamp",
            "type": "uint256",
            "internalType": "uint256"
            },
            {
            "name": "chainId",
            "type": "uint256",
            "internalType": "uint256"
            }
        ]
        },
        {
        "name": "_acceptedGameData",
        "type": "bytes",
        "internalType": "bytes"
        },
        {
        "name": "_x",
        "type": "uint8",
        "internalType": "uint8"
        },
        {
        "name": "_y",
        "type": "uint8",
        "internalType": "uint8"
        }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
    },
    {
    "type": "event",
    "name": "AcceptedGame",
    "inputs": [
        {
        "name": "chainId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
        },
        {
        "name": "gameId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
        },
        {
        "name": "opponent",
        "type": "address",
        "indexed": false,
        "internalType": "address"
        },
        {
        "name": "player",
        "type": "address",
        "indexed": false,
        "internalType": "address"
        }
    ],
    "anonymous": false
    },
    {
    "type": "event",
    "name": "GameDraw",
    "inputs": [
        {
        "name": "chainId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
        },
        {
        "name": "gameId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
        },
        {
        "name": "_x",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
        },
        {
        "name": "_y",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
        }
    ],
    "anonymous": false
    },
    {
    "type": "event",
    "name": "GameWon",
    "inputs": [
        {
        "name": "chainId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
        },
        {
        "name": "gameId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
        },
        {
        "name": "winner",
        "type": "address",
        "indexed": false,
        "internalType": "address"
        },
        {
        "name": "_x",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
        },
        {
        "name": "_y",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
        }
    ],
    "anonymous": false
    },
    {
    "type": "event",
    "name": "MovePlayed",
    "inputs": [
        {
        "name": "chainId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
        },
        {
        "name": "gameId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
        },
        {
        "name": "player",
        "type": "address",
        "indexed": false,
        "internalType": "address"
        },
        {
        "name": "_x",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
        },
        {
        "name": "_y",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
        }
    ],
    "anonymous": false
    },
    {
    "type": "event",
    "name": "NewGame",
    "inputs": [
        {
        "name": "chainId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
        },
        {
        "name": "gameId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
        },
        {
        "name": "player",
        "type": "address",
        "indexed": false,
        "internalType": "address"
        }
    ],
    "anonymous": false
    },
    {
    "type": "error",
    "name": "DataNotAcceptedGame",
    "inputs": []
    },
    {
    "type": "error",
    "name": "DataNotMovePlayed",
    "inputs": []
    },
    {
    "type": "error",
    "name": "DataNotNewGame",
    "inputs": []
    },
    {
    "type": "error",
    "name": "GameChainMismatch",
    "inputs": []
    },
    {
    "type": "error",
    "name": "GameNotExists",
    "inputs": []
    },
    {
    "type": "error",
    "name": "GameStarted",
    "inputs": []
    },
    {
    "type": "error",
    "name": "IdOriginNotTicTacToe",
    "inputs": []
    },
    {
    "type": "error",
    "name": "MoveInvalid",
    "inputs": []
    },
    {
    "type": "error",
    "name": "MoveNotForwardProgressing",
    "inputs": []
    },
    {
    "type": "error",
    "name": "MoveTaken",
    "inputs": []
    },
    {
    "type": "error",
    "name": "SenderIsOpponent",
    "inputs": []
    },
    {
    "type": "error",
    "name": "SenderNotPlayer",
    "inputs": []
    }
]

export default ticTacToeAbi;