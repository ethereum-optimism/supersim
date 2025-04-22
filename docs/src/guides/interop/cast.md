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
  - [5. Retrieve the block timestamp the log was emitted in](#5-retrieve-the-block-timestamp-the-log-was-emitted-in)
  - [6. Prepare the message identifier & payload](#6-prepare-the-message-identifier--payload)
  - [7. Construct the access list for the message](#7-construct-the-access-list-for-the-message)
  - [8. Send the relay message transaction](#8-send-the-relay-message-transaction)
  - [9. Check the balance on chain 902](#9-check-the-balance-on-chain-902)
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

The token contract calls the [L2ToL2CrossDomainMessenger](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L2/L2ToL2CrossDomainMessenger.sol), which emits a message (log) that can be relayed on the destination chain.

```sh
cast logs --address 0x4200000000000000000000000000000000000023 --rpc-url http://127.0.0.1:9545
```

Sample output:

```
address: 0x4200000000000000000000000000000000000023
blockHash: 0x311f8ccea3fc121aa3af18e0a87766ae56ed3f1d08cae91ec29f34a9919abcc0
blockNumber: 14
data: 0x0000000000000000000000004200000000000000000000000000000000000028000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000847cfd6dbc000000000000000000000000420beef000000000000000000000000000000001000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb9226600000000000000000000000000000000000000000000000000000000000003e800000000000000000000000000000000000000000000000000000000
logIndex: 2
removed: false
topics: [
  0x382409ac69001e11931a28435afef442cbfd20d9891907e8fa373ba7d351f320
  0x0000000000000000000000000000000000000000000000000000000000000386
  0x0000000000000000000000004200000000000000000000000000000000000028
  0x0000000000000000000000000000000000000000000000000000000000000000
]
transactionHash: 0x746a3e8a3a0ed0787367c3476269fa3050a2f9113637b563a4579fbc03efe5c4
transactionIndex: 0
```

### 5. Retrieve the block timestamp the log was emitted in

Since the message identifier requires the block timestamp, fetch the block info to get the timestamp.

```sh
cast block 0xREPLACE_WITH_CORRECT_BLOCKHASH --rpc-url http://127.0.0.1:9545
```

Sample output:

```
// (truncated for brevity)

timestamp            1743801675

// ...
```

### 6. Prepare the message identifier & payload

Now we have all the information needed for the message (log) identifier.

| **Parameter** | **Value**                                  | **Note**                   |
|---------------|--------------------------------------------|----------------------------|
| origin        | 0x4200000000000000000000000000000000000023 | L2ToL2CrossDomainMessenger |
| blocknumber   | 14                                         | from step 4                |
| logIndex      | 2                                          | from step 4                |
| timestamp     | 1743801675                                 | from step 5                |
| chainid       | 901                                        | OPChainA chainID           |

The message payload is the concatenation of the [...topics, data] in order.

```
0x + 382409ac69001e11931a28435afef442cbfd20d9891907e8fa373ba7d351f320
   + 0000000000000000000000000000000000000000000000000000000000000386
   + 0000000000000000000000004200000000000000000000000000000000000028
   + 0000000000000000000000000000000000000000000000000000000000000000
   + 0000000000000000000000004200000000000000000000000000000000000028000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000847cfd6dbc000000000000000000000000420beef000000000000000000000000000000001000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb9226600000000000000000000000000000000000000000000000000000000000003e800000000000000000000000000000000000000000000000000000000
```

Payload:
```
0x382409ac69001e11931a28435afef442cbfd20d9891907e8fa373ba7d351f3200000000000000000000000000000000000000000000000000000000000000386000000000000000000000000420000000000000000000000000000000000002800000000000000000000000000000000000000000000000000000000000000000000000000000000000000004200000000000000000000000000000000000028000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000847cfd6dbc000000000000000000000000420beef000000000000000000000000000000001000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb9226600000000000000000000000000000000000000000000000000000000000003e800000000000000000000000000000000000000000000000000000000
```

### 7. Construct the access list for the message

An access list must be passed along with the relay message tx. There are two admin RPC methods that can be used to construct the access list: `admin_getAccessListByMsgHash` and `admin_getAccessListForIdentifier` and.

a. To get the access list using the `admin_getAccessListByMsgHash` RPC method, call the method with the message hash. 

1. Retrieve the message hash from the supersim logs

```sh
INFO [04-04|14:21:15.587] L2ToL2CrossChainMessenger#SentMessage    sourceChainID=901 destinationChainID=902 nonce=0 sender=0x4200000000000000000000000000000000000028 target=0x4200000000000000000000000000000000000028 msgHash=0xccff97c17ef11d659d319cbc5780235ea03ef34b0fa34f40b208a9519f257379 txHash=0x746a3e8a3a0ed0787367c3476269fa3050a2f9113637b563a4579fbc03efe5c4
```

2. Call `admin_getAccessListByMsgHash` with the message hash.

```sh
cast rpc admin_getAccessListByMsgHash 0xccff97c17ef11d659d319cbc5780235ea03ef34b0fa34f40b208a9519f257379 --rpc-url http://localhost:8420
```

Sample output:

```
{
  "accessList": [
    {
      "address": "0x4200000000000000000000000000000000000022",
      "storageKeys": [
        "0x010000000000000000000385000000000000000e0000000067f04d4b00000002",
        "0x03c6d2648cef120ce1d7ccf9f8d4042d6b25ff30a02e22d9ea2a47d2677ccb8d"
      ]
    }
  ]
}
```

b. To get the access list using the `admin_getAccessListForIdentifier` RPC method, call the method with the identifier and the message payload.

```sh
cast rpc admin_getAccessListForIdentifier \
'{
  "origin": "0x4200000000000000000000000000000000000023",
  "blockNumber": "14",
  "logIndex": "2",
  "timestamp": "1743801675",
  "chainId": "901",
  "payload": "0x382409ac69001e11931a28435afef442cbfd20d9891907e8fa373ba7d351f3200000000000000000000000000000000000000000000000000000000000000386000000000000000000000000420000000000000000000000000000000000002800000000000000000000000000000000000000000000000000000000000000000000000000000000000000004200000000000000000000000000000000000028000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000847cfd6dbc000000000000000000000000420beef000000000000000000000000000000001000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb9226600000000000000000000000000000000000000000000000000000000000003e800000000000000000000000000000000000000000000000000000000"
}' \
--rpc-url http://localhost:8420
```

Sample output:

```
{
  "accessList": [
    {
      "address": "0x4200000000000000000000000000000000000022",
      "storageKeys": [
        "0x010000000000000000000385000000000000000e0000000067f04d4b00000002",
        "0x03c6d2648cef120ce1d7ccf9f8d4042d6b25ff30a02e22d9ea2a47d2677ccb8d"
      ]
    }
  ]
}
```

### 8. Send the relay message transaction

Call `relayMessage` on the [L2ToL2CrossDomainMessenger](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L2/L2ToL2CrossDomainMessenger.sol) with the access list.

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

- `ICrossL2Inbox.Identifier calldata _id`: identifier pointing to the `SentMessage` log on the source chain (from [step 6](#6-prepare-the-message-identifier--payload))
- `bytes memory _sentMessage`: message payload (from [step 6](#6-prepare-the-message-identifier--payload))

Below is an example call, but make sure to replace them with the correct values you received in previous steps.

```sh
cast send 0x4200000000000000000000000000000000000023 \
    "relayMessage((address, uint256, uint256, uint256, uint256), bytes)" \
    "(0x4200000000000000000000000000000000000023, 14, 2, 1743801675, 901)" \
    0x382409ac69001e11931a28435afef442cbfd20d9891907e8fa373ba7d351f3200000000000000000000000000000000000000000000000000000000000000386000000000000000000000000420000000000000000000000000000000000002800000000000000000000000000000000000000000000000000000000000000000000000000000000000000004200000000000000000000000000000000000028000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000847cfd6dbc000000000000000000000000420beef000000000000000000000000000000001000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb9226600000000000000000000000000000000000000000000000000000000000003e800000000000000000000000000000000000000000000000000000000 \
    --access-list '[{"address":"0x4200000000000000000000000000000000000022","storageKeys":["0x010000000000000000000385000000000000000e0000000067f04d4b00000002", "0x03c6d2648cef120ce1d7ccf9f8d4042d6b25ff30a02e22d9ea2a47d2677ccb8d"]}]' \
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
- [use `viem` bindings/actions](relay-using-viem.md) - if you're using typescript, we have bindings available to make fetching identifiers and relaying messages easy.
