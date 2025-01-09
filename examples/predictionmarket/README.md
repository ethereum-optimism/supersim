# PredictionMarket Frontend

The frontend implementation of the Superchain PredictionMarket app chain leveraging superchain interop via Supersim.o

See the relevation section in the Supersim [docs](https://supersim.pages.dev/guides/interop/cross-chain-event-composability-predictionmarket.html) for how the contracts are designed.

## Overview

The prediction market dapp is deployed on a a single chain, OPChainC. All markets and bets are transaction on this chain. However, leveraging superchain interop, the created markets can have their outcomes be determined by events that can occur anywhere in the superchain.

So user interactions with the markets occur on OPChainC, but the frontend listens to the appropriate events from other chains for market creation and resolution.

## Getting Started

### 1. Setup Supersim

The dedicated prediction market chain on a third chain, OPChainC. Default behavior is to instantiate 2 chains, so we supply a flag to start 3.

```bash
supersim --l2.count 3
```

### 2. Deploy the relevant contracts

The relevant deploy script is under `/contracts/script/predictionmarket/Deploy.s.sol`. This script is run against all 3 chains. If not the app chain, the script will only deploy auxilliary `TicTacToe` and `BlockHashEmitter` contracts. Against the app chain, `OPChainC`, the script will deploy the relevant prediction market contracts.

```base
cd contracts

# Deploy to OP Chain A
forge script script/predictionmarket/Deploy.s.sol --rpc-url http://localhost:9545 --broadcast --private-key 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6 

# Deploy to OP Chain B
forge script script/predictionmarket/Deploy.s.sol --rpc-url http://localhost:9546 --broadcast --private-key 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6 

# Deploy to OP Chain C
forge script script/predictionmarket/Deploy.s.sol --rpc-url http://localhost:9547 --broadcast --private-key 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6 
```

The forge script will log the relevant contract addresses required for the frontend. Use the script output from OPChainC as it will also contain the prediction market contract addresses.

```
...
Script ran successfully..
== Logs ==
  BlockHashEmitter Deployed at:  0x5209d6eFE46e89212b2f53162b78D787DA14D02D
  TicTacToe Deployed at:  0x823E35A4eAB40A75EF05C5c7746EA47e9ceD252c
  PredictionMarket Deployed at:  0xB56c594E63057461812Ea3aFAE68dBFbf0cdF12a
  BlockHashMarketFactory Deployed at:  0x999554A423aD47E6AaE509Da115bC8524905b631
  TicTacToeMarketFactory Deployed at:  0x849883427425582fe0af41c082C7793E0B3a26fD
```

### 3. Run the frontend

// TODO: run tictactoe

Supply the relevant contract addresses to the frontend as environment variables.

```bash
cd examples/predictionmarket

export VITE_BLOCKHASH_MARKET_ADDRESS=0xB56c594E63057461812Ea3aFAE68dBFbf0cdF12a
export VITE_TICTACTOE_MARKET_ADDRESS=0xB56c594E63057461812Ea3aFAE68dBFbf0cdF12a

pnpm i && pnpm run dev
```

## Implementation Notes

## Improvements

1. Placing bets from any chain