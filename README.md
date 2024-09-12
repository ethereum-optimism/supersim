# 🛠️ Supersim

Supersim is a lightweight tool to simulate the Superchain locally (with a single L1 and multiple OP-Stack L2s). Run multiple local nodes with one command, and coordinate message passing between them.



## ❓ Why Supersim?

While existing tools focus on isolated smart contract testing, Supersim provides a local development environment that mirrors the complex interactions of the Superchain ecosystem. Simulate entire cross-chain application flows, complete with deployed contracts, intricate message passing infrastructure, and OP-Stack specific logic with one command.

Multichain development offers unique challenges:
- Coordinating startup and running multiple local chains
- Deploying system contracts to mimic desired functionality
- Running local offchain services like message relayers

Supersim enables fast, local iteration on cross-chain features, with a simple developer interface.

## ✨ Features 

- spin up multiple anvil nodes
- predeployed OP Stack contracts and useful mock contracts (ERC20)
- fork multiple remote chains (fork the entire Superchain)
- simulate L1 <> L2 message passing (deposits)
- simulate L2 <> L2 message passing (interoperability) and auto-relayer

## 🚀 Getting Started

### 1. Install prerequisites: `foundry`

`supersim` requires `anvil` to be installed.

Follow the guide [here](https://book.getfoundry.sh/getting-started/installation) to install the Foundry toolchain, which includes `anvil`.

### 2. Install `supersim`

#### Precompiled Binaries

Download the executable for your platform from the [GitHub releases page](https://github.com/ethereum-optimism/supersim/releases).

#### Homebrew (OS X, Linux)

*Coming soon*

### 3. Start `supersim` in vanilla mode

```sh
supersim
```
Vanilla mode will start 3 chains, with the OP Stack contracts already deployed.

```
L1:
  Name: L1    Chain ID: 900    RPC: http://127.0.0.1:8545    LogPath: /var/folders/0w/ethers-phoenix/T/anvil-chain-900
L2:
  Name: OPChainA    Chain ID: 901    RPC: http://127.0.0.1:9545    LogPath: /var/folders/0w/ethers-phoenix/T/anvil-chain-901
  Name: OPChainB    Chain ID: 902    RPC: http://127.0.0.1:9546    LogPath: /var/folders/0w/ethers-phoenix/T/anvil-chain-902
```

### 4. Start testing multichain features 🚀

Some examples below! 

## 🔀 First steps

### Example A: (L1 to L2) Deposit ETH from the L1 into the L2 

**1. Call `bridgeETH` function on the `L1StandardBridgeProxy` contract on the L1 (chain 900)**

Initiate a bridge transaction on the L1:

```sh
cast send 0xa01ae68902e205B420FD164435F299E07b0C778b "bridgeETH(uint32 _minGasLimit, bytes calldata _extraData)" 50000 0x --value 0.1ether --rpc-url http://127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

**2. Check the balance on the L2 (chain 901)**

Verify that the ETH balance of the sender has increased on the L2:

```sh
cast balance 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --rpc-url http://127.0.0.1:9545
```

### Example B: (L2 to L2) Send an interoperable SuperchainERC20 token from chain 901 to 902

In a typical L2 to L2 cross-chain transfer, two transactions are required:

1. Send transaction on the source chain – This initiates the token transfer on Chain 901.
2. Relay message transaction on the destination chain – This relays the transfer details to Chain 902.

To simplify this process, you can use the `--interop.autorelay` flag. This flag automatically triggers the relay message transaction once the initial send transaction is completed on the source chain, improving the developer experience by removing the need to manually send the relay message.

**1. Start `supersim` with the autorelayer enabled.**

```
supersim --interop.autorelay 
```

**2. Mint tokens to transfer on chain 901**
Run the following command to mint 1000 tokens to the recipient address:

```sh
cast send 0x61a6eF395d217eD7C79e1B84880167a417796172 "mint(address _to, uint256 _amount)"  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 1000  --rpc-url http://127.0.0.1:9545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

```

**3. Initiate the send transaction on chain 901**

Send the tokens from Chain 901 to Chain 902 using the following command:

```sh
cast send 0x61a6eF395d217eD7C79e1B84880167a417796172 "sendERC20(address _to, uint256 _amount, uint256 _chainId)" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 1000 902 --rpc-url http://127.0.0.1:9545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

**4. Wait for the relayed message to appear on chain 902** 

In a few seconds, you should see the RelayedMessage on chain 902:

```sh
# example
INFO [08-30|14:30:14.698] L2ToL2CrossChainMessenger#RelayedMessage sourceChainID=901 destinationChainID=902 nonce=0 sender=0x61a6eF395d217eD7C79e1B84880167a417796172 target=0x61a6eF395d217eD7C79e1B84880167a417796172
```
**5. Check the balance on chain 902** 

Verify that the balance of the L2NativeSuperchainERC20 on chain 902 has increased:

```sh
cast balance --erc20 0x61a6eF395d217eD7C79e1B84880167a417796172 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --rpc-url http://127.0.0.1:9546
```


## 🌐 Fork mode

If you're relying on contracts already deployed on testnet / mainnet chains, use fork mode to simulate and interact with the state of the chain without needing to re-deploy or modify the contracts.

Locally fork any of the available chains in a superchain network of the [superchain registry](https://github.com/ethereum-optimism/superchain-registry), default `mainnet` versions. 

```
supersim fork --chains=op,base,zora
```

The fork height is determined by L1 block height (default `latest`), which determines the maximum timestamp for the forked L2 state of each chain.

```
Available Accounts
-----------------------
(0): 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
--- truncated for brevity ---

Private Keys
-----------------------
(0): 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
--- truncated for brevity ---

Orchestrator Config:
L1:
  Name: mainnet    Chain ID: 1    RPC: http://127.0.0.1:8545    LogPath: /var/folders/0w/ethers-phoenix/T/anvil-chain-1-1521250718
L2:
  Name: op    Chain ID: 10    RPC: http://127.0.0.1:9545    LogPath: /var/folders/0w/ethers-phoenix/T/anvil-chain-10
  Name: base    Chain ID: 8453    RPC: http://127.0.0.1:9546    LogPath: /var/folders/0w/ethers-phoenix/T/anvil-chain-8453
  Name: zora    Chain ID: 7777777    RPC: http://127.0.0.1:9547    LogPath: /var/folders/0w/ethers-phoenix/T/anvil-chain-7777777
```

### Note

By default, interop contracts are not deployed on forked networks. To include them, run supersim with the `--interop.enabled` flag

```sh
supersim fork --chains=op,base,zora --interop.enabled
```

## 💬 Join Discord
Join our discord [here](https://discord.gg/Scdnrw8d) and reach out to us in the [interop-devex](https://discord.com/channels/1244729134312198194/1255653436079210496) channel.

## 🤝 Contributing

Contributions are encouraged, but please open an issue before making any major changes to ensure your changes will be accepted.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contributing information.

## 📜 License

Files are licensed under the [MIT license](./LICENSE).

<a href="./LICENSE"><img src="https://user-images.githubusercontent.com/35039927/231030761-66f5ce58-a4e9-4695-b1fe-255b1bceac92.png" alt="License information" width="200" /></a>
