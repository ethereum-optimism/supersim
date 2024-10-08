<!-- omit in toc -->
# Manually relaying interop messages with `cast` and L2ToL2CrossDomainMessenger

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
  - `0x420beeF000000000000000000000000000000001`
- [CrossL2Inbox](https://github.com/ethereum-optimism/optimism/blob/92ed64e171c6eb9c6a080c626640e8836f0653cc/packages/contracts-bedrock/src/L2/CrossL2Inbox.sol)
  - `0x4200000000000000000000000000000000000022`
- [L2ToL2CrossDomainMessenger](https://github.com/ethereum-optimism/optimism/blob/92ed64e171c6eb9c6a080c626640e8836f0653cc/packages/contracts-bedrock/src/L2/L2ToL2CrossDomainMessenger.sol)
  - `0x4200000000000000000000000000000000000023`


### High level steps

Sending an interop message using the `L2ToL2CrossDomainMessenger`:

**on source chain** (OPChainA 901)

1. call the `L2ToL2CrossChainMessenger.sendMessage`
   - the `L2NativeSuperchainERC20.sendERC20` contract will call this under the hood
2. get the log identifier and the message payload

**on destination chain** (OPChainB 902)

3. call `L2ToL2CrossDomainMessenger.relayMessage`
   - this calls `L2NativeSuperchainERC20.relayERC20`

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
cast send 0x420beeF000000000000000000000000000000001 "mint(address _to, uint256 _amount)"  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 1000  --rpc-url http://127.0.0.1:9545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

### 3. Initiate the send transaction on chain 901

Send the tokens from Chain 901 to Chain 902 using the following command:

```sh
cast send 0x420beeF000000000000000000000000000000001 "sendERC20(address _to, uint256 _amount, uint256 _chainId)" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 1000 902 --rpc-url http://127.0.0.1:9545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

### 4. Get the log emitted by the `L2ToL2CrossDomainMessenger`

The token contract calls the [L2ToL2CrossDomainMessenger](https://github.com/ethereum-optimism/optimism/blob/92ed64e171c6eb9c6a080c626640e8836f0653cc/packages/contracts-bedrock/src/L2/L2ToL2CrossDomainMessenger.sol), which emits a message (log) that can be executed on the destination chain.

```sh
cast logs --address 0x4200000000000000000000000000000000000023 --rpc-url http://127.0.0.1:9545
```

**example result:**

```sh
- address: 0x4200000000000000000000000000000000000023
  blockHash: 0x644e640094d96e379fec06f3dfbb3b03ee54cde15450543a847f61a063977e90
  blockNumber: 10
  data: 0x000000000000000000000000420beef00000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000064d9f50046000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb9226600000000000000000000000000000000000000000000000000000000000003e800000000000000000000000000000000000000000000000000000000
  logIndex: 1
  removed: false
  topics: [
        0x382409ac69001e11931a28435afef442cbfd20d9891907e8fa373ba7d351f320
        0x0000000000000000000000000000000000000000000000000000000000000386
        0x000000000000000000000000420beef000000000000000000000000000000001
        0x0000000000000000000000000000000000000000000000000000000000000000
  ]
  transactionHash: 0xf6fcec6ae3941e33223cd6a63d0ffaeac1795b65c144db17e6ae7c8d3e2250dc
  transactionIndex: 0
```

### 5. Get the block timestamp the log was emitted in

Since the message identifier requires the block timestamp, fetch the block info to get the timestamp.

```sh
cast block 0xREPLACE_WITH_CORRECT_BLOCKHASH --rpc-url http://127.0.0.1:9545
```

**example result:**

```sh
baseFeePerGas        301131671
difficulty           0
extraData            0x
gasLimit             30000000
gasUsed              63173
hash                 0x644e640094d96e379fec06f3dfbb3b03ee54cde15450543a847f61a063977e90
logsBloom            0x20000000000000020000000000000000000000080000000000000010000000000000000000000000000000000000000010000000000000000008000000000000000000000000000002000008000000000000000000000100000020000000000000000000020000000040000100000800000000000008000000000010000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000010000000000000000000000000040000002000000200000000000000000000000102000000800000000000020000000000000000000000000000000000000000000000000000000001400000000
miner                0x4200000000000000000000000000000000000011
mixHash              0x0000000000000000000000000000000000000000000000000000000000000000
nonce                0x0000000000000000
number               10
parentHash           0xac9dc75fdf4ab41e5b90eefb103745eade25c4b98b48dff784df7d6d45c6144a
parentBeaconRoot     
transactionsRoot     0x15e50417f6fa12895cb81dcf9db89f486d3a5760db538ebca97337d28c90f12a
receiptsRoot         0x1a3a7571e087a8200fba03d0c19d433c8293d99d7faa55d953c19006333fe75a
sha3Uncles           0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347
size                 731
stateRoot            0xb436dee5ab769a104f36e4c1ae3d09c79ec07a8741f0b724c06f0ab8264f1cd1
timestamp            1728428155 (Tue, 8 Oct 2024 22:55:55 +0000)
withdrawalsRoot      
totalDifficulty      0
transactions:        [
        0xf6fcec6ae3941e33223cd6a63d0ffaeac1795b65c144db17e6ae7c8d3e2250dc
]
```

### 6. Construct message payload

To construct the message payload we need to concatenate all the log topics and log data. These need to be concatenated as all the topics first in order and then the data:

```sh
# 0x + topics[0] + topics[1] + topics[2] + topics[3] + data
0x + 382409ac69001e11931a28435afef442cbfd20d9891907e8fa373ba7d351f320 + 0000000000000000000000000000000000000000000000000000000000000386 + 000000000000000000000000420beef000000000000000000000000000000001 + 0000000000000000000000000000000000000000000000000000000000000000 + 000000000000000000000000420beef00000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000064d9f50046000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb9226600000000000000000000000000000000000000000000000000000000000003e800000000000000000000000000000000000000000000000000000000
```

### 7. Prepare the identifier

Now we have all the information needed for the message (log) identifier.

| **Parameter** | **Value**                                  | **Note**                   |
|---------------|--------------------------------------------|----------------------------|
| origin        | 0x4200000000000000000000000000000000000023 | L2ToL2CrossDomainMessenger |
| blocknumber   | 10                                         | from step 4                |
| logIndex      | 1                                          | from step 4                |
| timestamp     | 1728428155                                 | from step 5                |
| chainid       | 901                                        | OPChainA chainID           |

### 8. Send the relayMessage transaction

Call `relayMessage` on [L2ToL2CrossDomainMessenger](https://github.com/ethereum-optimism/optimism/blob/a05feb362b5209ab6a200874e9d45244f12240d1/packages/contracts-bedrock/src/L2/L2ToL2CrossDomainMessenger.sol#L149)

```solidity
// L2ToL2CrossDomainMessenger.sol (truncated for brevity)

interface ICrossL2Inbox {
  struct Identifier {
      address origin;
      uint256 blockNumber;
      uint256 logIndex;
      uint256 timestamp;
      uint256 chainId;
  }

  // ...

  function relayMessage(
      ICrossL2Inbox.Identifier calldata _id,
      bytes calldata _sentMessage
  ) payable

  // ...
}
```


**`relayMessage` parameters**

- `ICrossL2Inbox.Identifier calldata _id`: identifier pointing to the log on the source chain
   - same as the identifier in step 7.
- `bytes calldata _sentMessage`: calldata to call the contract on the destination chain with.
   - message payload from step 6.

Below is an example call, but make sure to replace them with the correct values you received in previous steps.

```sh
cast send 0x4200000000000000000000000000000000000023 \
"relayMessage((address, uint256, uint256, uint256, uint256), bytes)" \
"(0x4200000000000000000000000000000000000023, 10, 1, 1728428155, 901)" \
0x382409ac69001e11931a28435afef442cbfd20d9891907e8fa373ba7d351f3200000000000000000000000000000000000000000000000000000000000000386000000000000000000000000420beef0000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000420beef00000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000064d9f50046000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb9226600000000000000000000000000000000000000000000000000000000000003e800000000000000000000000000000000000000000000000000000000 \
--rpc-url http://127.0.0.1:9546 \
--private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

### 9. Check the balance on chain 902

Verify that the balance of the L2NativeSuperchainERC20 on chain 902 has increased:

```sh
cast balance --erc20 0x420beeF000000000000000000000000000000001 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --rpc-url http://127.0.0.1:9546
```

## Alternatives

This is obviously very tedious to do by hand 😅. Here are some alternatives

- use `supersim --interop.autorelay` - this only works on supersim, but relayers for the testnet/prod environment will be available soon!
- [use `viem` bindings/actions](relay-using-viem.md) - if you're using typescript, we have bindings available to make fetching identifiers and relaying messages easier
