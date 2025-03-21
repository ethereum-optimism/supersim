<!-- omit in toc -->
# `cast` commands to relay interop messages

This guide describes how to form a [message identifier](https://specs.optimism.io/interop/messaging.html#message-identifier) to relay a [L2ToL2CrossDomainMessenger](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L2/L2ToL2CrossDomainMessenger.sol) cross chain call.

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
- [L2ToL2CrossDomainMessenger](https://github.com/ethereum-optimism/optimism/blob/92ed64e171c6eb9c6a080c626640e8836f0653cc/packages/contracts-bedrock/src/L2/L2ToL2CrossDomainMessenger.sol)
  - `0x4200000000000000000000000000000000000023`

### High level steps

Sending an interop message using the `L2ToL2CrossDomainMessenger`:

**On source chain** (OPChainA 901)

1. Invoke `L2NativeSuperchainERC20.sentERC20` to bridge funds
   - this leverages `L2ToL2CrossDomainMessenger.sendMessage` to make the cross chain call
2. Retrieve the log identifier and the message payload for the `SentMessage` event.

**On destination chain** (OPChainB 902)

3. Relay the message with `L2ToL2CrossDomainMessenger.relayMessage`
   - which then calls `L2NativeSuperchainERC20.relayERC20`

### Message identifier

A message identifier uniquely identifies a log emitted on a chain. 
The sequencer and smart contracts (CrossL2Inbox) use the identifier to perform [invariant checks](https://specs.optimism.io/interop/messaging.html#messaging-invariants) to confirm that the message is valid.

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
cast send 0x4200000000000000000000000000000000000028 "sendERC20(address _token, address _to, uint256 _amount, uint256 _chainId)" 0x420beeF000000000000000000000000000000001 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 1000 902 --rpc-url http://127.0.0.1:9545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

### 4. Get the log emitted by the `L2ToL2CrossDomainMessenger`

The token contract calls the [L2ToL2CrossDomainMessenger](https://github.com/ethereum-optimism/optimism/blob/92ed64e171c6eb9c6a080c626640e8836f0653cc/packages/contracts-bedrock/src/L2/L2ToL2CrossDomainMessenger.sol), which emits a message (log) that can be relayed on the destination chain.

```sh
$ cast logs --address 0x4200000000000000000000000000000000000023 --rpc-url http://127.0.0.1:9545

address: 0x4200000000000000000000000000000000000023
blockHash: 0x3905831f1b109ce787d180c1ed977ebf0ff1a6334424a0ae8f3731b035e3f708
blockNumber: 4
data: 0x000000000000000000000000420beef00000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000064d9f50046000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb9226600000000000000000000000000000000000000000000000000000000000003e800000000000000000000000000000000000000000000000000000000
logIndex: 1
topics: [
      0x382409ac69001e11931a28435afef442cbfd20d9891907e8fa373ba7d351f320
      0x0000000000000000000000000000000000000000000000000000000000000386
      0x000000000000000000000000420beef000000000000000000000000000000001
      0x0000000000000000000000000000000000000000000000000000000000000000
]
...
```

### 5. Retrieve the block timestamp the log was emitted in

Since the message identifier requires the block timestamp, fetch the block info to get the timestamp.

```sh
$ cast block 0xREPLACE_WITH_CORRECT_BLOCKHASH --rpc-url http://127.0.0.1:9545
...
timestamp            1728507703
...
```

### 6. Prepare the message identifier & payload

Now we have all the information needed for the message (log) identifier.

| **Parameter** | **Value**                                  | **Note**                   |
|---------------|--------------------------------------------|----------------------------|
| origin        | 0x4200000000000000000000000000000000000023 | L2ToL2CrossDomainMessenger |
| blocknumber   | 4                                          | from step 4                |
| logIndex      | 1                                          | from step 4                |
| timestamp     | 1728507703                                 | from step 5                |
| chainid       | 901                                        | OPChainA chainID           |

The message payload is the concatenation of the [...topics, data] in order.

```
0x + 382409ac69001e11931a28435afef442cbfd20d9891907e8fa373ba7d351f320
   + 0000000000000000000000000000000000000000000000000000000000000386
   + 000000000000000000000000420beef000000000000000000000000000000001
   + 0000000000000000000000000000000000000000000000000000000000000000
   + 000000000000000000000000420beef00000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000064d9f50046000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb9226600000000000000000000000000000000000000000000000000000000000003e800000000000000000000000000000000000000000000000000000000
```

Payload: `0x382409ac69001e11931a28435afef442cbfd20d9891907e8fa373ba7d351f3200000000000000000000000000000000000000000000000000000000000000386000000000000000000000000420beef0000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000420beef00000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000064d9f50046000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb9226600000000000000000000000000000000000000000000000000000000000003e800000000000000000000000000000000000000000000000000000000`

### 7. Calculate the checksum

Call `calculateChecksum` on the `CrossL2Inbox`.

**`calculateChecksum` parameters**

- `ICrossL2Inbox.Identifier calldata _id`: identifier pointing to the `SentMessage` log on the source chain
- `bytes32 _msgHash`: the hash of the message payload (the hash of the encoding of the log topics & data)

To get the `_msgHash` the `keccak256` hash of the message payload can be calculated using the following cast command:

```sh
cast keccak 0x382409ac69001e11931a28435afef442cbfd20d9891907e8fa373ba7d351f3200000000000000000000000000000000000000000000000000000000000000386000000000000000000000000420beef0000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000420beef00000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000064d9f50046000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb9226600000000000000000000000000000000000000000000000000000000000003e800000000000000000000000000000000000000000000000000000000
...
result            0x3bf5f05393af50ad8fdff0caa67a4f7fb618b161c3fbf4e8e67c91fbf8e022e8
...
```

Now call `calculateChecksum` on the `CrossL2Inbox` with the `identifier` and the `_msgHash`.

```sh
cast call 0x4200000000000000000000000000000000000022 \
    "calculateChecksum((address, uint256, uint256, uint256, uint256), bytes32)"  \
    "(0x4200000000000000000000000000000000000023, 4, 1, 1728507703, 901)" \
    0x3bf5f05393af50ad8fdff0caa67a4f7fb618b161c3fbf4e8e67c91fbf8e022e8 \
    --rpc-url http://127.0.0.1:9546
...
result            0x03894bea0dedad2445ce3d280dbdb0ccd5b4f776e70e873d7e887bc0683162e5
...
```

You will use the output of this as an access list storage key in the relayMessage transaction.

### 8. Send the relayMessage transaction

Call `relayMessage` on the [L2ToL2CrossDomainMessenger](https://github.com/ethereum-optimism/optimism/blob/92ed64e171c6eb9c6a080c626640e8836f0653cc/packages/contracts-bedrock/src/L2/L2ToL2CrossDomainMessenger.sol#L126)

```solidity
// L2ToL2CrossDomainMessenger.sol (truncated for brevity)

contract L2ToL2CrossDomainMessenger {

  // ...

  function relayMessage(
      ICrossL2Inbox.Identifier calldata _id,
      bytes calldata _sentMessage
  ) payable

  // ...
}
```


**`relayMessage` parameters**

- `ICrossL2Inbox.Identifier calldata _id`: identifier pointing to the `SentMessage` log on the source chain
- `bytes memory _sentMessage`: encoding of the log topics & data

Below is an example call, but make sure to replace them with the correct values you received in previous steps.

```sh
$ cast send 0x4200000000000000000000000000000000000023 \
    "relayMessage((address, uint256, uint256, uint256, uint256), bytes)" \
    "(0x4200000000000000000000000000000000000023, 4, 1, 1728507703, 901)" \
    0x382409ac69001e11931a28435afef442cbfd20d9891907e8fa373ba7d351f3200000000000000000000000000000000000000000000000000000000000000386000000000000000000000000420beef0000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000420beef00000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000064d9f50046000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb9226600000000000000000000000000000000000000000000000000000000000003e800000000000000000000000000000000000000000000000000000000 \
    --access-list '[{"address":"0x4200000000000000000000000000000000000022","storageKeys":["0x03894bea0dedad2445ce3d280dbdb0ccd5b4f776e70e873d7e887bc0683162e5"]}]' \
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
- [use `viem` bindings/actions](relay-using-viem.md) - if you're using typescript, we have bindings available to make fetching identifiers and relaying messages easy
