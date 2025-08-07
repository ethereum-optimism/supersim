# Installation

## 1. Prerequisites: `foundry`

`supersim` requires `anvil` to be installed.

Follow the guide [here](https://book.getfoundry.sh/getting-started/installation) to install the Foundry toolchain.

## 2. Install `supersim`

### Precompiled Binaries

Download the executable for your platform from the [GitHub releases page](https://github.com/ethereum-optimism/supersim/releases).

### Homebrew (OS X, Linux)

```sh
brew tap ethereum-optimism/tap
brew install supersim
```

If you are on WSL, install brew using 

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
and then run the commands given earlier.

## 3. Start `supersim` in vanilla mode

```sh
supersim
```

Vanilla mode will start 3 chains, with the OP Stack contracts already deployed.

- (1) L1 Chain
  - Chain 900
- (2) L2 Chains
  - Chain 901
  - Chain 902
