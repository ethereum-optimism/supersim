<!-- omit in toc -->
# Included contracts

The chain environment includes contracts already deployed to help replicate the Superchain environment. You can see an example of contract addresses for a L2 system [here](/docs/src/chain-environment/network-details/op-chain-a.md).

- [OP Stack system contracts (L1)](#op-stack-system-contracts-l1)
- [OP Stack L2 contracts (L2)](#op-stack-l2-contracts-l2)
- [Periphery contracts (L2)](#periphery-contracts-l2)
  - [L2NativeSuperchainERC20](#l2nativesuperchainerc20)
    - [Minting new tokens](#minting-new-tokens)


## OP Stack system contracts (L1)

These are the L1 contracts that are required for a rollup as part of the OP Stack protocol. Examples are the [OptimismPortal](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol), [L1StandardBridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/L1StandardBridge.sol), and [L1CrossDomainMessenger](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/L1CrossDomainMessenger.sol).

View examples of these contracts here the official [OP docs](https://docs.optimism.io/chain/addresses#ethereum-l1) or the source code [here in the Optimism monorepo](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts-bedrock/src/L1)

## OP Stack L2 contracts (L2)

The OP Stack system contracts on the L2 are included at the standard addresses by default.

- [Standard OP Stack predeploys (L2)](https://specs.optimism.io/protocol/predeploys.html)
- [Interoperability predeploys (*experimental*) (L2)](https://specs.optimism.io/interop/predeploys.html)
- [OP Stack preinstalls (L2)](https://specs.optimism.io/protocol/preinstalls.html)


## Periphery contracts (L2)

L2 chains running on `supersim` also includes some useful contracts for testing purposes that are not part of the OP Stack by default.

### L2NativeSuperchainERC20

A simple ERC20 that adheres to the SuperchainERC20 standard. It includes permissionless minting for easy testing.

Source: [L2NativeSuperchainERC20.sol](/contracts/src/L2NativeSuperchainERC20.sol)

Deployed address: `0x420beeF000000000000000000000000000000001`

#### Minting new tokens

```bash
cast send 0x420beeF000000000000000000000000000000001 "mint(address _to, uint256 _amount)" $RECIPIENT_ADDRESS 1ether  --rpc-url $L2_RPC_URL
```
