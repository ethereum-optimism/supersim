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

### Why Supersim?

While existing tools focus on isolated smart contract testing, Supersim takes a quantum leap forward by providing a holistic, local development environment that mirrors the complex interactions of the Superchain ecosystem. Imagine having the power to simulate entire cross-chain application flows, complete with deployed contracts, intricate message passing infrastructure, and OP-Stack specific logic. Supersim makes this a reality. 

As we move towards a multi-chain future, the ability to develop and test applications that seamlessly operate across different layers and chains becomes crucial. Supersim provides a consistent and reliable environment that mimics real-world Superchain interactions. By leveraging Supersim, developers can focus on building groundbreaking applications, rather than grappling with the intricacies of cross-chain testing environments. This tool doesn't just make development easier; it unlocks new possibilities for innovation in the Superchain ecosystem.


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
   supersim - Superchain Multi-L2 Simulator

USAGE:
   supersim [global options] command [command options]

VERSION:
   untagged

DESCRIPTION:
   Local multichain optimism development environment

COMMANDS:
   fork     Locally fork a network in the superchain registry
   help, h  Shows a list of commands or help for one command

GLOBAL OPTIONS:

    --interop.autorelay                 (default: false)                   ($SUPERSIM_AUTORELAY)
          Automatically relay messages sent to the L2ToL2CrossDomainMessenger using
          account 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720

    --l1.port value                     (default: 8545)                    ($SUPERSIM_L1_PORT)
          Listening port for the L1 instance. `0` binds to any available port

    --l2.starting.port value            (default: 9545)                    ($SUPERSIM_L2_STARTING_PORT)
          Starting port to increment from for L2 chains. `0` binds each chain to any
          available port

    --log.color                         (default: false)                   ($SUPERSIM_LOG_COLOR)
          Color the log output if in terminal mode

    --log.format value                  (default: text)                    ($SUPERSIM_LOG_FORMAT)
          Format the log output. Supported formats: 'text', 'terminal', 'logfmt', 'json',
          'json-pretty',

    --log.level value                   (default: INFO)                    ($SUPERSIM_LOG_LEVEL)
          The lowest log level that will be output

    --log.pid                           (default: false)                   ($SUPERSIM_LOG_PID)
          Show pid in the log   
```

#### Enabling Interop in Fork Mode
To apply the changes needed for enabling interop on forked chains, pass `--experiment.interop true` in when starting supersim in fork mode. This will configure interop such that all forked L2 chains are in one another's dependency sets and can pass messages between each other.

## Examples

### Transferring L2NativeSuperchainERC20

1. run supersim with `interop.autorelay` enabled
```sh
supersim --interop.autorelay
```

2. mint some tokens to transfer
```sh
cast send 0x61a6eF395d217eD7C79e1B84880167a417796172 "mint(address _to, uint256 _amount)"  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 1000  --rpc-url http://127.0.0.1:9545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

3. bridge the tokens using interop
```sh
cast send 0x61a6eF395d217eD7C79e1B84880167a417796172 "sendERC20(address _to, uint256 _amount, uint256 _chainId)" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 1000 902 --rpc-url http://127.0.0.1:9545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

4. in a few seconds, you should see the relayed message (ie. `L2ToL2CrossChainMessenger#RelayedMessage`) appear on chain 902
```sh
# example
INFO [08-30|14:30:14.698] L2ToL2CrossChainMessenger#RelayedMessage sourceChainID=901 destinationChainID=902 nonce=0 sender=0x61a6eF395d217eD7C79e1B84880167a417796172 target=0x61a6eF395d217eD7C79e1B84880167a417796172
```
5. check the increased balance of the `L2NativeSuperchainERC20` on the destination chain (902)
```sh
cast balance --erc20 0x61a6eF395d217eD7C79e1B84880167a417796172 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --rpc-url http://127.0.0.1:9546
```

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
