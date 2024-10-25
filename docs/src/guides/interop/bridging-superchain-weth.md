# Bridging SuperchainWETH

Crosschain ETH transfers in the Superchain are facilitated through the SuperchainWETH contract. For more information on this checkout the spec for SuperchainWETH: https://specs.optimism.io/interop/superchain-weth.html.

## Send native ETH from chain 901 to 902 via SuperchainWETH

This outlines how to send native ETH from chain 901 to 902. To simplify these steps supersim will be run with the `--interop.autorelay` flag. The `--interop.autorelay` flag automatically triggers the relay message transaction once the initial send transaction is completed on the source chain, improving the developer experience by removing the need to manually send the relay message.

### 1. Start `supersim` with the autorelayer enabled

```sh
supersim --interop.autorelay 
```

### 2. Wrap the native ETH to SuperchainWETH on chain 901

Wrap 10 ETH to `SuperchainWETH`. The `SuperchainWETH` contract is a predeploy at address `0x4200000000000000000000000000000000000024`

```sh
cast send 0x4200000000000000000000000000000000000024 "deposit()" --value 10ether --rpc-url http://127.0.0.1:9545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 
```

### 3. Check balance of SuperchainWETH on chain 901

Verify that the balance of the SuperchainWETH on chain 901 has increased by `10000000000000000000`:

```sh
cast balance --erc20 0x4200000000000000000000000000000000000024 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --rpc-url http://127.0.0.1:9545
```

### 4. Initiate the send transaction on chain 901 through the SuperchainTokenBridge

```sh
cast send 0x4200000000000000000000000000000000000028 "sendERC20(address _token, address _to, uint256 _amount, uint256 _chainId)" 0x4200000000000000000000000000000000000024  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 10000000000000000000 902 --rpc-url http://127.0.0.1:9545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

**5. Wait for the relayed message to appear on chain 902** 

In a few seconds, you should see the RelayedMessage on chain 902:

```sh
# example
INFO [08-30|14:30:14.698] SuperchainWETH#CrosschainMint to=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 amount=10,000,000,000,000,000,000
```

**6. Check the balance of SuperchainWETH on chain 902** 

Verify that the balance of SuperchainWETH on chain 902 has increased by 10000000000000000000:

```sh
cast balance --erc20 0x4200000000000000000000000000000000000024 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --rpc-url http://127.0.0.1:9546
```

**7. Unwrap the SuperchainWETH to native ETH on chain 902**

```sh
cast send 0x4200000000000000000000000000000000000024 "withdraw(uint256)" 10000000000000000000 --rpc-url http://127.0.0.1:9546 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 
```

**8. Check the balance of ETH on chain 902**
Verify that the balance of ETH on chain 902 has increased:
```sh
cast balance 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --rpc-url http://127.0.0.1:9546
```

## (Experimental) auto-wrapping and unwrapping of native ETH and sending from chain 901 to 902 using L2 to L2 message passing

### Note: this example uses a contract `SuperchainETHWrapper` written for prototyping and testing purposes. This contract has not been audited and it may contain bugs or security vulnerabilities. We are not liable for any issues arising from its use. It is strongly advised that this contract not be used with actual funds and should only be used for testing on testnets or in a controlled development environment. This contract is deployed at a special address `0x420beeF000000000000000000000000000000002` only on the vanilla version of supersim and will not be found at this address in fork mode or in any other environments outside of supersim.

In a typical L2 to L2 ETH cross-chain transfer, four transactions are required:

1. Wrap Native ETH to SuperchainWETH on source chain
2. Send SuperchainWETH to recipient using SuperchainTokenBridge#SendERC20
3. Relay message transaction on the destination chain to receive SuperchainWETH on destination
4. Unwrap SuperchainWETH to ETH on destination chain

To simplify this process, you can use the `SuperchainETHWrapper` and the `--interop.autorelay` flag to get this down to just one step. The `SuperchainETHWrapper#SendETH` function handles wrapping the native ETH to SuperchainWETH and initiating the message to relay and unwrap the SuperchainWETH on the destination. The `--interop.autorelay` flag automatically triggers the relay message transaction once the initial send transaction is completed on the source chain, improving the developer experience by removing the need to manually send the relay message.

### 1. Start `supersim` with the autorelayer enabled

```sh
supersim --interop.autorelay 
```

### 2. Initiate the send transaction on chain 901

Send ETH from Chain 901 to account `0xCE35738E4bC96bB0a194F71B3d184809F3727f56` on Chain 902 using the following command:

```sh
cast send 0x420beeF000000000000000000000000000000002 "sendETH(address,uint256,bytes)" 0xCE35738E4bC96bB0a194F71B3d184809F3727f56 902 0x --value 10ether --rpc-url http://127.0.0.1:9545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

### 3. Wait for the relayed message to appear on chain 902

In a few seconds, you should see the RelayedMessage on chain 902:

```sh
# example
INFO [08-30|14:30:14.698] SuperchainWETH#CrosschainMint to=0x420bEEF000000000000000000000000000000002 amount=10,000,000,000,000,000,000
```

### 4. Check the balance on chain 902

Verify that the balance of ETH for account 0xCE35738E4bC96bB0a194F71B3d184809F3727f56 on chain 902 has increased:

```sh
cast balance 0xCE35738E4bC96bB0a194F71B3d184809F3727f56 --rpc-url http://127.0.0.1:9546
```