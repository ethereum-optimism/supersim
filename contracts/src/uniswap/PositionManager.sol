// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.26;

import {ERC20} from "@solady-v0.0.245/tokens/ERC20.sol";

import {IPoolManager} from "@uniswap-v4-core/interfaces/IPoolManager.sol";
import {Currency} from "@uniswap-v4-core/types/Currency.sol";

import {PositionManager as PositionManagerCore} from "@uniswap-v4-periphery/PositionManager.sol";
import {IPositionDescriptor} from "@uniswap-v4-periphery/interfaces/IPositionDescriptor.sol";
import {IWETH9} from "@uniswap-v4-periphery/interfaces/external/IWETH9.sol";

import {IAllowanceTransfer} from "@permit2/interfaces/IAllowanceTransfer.sol";

import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";
import {Preinstalls} from "@contracts-bedrock/libraries/Preinstalls.sol";

contract PositionManager is PositionManagerCore {
    /// @notice Permit2 address.
    IAllowanceTransfer internal constant _permit2 = IAllowanceTransfer(Preinstalls.Permit2);

    /// @notice WETH address in the superchain
    IWETH9 internal constant _weth = IWETH9(Predeploys.WETH);

    /// @notice Construct the PositionsManager with some set default values.
    constructor(IPoolManager _poolManager, IPositionDescriptor _tokenDescriptor)
        PositionManagerCore(_poolManager, _permit2, 300_000, _tokenDescriptor, _weth) {}

    /**
     * @notice The version of this that is built in supersim utilizes transferFrom directly on the erc20 versus permit2. However,
     * this does not compile since _pay is not marked as virtual. Add the modifier directly to the function within `lib/uniswap-v4-periphery`
     * in order to get the version used in supersim
     */
    function _pay(Currency token, address payer, uint256 amount) internal override {
        if (payer == address(this)) {
            token.transfer(address(poolManager), amount);
        } else {
            // @dev supersim version swaps the permit2 with a direct transferFrom call
            //ERC20(Currency.unwrap(token)).transferFrom(payer, address(poolManager), amount);
            _permit2.transferFrom(payer, address(poolManager), uint160(amount), Currency.unwrap(token));
        }
    }
}