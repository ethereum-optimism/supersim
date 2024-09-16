<!-- omit in toc -->
# Manually relaying interop messages with `cast`

This guide describes how to form a [message identifier](https://specs.optimism.io/interop/messaging.html#message-identifier) to execute a message on a destination chain.

We'll perform the SuperchainERC20 interop transfer in [First steps](../../getting-started/first-steps.md#send-an-interoperable-superchainerc20-token-from-chain-901-to-902-l2-to-l2-message-passing) again, this time manually relaying the message without the autorelayer.

- [Overview](#overview)
  - [Contracts used](#contracts-used)
  - [High level steps](#high-level-steps)
  - [Message identifier](#message-identifier)
- [Steps](#steps)
  - [1. Start `supersim`](#1-start-supersim)
  - [2. Mint tokens to transfer on chain 901](#2-mint-tokens-to-transfer-on-chain-901)
  - [3. Initiate the send transaction on chain 901](#3-initiate-the-send-transaction-on-chain-901)
  - [4. Get the log emitted by the `L2ToL2CrossDomainMessenger`](#4-get-the-log-emitted-by-the-l2tol2crossdomainmessenger)
  - [5. Get the block timestamp the log was emitted in](#5-get-the-block-timestamp-the-log-was-emitted-in)
  - [6. Prepare the identifier](#6-prepare-the-identifier)
  - [7. Send the relayMessage transaction](#7-send-the-relaymessage-transaction)
  - [8. Check the balance on chain 902](#8-check-the-balance-on-chain-902)
- [Alternatives](#alternatives)



## Overview

### Contracts used
- [L2NativeSuperchainERC20](https://github.com/ethereum-optimism/supersim/blob/main/contracts/src/L2NativeSuperchainERC20.sol)
  - `0x61a6eF395d217eD7C79e1B84880167a417796172`
- [CrossL2Inbox](https://github.com/ethereum-optimism/optimism/blob/92ed64e171c6eb9c6a080c626640e8836f0653cc/packages/contracts-bedrock/src/L2/CrossL2Inbox.sol)
  - `0x4200000000000000000000000000000000000022`
- [L2ToL2CrossDomainMessenger](https://github.com/ethereum-optimism/optimism/blob/92ed64e171c6eb9c6a080c626640e8836f0653cc/packages/contracts-bedrock/src/L2/L2ToL2CrossDomainMessenger.sol)
  - `0x4200000000000000000000000000000000000023`


### High level steps

Sending an interop message using the `L2ToL2CrossDomainMessenger`:

**on source chain** (OPChainA 901)

1. call the `L2ToL2CrossChainMessenger.sendMessage`
   - the `L2NativeSuperchainERC20.sendERC20` contract will call this under the hood when
2. get the log identifier and the message payload

**on destination chain** (OPChainB 902)

3. call `CrossL2Inbox.executeMessage`
   - this calls `L2ToL2CrossDomainMessenger.relayMessage`
   - which then calls `L2NativeSuperchainERC20.relayERC20`

### Message identifier

A message identifier uniquely identifies a log emitted on a chain. 
The sequencer and smart contracts (CrossL2Inbox) use the identifier to perform [invariant checks](https://specs.optimism.io/interop/messaging.html#messaging-invariants) to confirm that the source message is valid.

```solidity
struct Identifier {
    address origin;      // Account (contract) that emits the log
    uint256 blocknumber; // Block number in which the log was emitted
    uint256 logIndex;    // Index of the log in the array of all logs emitted in the block
    uint256 timestamp;   // Timestamp that the log was emitted
    uint256 chainid;     // Chain ID of the chain that emitted the log
}
```

## Steps

### 1. Start `supersim`

```sh
supersim
```

### 2. Mint tokens to transfer on chain 901

Run the following command to mint 1000 `L2NativeSuperchainERC20` tokens to the recipient address:

```sh
cast send 0x61a6eF395d217eD7C79e1B84880167a417796172 "mint(address _to, uint256 _amount)"  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 1000  --rpc-url http://127.0.0.1:9545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

### 3. Initiate the send transaction on chain 901

Send the tokens from Chain 901 to Chain 902 using the following command:

```sh
cast send 0x61a6eF395d217eD7C79e1B84880167a417796172 "sendERC20(address _to, uint256 _amount, uint256 _chainId)" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 1000 902 --rpc-url http://127.0.0.1:9545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

### 4. Get the log emitted by the `L2ToL2CrossDomainMessenger`

The token contract calls the [L2ToL2CrossDomainMessenger](https://github.com/ethereum-optimism/optimism/blob/92ed64e171c6eb9c6a080c626640e8836f0653cc/packages/contracts-bedrock/src/L2/L2ToL2CrossDomainMessenger.sol), which emits a message (log) that can be executed on the destination chain.

```sh
cast logs --address 0x4200000000000000000000000000000000000023 --rpc-url http://127.0.0.1:9545
```

**example result:**

```sh
- address: 0x4200000000000000000000000000000000000023
  blockHash: 0x81ddbe2f7ff770011077fcec89a7e3a3ca54f2b7ba110695dd22f2a730457f60
  blockNumber: 18
  data: 0x1ecd26f200000000000000000000000000000000000000000000000000000000000003860000000000000000000000000000000000000000000000000000000000000385000000000000000000000000000000000000000000000000000000000000000000000000000000000000000061a6ef395d217ed7c79e1b84880167a41779617200000000000000000000000061a6ef395d217ed7c79e1b84880167a41779617200000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000064d9f50046000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb9226600000000000000000000000000000000000000000000000000000000000003e800000000000000000000000000000000000000000000000000000000
  logIndex: 1
  removed: false
  topics: []
  transactionHash: 0x5fad43480766ee63bdd07864f6b811432b042fded2a7e05df643f0fac4490817
  transactionIndex: 0
```

### 5. Get the block timestamp the log was emitted in

Since the message identifier requires the block timestamp, fetch the block info to get the timestamp.

```sh
cast block 0xREPLACE_WITH_CORRECT_BLOCKHASH --rpc-url http://127.0.0.1:9545
```

**example result:**

```sh
baseFeePerGas        1
difficulty           0
extraData            0x
gasLimit             30000000
gasUsed              62040
hash                 0x81ddbe2f7ff770011077fcec89a7e3a3ca54f2b7ba110695dd22f2a730457f60
logsBloom            0x00000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000010000000000000000008000000000000000000000000000002000008000000000000000000000000000000000000000000000000020000000000000100000800000000000008000000000010000000000000000000000000000000000000040000000000000000000000000000000000000200000000000000000000000000000000010000000000000000000000000000800002000000200000000000000000000000002000000000000000000020000000000000000000000000000000000000000000000000000000000000000000
miner                0x4200000000000000000000000000000000000011
mixHash              0x0000000000000000000000000000000000000000000000000000000000000000
nonce                0x0000000000000000
number               18
parentHash           0x552eae8494730d53e845b762042cebda51821ecf544562481a78eb1b36134b72
transactionsRoot     0x07ae44e7678b08e1d021fb83ede835cab2963f9627209bd8dc8cd4b6eb00df19
receiptsRoot         0xbb5c311ac46940b49e19aae1802f988a66e2e180a0432f169f9382a49d7e9893
sha3Uncles           0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347
size                 723
stateRoot            0xfa2449b5188bec99bda8a917e0494dce0f1a7d76ea1a8cc68edf42b6f8c1021b
timestamp            1726453637
withdrawalsRoot
totalDifficulty      0
transactions:        [
	0x5fad43480766ee63bdd07864f6b811432b042fded2a7e05df643f0fac4490817
]
```

### 6. Prepare the identifier

Now we have all the information needed for the message (log) identifier.

| **Parameter** | **Value**                                  | **Note**                   |
|---------------|--------------------------------------------|----------------------------|
| origin        | 0x4200000000000000000000000000000000000023 | L2ToL2CrossDomainMessenger |
| blocknumber   | 18                                         | from step 4                |
| logIndex      | 1                                          | from step 4                |
| timestamp     | 1726453637                                 | from step 5                |
| chainid       | 901                                        | OPChainA chainID           |

### 7. Send the relayMessage transaction

Call `executeMessage` on [CrossL2Inbox](https://github.com/ethereum-optimism/optimism/blob/92ed64e171c6eb9c6a080c626640e8836f0653cc/packages/contracts-bedrock/src/L2/CrossL2Inbox.sol#L133), which in turn calls `relayMessage` on [L2ToL2CrossDomainMessenger](https://github.com/ethereum-optimism/optimism/blob/92ed64e171c6eb9c6a080c626640e8836f0653cc/packages/contracts-bedrock/src/L2/L2ToL2CrossDomainMessenger.sol#L126)

```solidity
// CrossL2Inbox.sol (truncated for brevity)

contract CrossL2Inbox {
  struct Identifier {
      address origin;
      uint256 blockNumber;
      uint256 logIndex;
      uint256 timestamp;
      uint256 chainId;
  }

  // ...

  function executeMessage(
      Identifier calldata _id,
      address _target,
      bytes memory _message
  ) payable

  // ...
}
```


**`executeMessage` parameters**

- `Identifier calldata _id`: identifier pointing to the log on the source chain
   - same as the identifier in step 6.
- `address _target`: address of the contract on the destination chain to call. 
   - address of the `L2ToL2CrossChainMessenger`
- `bytes memory _message`: calldata to call the contract on the destination chain with.
   - `log.data` from the log emitted in step 4

Note that in our case, both `_id.origin` and `_target` happen to be the same with `0x4200000000000000000000000000000000000023`, the `L2ToL2CrossChainMessenger` predeploy. But they do not have to be the same if you're not using the messenger contracts.

Below is an example call, but make sure to replace them with the correct values you received in previous steps.

```sh
cast send 0x4200000000000000000000000000000000000022 \
"executeMessage((address, uint256, uint256, uint256, uint256), address, bytes)" \
"(0x4200000000000000000000000000000000000023, 18, 1, 1726453637, 901)" \
0x4200000000000000000000000000000000000023 \
0x1ecd26f200000000000000000000000000000000000000000000000000000000000003860000000000000000000000000000000000000000000000000000000000000385000000000000000000000000000000000000000000000000000000000000000000000000000000000000000061a6ef395d217ed7c79e1b84880167a41779617200000000000000000000000061a6ef395d217ed7c79e1b84880167a41779617200000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000064d9f50046000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb9226600000000000000000000000000000000000000000000000000000000000003e800000000000000000000000000000000000000000000000000000000 \
--rpc-url http://127.0.0.1:9546 \
--private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

### 8. Check the balance on chain 902

Verify that the balance of the L2NativeSuperchainERC20 on chain 902 has increased:

```sh
cast balance --erc20 0x61a6eF395d217eD7C79e1B84880167a417796172 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --rpc-url http://127.0.0.1:9546
```

## Alternatives

This is obviously very tedious to do by hand 😅. Here are some alternatives

- use `supersim --interop.autorelay` - this only works on supersim, but relayers for the testnet/prod environment will be available soon!
- [use `viem` bindings/actions](relay-using-viem.md) - if you're using typescript, we have bindings available to make fetching identifiers and relaying messages easier
