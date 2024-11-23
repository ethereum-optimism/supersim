# TicTacToe Frontend

The frontend implementation for the horizontally scalable multichain TicTacToe game built on the superchain interop specification via Supersim.

See the relevant section in the Supersim [docs](https://google.com) for how the contract is designed.

## Overview

This frontend streams all game events across the superchain and presents a single view to the connected wallet. Since this frontend was built for local demonstrative purposes,
it simply streams all game events from the genesis block on every refresh -- not a good idea for production.

When run in vanilla mode, Supersim instantiates two L2 chains, OP Chain A (901) and OP Chain B (902). The frontend represents OP Chain A as the OP Mainnet network and OP Chain B as the Mode network just for demonstrative purposes as to how this might look in production.

## Getting Started

### 1. Deploy The TicTacToe Contract

We'll use the private key of the last pre-funded account to deploy the contracts. **The deployer has no special privileges**

```bash
cd contracts

# Deploy to OP Chain A
forge script script/tictactoe/Deploy.s.sol --rpc-url http://localhost:9545 --broadcast --private-key 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6 

# Deploy to OP Chain B
forge script script/tictactoe/Deploy.s.sol --rpc-url http://localhost:9546 --broadcast --private-key 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6 
```

The forge script will log the deployed deterministic contract address.

```bash
...
Script ran successfully..
== Logs ==
  Deployed at:  0x14eFE545C60FB3b65B9eeb23E22b8013908e48Bc

...
```

### 2. Run The Frontend

Ensure the contract address matches the constant within `examples/tictactoe/src/constants/tictactoe.ts`

```bash
cd examples/tictactoe
pnpn i && pnpm run dev
```

The frontend will be available at `http://localhost:5173`.

## Implementation Notes

1. The "backend" is implemented as a React hook within [src/hooks/useGame.ts](./src/hooks/useGame.ts). Regardless of the connected wallet, this hook syncs all past events and listens for all new events emitted by the TicTacToe contract. All games can be looked up by the mapping provided from this hook.

2. Each Game is looked up per player via the GameKey, `<chainId>-<gameId>-<player>`. As a game progresses, the latest action -- the emitted event -- made by each player is locally stored. This allows provides a quick lookup for the player to make their move by simply querying the Game state by their opponents address.

## Improvements

- Install the contract directly from the frontend.

- As a new chain is added, the frotend can simply detect this. Supersim for vanilla mode, superchain registry in production.