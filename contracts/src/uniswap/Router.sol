// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.26;

import {ERC20} from "@solady-v0.0.245/tokens/ERC20.sol";

import {Currency} from "@uniswap-v4-core/types/Currency.sol";
import {IPoolManager} from "@uniswap-v4-core/interfaces/IPoolManager.sol";

import {V4Router} from "@uniswap-v4-periphery/V4Router.sol";
import {ReentrancyLock} from "@uniswap-v4-periphery/base/ReentrancyLock.sol";

import {IAllowanceTransfer} from "@permit2/interfaces/IAllowanceTransfer.sol";

import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";
import {Preinstalls} from "@contracts-bedrock/libraries/Preinstalls.sol";

contract Router is V4Router, ReentrancyLock {
    /// @notice Permit2 address.
    IAllowanceTransfer internal constant _permit2 = IAllowanceTransfer(Preinstalls.Permit2);

    constructor(IPoolManager _manager) V4Router(_manager) {}

    function executeActions(bytes calldata params) external payable isNotLocked {
        _executeActions(params);
    }

    function msgSender() public view override returns (address) {
        return _getLocker();
    }

    receive() external payable {}

    function _pay(Currency token, address payer, uint256 amount) internal override {
        if (payer == address(this)) {
            token.transfer(address(poolManager), amount);
        } else {
            // @dev supersim version swaps the permit2 with a direct transferFrom call
            ERC20(Currency.unwrap(token)).transferFrom(payer, address(poolManager), amount);
            //_permit2.transferFrom(payer, address(poolManager), uint160(amount), Currency.unwrap(token));
        }
    }
}
