# PredictionMarket Frontend

The frontend implementation of the Superchain PredictionMarket app chain leveraging superchain interop via Supersim.o

See the relevation section in the Supersim [docs](https://supersim.pages.dev/guides/interop/cross-chain-event-composability-predictionmarket.html) for how the contracts are designed.

## Overview

The prediction market dapp is deployed on a a single chain, OPChainC. All markets and bets are transaction on this chain. However, leveraging superchain interop, the created markets can have their outcomes be determined by events that can occur anywhere in the superchain.

So user interactions with the markets occur on OPChainC, but the frontend listens to the appropriate events from other chains for market creation and resolution.

## Getting Started

### 1. Setup Supersim

The dedicated prediction market chain on a third chain, OPChainC. Default behavior is to instantiate 2 chains, so we must supply a flag to start 3.

```bash
supersim --l2.count 3
```

### 2. Deploy the relevant contracts

The relevant deploy script is under `/contracts/script/predictionmarket/Deploy.s.sol`. This script will deploy all the relevant contracts across all 3 chains. The prediction market contracts are only on OPChainC.

```bash
# The private key is simply the last supersim test account
cd contracts
forge script script/predictionmarket/Deploy.s.sol --broadcast --private-key 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6 
```

The forge script will log the relevant contract addresses required for the frontend. Use the script output from OPChainC as it will also contain the prediction market contract addresses.

```
...

Selecting OPChainC
  TicTacToe Deployed at: 0x823E35A4eAB40A75EF05C5c7746EA47e9ceD252c
  BlockHashEmitter Deployed at: 0x5209d6eFE46e89212b2f53162b78D787DA14D02D
  PredictionMarket Deployed at: 0xB56c594E63057461812Ea3aFAE68dBFbf0cdF12a
  BlockHashMarketFactory Deployed at: 0x9A08E9179587a81B1FE9c68fBC8aF176D668A962
  TicTacToeMarketFactory Deployed at: 0xBF7f3de0eFF1C187E9eA1530c8958E0Fdbd81e98
  MockResolverFactory Deployed at: 0x1c4Fba2Cc0cDdEc7ba662BCF967C933dA0D4D29b
```

Any of the contract addresses can be overridden by setting the `VITE_<contract name>_ADDRESS` environment variable.

### 3. Run the frontend

Ensure the forge deploy script was run as the vite server parses the latest foundry broadcast log for the contract addresses.

```bash
cd examples/predictionmarket
pnpm i && pnpm run dev
```

In order to create markets on TicTacToe games, the frontend for that application must be running seperately.

See the [TicTacToe README](../tictactoe/README.md) for more information.

```bash
cd examples/tictactoe
export VITE_TICTACTOE_ADDRESS=<contract address deployment logs>
pnpm i && pnpm run dev
```

## Implementation Notes

The "backend" is implemented as React Hooks.
   - [src/hooks/useMarket.ts](./src/hooks/useMarket.ts) is the hook that syncs all created predictions markets
   - [src/hooks/useMarketStatus.ts](./src/hooks/useMarketStatus.ts) is the hook that provides the status of a market, with cross chain event composability depending on the market's resolution mechanism.
   - All other the other provided hooks fill in details about a prediction market for the connected account such as positions held. 

## Improvements

1. In order to place bets, the account must have an ETH balance on the prediciton market chain. We can further expand on interop capabilities by allowing the account to place a bet on any chain they have ETH, leveraging the SuperchainWETH contract for the crosschain transfer.