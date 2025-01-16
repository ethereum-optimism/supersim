// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {OptimismSuperchainERC20} from "@contracts-bedrock/L2/OptimismSuperchainERC20.sol";

/// @title L2NativeSuperchainERC20
/// @notice Mock implementation of a native Superchain ERC20 token that is L2 native (not backed by an L1 native token).
/// The mint/burn functionality is intentionally open to ANYONE to make it easier to test with. For production use,
/// this functionality should be restricted.
contract L2NativeSuperchainERC20 is OptimismSuperchainERC20 {
    constructor() OptimismSuperchainERC20() {
        this.initialize(address(0), "L2NativeOptimismSuperchainERC20", "MockSuperc20", 18);
    }
}
