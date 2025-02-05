IMAGE_NAME=ghcr.io/candidelabs/voltaire/voltaire-bundler:0.1.0a36
RPC_URL=127.0.0.1
SECRET=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

L1Chain_PORT=3000
L1Chain_NODE=http://127.0.0.1:8545
L1Chain_CHAIN_ID=900

docker run --name L1Chain_Bundler --rm --net=host \
    -d $IMAGE_NAME \
    --bundler_secret $SECRET \
    --rpc_url $RPC_URL \
    --rpc_port $L1Chain_PORT \
    --ethereum_node_url $L1Chain_NODE \
    --chain_id $L1Chain_CHAIN_ID \
    --unsafe \
    --verbose

OPChainA_PORT=3001
OPChainA_NODE=http://127.0.0.1:9545
OPChainA_CHAIN_ID=901

docker run --name OPChainA_Bundler --rm --net=host \
    -d $IMAGE_NAME \
    --bundler_secret $SECRET \
    --rpc_url $RPC_URL \
    --rpc_port $OPChainA_PORT \
    --ethereum_node_url $OPChainA_NODE \
    --chain_id $OPChainA_CHAIN_ID \
    --unsafe \
    --verbose

OPChainB_PORT=3002
OPChainB_NODE=http://127.0.0.1:9546
OPChainB_CHAIN_ID=902

docker run --name OPChainB_Bundler --rm --net=host \
    -d $IMAGE_NAME \
    --bundler_secret $SECRET \
    --rpc_url $RPC_URL \
    --rpc_port $OPChainB_PORT \
    --ethereum_node_url $OPChainB_NODE \
    --chain_id $OPChainB_CHAIN_ID \
    --unsafe \
    --verbose
