<!-- omit in toc -->
# supersim (vanilla mode)

- [Overview](#overview)
- [Configuration](#configuration)

## Overview

Start supersim in vanilla (non-forked) mode

```sh
supersim
```

Vanilla mode will start 3 chains, with the OP Stack contracts & periphery contracts already deployed.

- (1) L1 Chain
  - Chain 900
- (2) L2 Chains
  - Chain 901
  - Chain 902

**Example startup logs**

```
Available Accounts
-----------------------
(0): 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
(1): 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
(2): 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
(3): 0x90F79bf6EB2c4f870365E785982E1f101E93b906
(4): 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65
(5): 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc
(6): 0x976EA74026E726554dB657fA54763abd0C3a0aa9
(7): 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955
(8): 0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f
(9): 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720

Private Keys
-----------------------
(0): 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
(1): 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
(2): 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
(3): 0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6
(4): 0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a
(5): 0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba
(6): 0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e
(7): 0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356
(8): 0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97
(9): 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6

Orchestrator Config:
L1:
  Name: L1    Chain ID: 900    RPC: http://127.0.0.1:8545    LogPath: /var/folders/0w/ethers-phoenix/T/anvil-chain-900
L2:
  Name: OPChainA    Chain ID: 901    RPC: http://127.0.0.1:9545    LogPath: /var/folders/0w/ethers-phoenix/T/anvil-chain-901
  Name: OPChainB    Chain ID: 902    RPC: http://127.0.0.1:9546    LogPath: /var/folders/0w/ethers-phoenix/T/anvil-chain-902
```

## Configuration

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
   docs     Display available docs links
   help, h  Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --admin.port value                  Listening port for the admin server (default: 8420) [$SUPERSIM_ADMIN_PORT]
   --interop.l2tol2cdm.override value  Path to the L2ToL2CrossDomainMessenger build artifact that overrides the default implementation [$SUPERSIM_INTEROP_L2TO2CDM_OVERRIDE]
   --l1.port 0                         Listening port for the L1 instance. 0 binds to any available port (default: 8545) [$SUPERSIM_L1_PORT]
   --l2.count value                    Number of L2s. Max of 5 (default: 2) [$SUPERSIM_L2_COUNT]
   --l2.starting.port 0                Starting port to increment from for L2 chains. 0 binds each chain to any available port (default: 9545) [$SUPERSIM_L2_STARTING_PORT]
   --interop.autorelay                 Automatically relay messages sent to the L2ToL2CrossDomainMessenger using account 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720 (default: false) [$SUPERSIM_INTEROP_AUTORELAY]
   --logs.directory value              Directory to store logs [$SUPERSIM_LOGS_DIRECTORY]
   --l1.host value                     Host address for the L1 instance (default: "127.0.0.1") [$SUPERSIM_L1_HOST]
   --l2.host value                     Host address for L2 instances (default: "127.0.0.1") [$SUPERSIM_L2_HOST]
   --interop.delay value               Delay before relaying messages sent to the L2ToL2CrossDomainMessenger (default: 0) [$SUPERSIM_INTEROP_DELAY]
   --odyssey.enabled                   Enable odyssey experimental features (default: false) [$SUPERSIM_ODYSSEY_ENABLED]
   --dependency.set value              Override local chain IDs in the dependency set.(format: '[901,902]' or '[]') [$SUPERSIM_DEPENDENCY_SET]
   --log.level value                   The lowest log level that will be output (default: INFO) [$SUPERSIM_LOG_LEVEL]
   --log.format value                  Format the log output. Supported formats: 'text', 'terminal', 'logfmt', 'json', 'json-pretty', (default: text) [$SUPERSIM_LOG_FORMAT]
   --log.color                         Color the log output if in terminal mode (default: false) [$SUPERSIM_LOG_COLOR]
   --log.pid                           Show pid in the log (default: false) [$SUPERSIM_LOG_PID]
   --help, -h                          show help
   --version, -v                       print the version
```
