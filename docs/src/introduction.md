# Introduction

Supersim is a lightweight tool to simulate the Superchain (with a single L1 and multiple OP-Stack L2s).

Run multiple local nodes with one command, and coordinate message passing between these chains.

It does not require a complicated devnet setup and is run using cli commands with configuration options that fall back to sensible defaults if they are not specified. Each chain is an instance of [anvil](https://book.getfoundry.sh/reference/anvil/), though future versions may support other local testing tools.

## Features

- spin up multiple anvil nodes
- predeployed OP Stack contracts and useful mock contracts (ERC20)
- fork multiple remote chains (fork the entire Superchain)
- simulate L1 <> L2 message passing (deposits)
- simulate L2 <> L2 message passing (interoperability) and auto-relayer
- (**Coming soon**) Withdrawals
- (**Coming soon**) ERC-4337 account abstraction services (bundlers / paymasters / wallet implementation)
