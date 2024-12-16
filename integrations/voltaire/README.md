# Voltaire Bundler
Modular and lighting-fast Python Bundler for Ethereum EIP-4337 Account Abstraction

## Deployment
Run a Voltaire bundler docker container for each of the 3 chains by running the start_bundlers.sh script
```
source start_bundlers.sh
```
## See logs

### see L1Chain bundler logs:
```docker logs -f L1Chain_Bundler```

### see OPChainA bundler logs:
```docker logs -f OPChainA_Bundler```

### see OPChainb bundler logs:
```docker logs -f OPChainB_Bundler```

## Stop the 3 bundlers

Stop Voltaire bundler docker container for each of the 3 chains by running the stop_bundlers.sh script

```
source stop_bundlers.sh
```

If you are using fork mode, you can modify the start_bundlers.sh script for the target chains.

## rpc url

### L1Chain bundler rpc url: http://127.0.0.1:3000/rpc

### OpChainA bundler rpc url: http://127.0.0.1:3001/rpc

### OpChainB bundler rpc url: http://127.0.0.1:3002/rpc

# docs

Voltaire github: https://github.com/candidelabs/voltaire

Candide Atelier: https://docs.candide.dev/

Bundler rpc docs: https://docs.candide.dev/wallet/bundler/rpc-methods/

# Notes
* Voltaire supports both Entrypoint v0.6.0 and v0.7.0
* Bundlers are running in the unsafe mode as debug_traceCall with javascript tracer is not supported in anvil currently