# Bridging ETH

Crosschain ETH transfers in the Superchain are facilitated through the [SuperchainWETH](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L2/SuperchainWETH.sol) contract. For more information on this checkout the spec for SuperchainWETH: https://specs.optimism.io/interop/superchain-weth.html.

## Cross-chain ETH transfer from chain 901 to 902

This outlines how to send native ETH from chain 901 to 902. To simplify these steps supersim will be run with the `--interop.autorelay` flag. The `--interop.autorelay` flag automatically triggers the relay message transaction once the initial send transaction is completed on the source chain, improving the developer experience by removing the need to manually send the relay message.

**Note**: If the source chain uses native ETH as their gas token, but the destination chain uses a custom gas token, then the recipient will receive `SuperchainWETH` on the destination chain.

### 1. Start `supersim` with the autorelayer enabled

```sh
supersim --interop.autorelay 
```


### 2. Initiate the send transaction on chain 901 through `SuperchainWETH` contract deployed at `0x4200000000000000000000000000000000000024`

Send ETH from Chain 901 to Chain 902 using the following command:

```sh
cast send 0x4200000000000000000000000000000000000024 "sendETH(address _to, uint256 _chainId)" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 902 --value 10ether --rpc-url http://127.0.0.1:9545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

### 3. Wait for the relayed message to appear on chain 902

In a few seconds, you should see the relayed message on chain 902:

```sh
# example
INFO [12-02|14:53:02.434] SuperchainWETH#RelayETH chain.id=902 from=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 to=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 amount=10,000,000,000,000,000,000 source=901
```

### 4. Check the balance on chain 902

Verify that the balance of the ETH on chain 902 has increased:

```sh
cast balance 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --rpc-url http://127.0.0.1:9546
```
