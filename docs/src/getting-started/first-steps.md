# First steps

`supersim` allows testing multichain features **locally**. Previously, testing multichain features required complex docker setups or using a testnet.

To see it in practice, let's first try sending some ETH from the L1 to the L2.

## Deposit ETH from the L1 into the L2 (L1 to L2 message passing)

### 1. Call `bridgeETH` function on the `L1StandardBridgeProxy` contract on the L1 (chain 900)

Initiate a bridge transaction on the L1:

```sh
cast send 0xa01ae68902e205B420FD164435F299E07b0C778b "bridgeETH(uint32 _minGasLimit, bytes calldata _extraData)" 50000 0x --value 0.1ether --rpc-url http://127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

### 2. Check the balance on the L2 (chain 901)

Verify that the ETH balance of the sender has increased on the L2:

```sh
cast balance 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --rpc-url http://127.0.0.1:9545
```

Now that you know how to pass messages from the L1 to the L2, let's try a sending an L2 to L2 message!

## Send an interoperable SuperchainERC20 token from chain 901 to 902 (L2 to L2 message passing)

In a typical L2 to L2 cross-chain transfer, two transactions are required:

1. Send transaction on the source chain – This initiates the token transfer on Chain 901.
2. Relay message transaction on the destination chain – This relays the transfer details to Chain 902.

To simplify this process, you can use the `--interop.autorelay` flag. This flag automatically triggers the relay message transaction once the initial send transaction is completed on the source chain, improving the developer experience by removing the need to manually send the relay message.

### 1. Start `supersim` with the autorelayer enabled

```sh
supersim --interop.autorelay 
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

### 4. Wait for the relayed message to appear on chain 902

In a few seconds, you should see the RelayedMessage on chain 902:

```sh
# example
INFO [08-30|14:30:14.698] L2ToL2CrossChainMessenger#RelayedMessage sourceChainID=901 destinationChainID=902 nonce=0 sender=0x420beeF000000000000000000000000000000001 target=0x420beeF000000000000000000000000000000001
```

### 5. Check the balance on chain 902

Verify that the balance of the L2NativeSuperchainERC20 on chain 902 has increased:

```sh
cast balance --erc20 0x420beeF000000000000000000000000000000001 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --rpc-url http://127.0.0.1:9546
```

With the steps above, you've now successfully completed both an L1 to L2 ETH bridge and an L2 to L2 interoperable SuperchainERC20 token transfer, all done locally using `supersim`. This approach simplifies multichain testing, allowing you to focus on development without the need for complex setups or relying on external testnets.
