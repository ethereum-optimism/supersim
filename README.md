# Supersim
A local development environment for testing against multiple nodes running simultaneously.

## Table of Contents
- [Supersim](#supersim)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Getting started](#getting-started)
    - [Running Locally](#running-locally)
  - [Features](#features)
    - [Vanilla mode](#vanilla-mode)
    - [Forked mode](#forked-mode)
      - [Enabling Interop in Fork Mode](#enabling-interop-in-fork-mode)
  - [Examples](#examples)
  - [SuperchainERC20](#superchainerc20)
    - [L2NativeSuperchainERC20](#l2nativesuperchainerc20)
      - [Minting new tokens](#minting-new-tokens)
    - [OptimismSuperchainERC20](#optimismsuperchainerc20)
  - [Join Discord](#join-discord)
  - [Contributing](#contributing)
  - [License](#license)

## Overview
Supersim allows developers to start multiple local evm nodes with one command, and coordinates message passing and asset transfer between these chains, following the Superchain interoperability spec.

Supersim is a lightweight tool that simulates an interoperable Superchain environment locally. It does not require a complicated devnet setup and is run using cli commands with configuration options that fall back to sensible defaults if they are not specified. Each chain is an instance of [anvil](https://book.getfoundry.sh/reference/anvil/), though future versions may support other local testing tools.

## Getting started
### Running Locally
1. build the binary by running:
```
go build cmd/main.go
```
2. start supersim in vanilla mode by running:
```
./main
```

## Features
### Vanilla mode
Brings up one L1 chain and 2 L2 chains with the appropriate OP Stack contracts already deployed, allowing you to locally test against the latest OP Stack features.

How to run in vanilla mode:
TODO: insert command

### Forked mode
Locally fork any of the available chains in a superchain network of the [superchain registry](https://github.com/ethereum-optimism/superchain-registry), default mainnet. The fork height is determined by L1 block height (default latest), which
determines the maximum timestamp for the forked L2 state of each chain to create some level of consistency.

Help Text:
```
NAME:
   supersim fork - Locally fork a network in the superchain registry

USAGE:
   supersim fork [command options] [arguments...]

OPTIONS:

          --l1.fork.height value              (default: 0)                       ($SUPERSIM_L1_FORK_HEIGHT)
                L1 height to fork the superchain (bounds L2 time). `0` for latest

          --chains value                                                         ($SUPERSIM_CHAINS)
                chains to fork in the superchain, mainnet options: [base, lyra, metal, mode, op,
                orderly, pgn, superlumio, zora]. In order to replace the public rpc endpoint for
                a chain, specify the ($SUPERSIM_RPC_URL_<CHAIN>) env variable. i.e SUPERSIM_RPC_URL_OP=http://optimism-mainnet.infura.io/v3/<API-KEY>

          --network value                     (default: "mainnet")               ($SUPERSIM_NETWORK)
                superchain network. options: mainnet, sepolia, sepolia-dev-0. In order to
                replace the public rpc endpoint for the network, specify the
                ($SUPERSIM_RPC_URL_<NETWORK>) env variable. i.e SUPERSIM_RPC_URL_MAINNET=http://mainnet.infura.io/v3/<API-KEY>

          --experiment.interop                (default: false)                   ($SUPERSIM_FORK_WITH_INTEROP)
                Enable interop in fork mode
   
          --l1.port value                     (default: 8545)                    ($SUPERSIM_L1_PORT)
                Listening port for the L1 instance. `0` binds to any available port
   
          --l2.starting.port value            (default: 9545)                    ($SUPERSIM_L2_STARTING_PORT)
                Starting port to increment from for L2 chains. `0` binds each chain to any
                available port
   
```

#### Enabling Interop in Fork Mode
To apply the changes needed for enabling interop on forked chains, pass `--experiment.interop true` in when starting supersim in fork mode. This will configure interop such that all forked L2 chains are in one another's dependency sets and can pass messages between each other.

## Examples
TODO


## Contracts
|Contract| Address  |
|---|---|
|CrossL2Inbox| 0x4200000000000000000000000000000000000022|
|L2ToL2CrossDomainMessenger |0x4200000000000000000000000000000000000023 |

## SuperchainERC20
Supersim by default includes the following SuperchainERC20 contracts for testing purposes.

|Contract| Address  |
|---|---|
|L2NativeSuperchainERC20| 0x61a6eF395d217eD7C79e1B84880167a417796172|
|OptimismSuperchainERC20 |TODO |

### L2NativeSuperchainERC20 

Simple ERC20 that adheres to the SuperchainERC20 standard



#### Minting new tokens
```bash
cast send 0x61a6eF395d217eD7C79e1B84880167a417796172 "mint(address _to, uint256 _amount)" $RECIPIENT_ADDRESS 1ether  --rpc-url $L2_RPC_URL
```

### OptimismSuperchainERC20

TODO

## Join Discord
Join our discord [here](https://discord.gg/Scdnrw8d) and reach out to us in the [interop-devex](https://discord.com/channels/1244729134312198194/1255653436079210496) channel.

## Contributing

Contributions are encouraged, but please open an issue before making any major changes to ensure your changes will be accepted.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contributing information.

## License

Files are licensed under the [MIT license](./LICENSE).

<a href="./LICENSE"><img src="https://user-images.githubusercontent.com/35039927/231030761-66f5ce58-a4e9-4695-b1fe-255b1bceac92.png" alt="License information" width="200" /></a>
