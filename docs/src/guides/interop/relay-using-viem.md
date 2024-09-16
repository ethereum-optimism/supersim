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

### 3. Define chains and constants

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
	publicActionsL2,
	walletActionsL2,
	extractMessageIdentifierFromLogs,
} from "@eth-optimism/viem";
import { anvil } from "viem/chains";

// Define constants - L2NativeSuperchainERC20 contract address is the same on every chain
const L2_NATIVE_SUPERCHAINERC20_ADDRESS =
	"0x61a6eF395d217eD7C79e1B84880167a417796172";

const L2_TO_L2_CROSS_DOMAIN_MESSENGER_ADDRESS =
	"0x4200000000000000000000000000000000000023";

// account for 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
const account = privateKeyToAccount(
	"0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
);

// Define chains
const opChainA = defineChain({
	...anvil,
	id: 901,
	name: "OPChainA",
	rpcUrls: {
		default: {
			http: ["http://127.0.0.1:9545"],
		},
	},
});

const opChainB = defineChain({
	...anvil,
	id: 902,
	name: "OPChainB",
	rpcUrls: {
		default: {
			http: ["http://127.0.0.1:9546"],
		},
	},
});

// Configure op clients
const opChainAClient = createWalletClient({
	transport: http(),
	chain: opChainA,
	account,
})
	.extend(walletActionsL2())
	.extend(publicActionsL2())
	.extend(publicActions);

const opChainBClient = createWalletClient({
	transport: http(),
	chain: opChainB,
	account,
})
	.extend(walletActionsL2())
	.extend(publicActionsL2())
	.extend(publicActions);
```

### 4. Mint and send `L2NativeSuperchainERC20` on source chain

```ts
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

// 2. Initiate sendERC20 tx
console.log("Initiating sendERC20 on OPChainA...");
const sendERC20TxHash = await opChainAClient.writeContract({
	address: L2_NATIVE_SUPERCHAINERC20_ADDRESS,
	abi: parseAbi([
		"function sendERC20(address _to, uint256 _amount, uint256 _chainId)",
	]),
	functionName: "sendERC20",
	args: [account.address, 1000n, BigInt(opChainB.id)],
});

const sendERC20TxReceipt = await opChainAClient.waitForTransactionReceipt({
	hash: sendERC20TxHash,
});

// 3. Grab the message identifier from the logs
const { id: messageIdentifier, payload: l2ToL2CrossDomainMessengerCalldata } =
	await extractMessageIdentifierFromLogs(opChainAClient, {
		receipt: sendERC20TxReceipt,
	});

```

### 5. Relay the message on the destination chain

```ts

// ##########
// OP Chain B
// ##########

// 4. Execute the relayERC20 function on OPChainB
console.log("Building execute relayERC20 on OPChainB...");
const executeArgs = await opChainBClient.buildExecuteL2ToL2Message({
	id: messageIdentifier,
	target: L2_TO_L2_CROSS_DOMAIN_MESSENGER_ADDRESS,
	message: l2ToL2CrossDomainMessengerCalldata,
});

console.log("Executing L2 to L2 message on OPChainB...");

const executeTxHash = await opChainBClient.executeL2ToL2Message(executeArgs);

await opChainBClient.waitForTransactionReceipt({
	hash: executeTxHash,
});

// 5. Check balance on OPChainB
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
	publicActionsL2,
	walletActionsL2,
	extractMessageIdentifierFromLogs,
} from "@eth-optimism/viem";
import { anvil } from "viem/chains";

// Define constants - L2NativeSuperchainERC20 contract address is the same on every chain
const L2_NATIVE_SUPERCHAINERC20_ADDRESS =
	"0x61a6eF395d217eD7C79e1B84880167a417796172";

const L2_TO_L2_CROSS_DOMAIN_MESSENGER_ADDRESS =
	"0x4200000000000000000000000000000000000023";

// account for 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
const account = privateKeyToAccount(
	"0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
);

// Define chains
const opChainA = defineChain({
	...anvil,
	id: 901,
	name: "OPChainA",
	rpcUrls: {
		default: {
			http: ["http://127.0.0.1:9545"],
		},
	},
});

const opChainB = defineChain({
	...anvil,
	id: 902,
	name: "OPChainB",
	rpcUrls: {
		default: {
			http: ["http://127.0.0.1:9546"],
		},
	},
});

// Configure op clients
const opChainAClient = createWalletClient({
	transport: http(),
	chain: opChainA,
	account,
})
	.extend(walletActionsL2())
	.extend(publicActionsL2())
	.extend(publicActions);

const opChainBClient = createWalletClient({
	transport: http(),
	chain: opChainB,
	account,
})
	.extend(walletActionsL2())
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

// 2. Initiate sendERC20 tx
console.log("Initiating sendERC20 on OPChainA...");
const sendERC20TxHash = await opChainAClient.writeContract({
	address: L2_NATIVE_SUPERCHAINERC20_ADDRESS,
	abi: parseAbi([
		"function sendERC20(address _to, uint256 _amount, uint256 _chainId)",
	]),
	functionName: "sendERC20",
	args: [account.address, 1000n, BigInt(opChainB.id)],
});

const sendERC20TxReceipt = await opChainAClient.waitForTransactionReceipt({
	hash: sendERC20TxHash,
});

// 3. Grab the message identifier from the logs
const { id: messageIdentifier, payload: l2ToL2CrossDomainMessengerCalldata } =
	await extractMessageIdentifierFromLogs(opChainAClient, {
		receipt: sendERC20TxReceipt,
	});

// ##########
// OP Chain B
// ##########
// 4. Execute the relayERC20 function on OPChainB
console.log("Building execute relayERC20 on OPChainB...");
const executeArgs = await opChainBClient.buildExecuteL2ToL2Message({
	id: messageIdentifier,
	target: L2_TO_L2_CROSS_DOMAIN_MESSENGER_ADDRESS,
	message: l2ToL2CrossDomainMessengerCalldata,
});

console.log("Executing L2 to L2 message on OPChainB...");

const executeTxHash = await opChainBClient.executeL2ToL2Message(executeArgs);

await opChainBClient.waitForTransactionReceipt({
	hash: executeTxHash,
});

// 5. Check balance on OPChainB
const balance = await opChainBClient.readContract({
	address: L2_NATIVE_SUPERCHAINERC20_ADDRESS,
	abi: parseAbi(["function balanceOf(address) view returns (uint256)"]),
	functionName: "balanceOf",
	args: [account.address],
});

console.log(`Balance on OPChainB: ${balance}`);

```