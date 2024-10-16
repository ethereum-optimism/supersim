<!-- omit in toc -->
# Using `viem` to relay interop messages (TypeScript)

This guide describes how to use [`viem`](https://viem.sh/) to send and relay interop messages using the `L2ToL2CrossDomainMessenger`

We'll perform the SuperchainERC20 interop transfer in [First steps](../../getting-started/first-steps.md#send-an-interoperable-superchainerc20-token-from-chain-901-to-902-l2-to-l2-message-passing) and [Manually relaying interop messages with `cast`](./manually-relaying-interop-messages-cast.md) again, this time using `viem` to relay the message without the autorelayer.

- [Steps](#steps)
  - [1. Start `supersim`](#1-start-supersim)
  - [2. Install TypeScript packages](#2-install-typescript-packages)
  - [3. Define chains and constants](#3-define-chains-and-constants)
  - [4. Mint and send `L2NativeSuperchainERC20` on source chain](#4-mint-and-send-l2nativesuperchainerc20-on-source-chain)
  - [5. Relay the message on the destination chain](#5-relay-the-message-on-the-destination-chain)
- [Full code snippet](#full-code-snippet)


## Steps

The full code snippet can be found [here](#full-code-snippet)

### 1. Start `supersim`

```sh
supersim
```

### 2. Install TypeScript packages
```sh
npm i viem @eth-optimism/viem
```

### 3. Imports & Setup
```ts
import {
	http,
	encodeFunctionData,
	createWalletClient,
	parseAbi,
	defineChain,
	publicActions,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import {
    contracts,
	publicActionsL2,
	walletActionsL2,
    supersimL2A,
    supersimL2B,
    createInteropSentL2ToL2Messages,
    decodeRelayedL2ToL2Messages,
} from "@eth-optimism/viem";

// SuperERC20 is in development so we manually define the address here
const L2_NATIVE_SUPERCHAINERC20_ADDRESS = "0x420beeF000000000000000000000000000000001";
const SUPERCHAIN_TOKEN_BRIDGE_ADDRESS = "0x4200000000000000000000000000000000000028";

// Account for 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
const account = privateKeyToAccount("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");

// Define chains
// ... left out as we'll use the supersim chain definitions

// Configure clients with optimism extension
const opChainAClient = createWalletClient({
	transport: http(),
	chain: supersimL2A,
	account,
}).extend(walletActionsL2())
	.extend(publicActionsL2())
	.extend(publicActions);

const opChainBClient = createWalletClient({
	transport: http(),
	chain: superismL2B,
	account,
}).extend(walletActionsL2())
	.extend(publicActionsL2())
	.extend(publicActions);
```

### 4. Mint and Bridge `L2NativeSuperchainERC20` from source chain
```ts
// #######
// OP Chain A
// #######

// 1. Mint 1000 `L2NativeSuperchainERC20` token on chain A

const mintTxHash = await opChainAClient.writeContract({
	address: L2_NATIVE_SUPERCHAINERC20_ADDRESS,
	abi: parseAbi(["function mint(address to, uint256 amount)"]),
	functionName: "mint",
	args: [account.address, 1000n],
});

await opChainAClient.waitForTransactionReceipt({ hash: mintTxHash });

// 2. Initiate sendERC20 tx to bridge funds to chain B

console.log("Initiating sendERC20 on OPChainA to OPChainB...");
const sendERC20TxHash = await opChainAClient.writeContract({
	address: SUPERCHAIN_TOKEN_BRIDGE_ADDRESS,
	abi: parseAbi([
		"function sendERC20(address _token, address _to, uint256 _amount, uint256 _chainId)",
	]),
	functionName: "sendERC20",
	args: [L2_NATIVE_SUPERCHAINERC20_ADDRESS, account.address, 1000n, BigInt(supersimL2B.id)],
});

const sendERC20Receipt = await opChainAClient.waitForTransactionReceipt({ hash: sendERC20TxHash });

// 3. Construct the interoperable log data from the sent message

const { sentMessages } = await createInteropSentL2ToL2Messages(opChainAClient, { receipt: sendERC20Receipt })
const sentMessage = sentMessages[0] // We only sent 1 message
```

### 5. Relay the sent message on the destination chain
```ts

// ##########
// OP Chain B
// ##########

// 4. Relay the sent message

console.log("Relaying message on OPChainB...");
const relayTxHash = await opChainBClient.relayL2ToL2Message({
    sentMessageId: sentMessage.id,
    sentMessagePayload: sentMessage.payload,
});

const relayReceipt = await opChainBClient.waitForTransactionReceipt({ hash: relayTxHash });

// 5. Ensure the message was relayed successfully

const { successfulMessages, failedMessages } = decodeRelayedL2ToL2Messages({ receipt: relayReceipt });
if (successfulMessages.length != 1) {
    throw new Error("failed to relay message!")
}

// 6. Check balance on OPChainB
const balance = await opChainBClient.readContract({
	address: L2_NATIVE_SUPERCHAINERC20_ADDRESS,
	abi: parseAbi(["function balanceOf(address) view returns (uint256)"]),
	functionName: "balanceOf",
	args: [account.address],
});

console.log(`Balance on OPChainB: ${balance}`);
```


## Full code snippet

<details>
  <summary>Click to view</summary>

```ts
// Using viem to transfer L2NativeSuperchainERC20

import {
	http,
	encodeFunctionData,
	createWalletClient,
	parseAbi,
	defineChain,
	publicActions,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import {
    contracts,
	publicActionsL2,
	walletActionsL2,
    supersimL2A,
    supersimL2B,
    createInteropSentL2ToL2Messages,
    decodeRelayedL2ToL2Messages,
} from "@eth-optimism/viem";

// SuperERC20 is in development so we manually define the address here
const L2_NATIVE_SUPERCHAINERC20_ADDRESS =
	"0x420beeF000000000000000000000000000000001";

// account for 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
const account = privateKeyToAccount("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");

// Define chains
// ... left out as we'll use the supersim chain definitions

// Configure op clients
const opChainAClient = createWalletClient({
	transport: http(),
	chain: supersimL2A,
	account,
}).extend(walletActionsL2())
	.extend(publicActionsL2())
	.extend(publicActions);

const opChainBClient = createWalletClient({
	transport: http(),
	chain: supersimL2B,
	account,
}).extend(walletActionsL2())
	.extend(publicActionsL2())
	.extend(publicActions);

// #######
// OP Chain A
// #######

// 1. Mint 1000 `L2NativeSuperchainERC20` token

const mintTxHash = await opChainAClient.writeContract({
	address: L2_NATIVE_SUPERCHAINERC20_ADDRESS,
	abi: parseAbi(["function mint(address to, uint256 amount)"]),
	functionName: "mint",
	args: [account.address, 1000n],
});

await opChainAClient.waitForTransactionReceipt({ hash: mintTxHash });

// 2. Initiate sendERC20 tx to bridge funds to chain B

console.log("Initiating sendERC20 on OPChainA...");
const sendERC20TxHash = await opChainAClient.writeContract({
	address: SUPERCHAIN_TOKEN_BRIDGE_ADDRESS,
	abi: parseAbi([
		"function sendERC20(address _token, address _to, uint256 _amount, uint256 _chainId)",
	]),
	functionName: "sendERC20",
	args: [L2_NATIVE_SUPERCHAINERC20_ADDRESS, account.address, 1000n, BigInt(supersimL2B.id)],
});

const sendERC20Receipt = await opChainAClient.waitForTransactionReceipt({ hash: sendERC20TxHash });

// 3. Construct the interoperable log data from the sent message

const { sentMessages } = await createInteropSentL2ToL2Messages(opChainAClient, { receipt: sendERC20Receipt })
const sentMessage = sentMessages[0] // We only sent 1 message

// ##########
// OP Chain B
// ##########

// 4. Relay the sent message

console.log("Relaying message on OPChainB...");
const relayTxHash = await opChainBClient.relayL2ToL2Message({
    sentMessageId: sentMessage.id,
    sentMessagePayload: sentMessage.payload,
});

const relayReceipt = await opChainBClient.waitForTransactionReceipt({ hash: relayTxHash });

// 5. Ensure the message was relayed successfully

const { successfulMessages, failedMessages } = decodeRelayedL2ToL2Messages({ receipt: relayReceipt });
if (successfulMessages.length != 1) {
    throw new Error("failed to relay message!")
}

// 6. Check balance on OPChainB
const balance = await opChainBClient.readContract({
	address: L2_NATIVE_SUPERCHAINERC20_ADDRESS,
	abi: parseAbi(["function balanceOf(address) view returns (uint256)"]),
	functionName: "balanceOf",
	args: [account.address],
});

console.log(`Balance on OPChainB: ${balance}`);
```
