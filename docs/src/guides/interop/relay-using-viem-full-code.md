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