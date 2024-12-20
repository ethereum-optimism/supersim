// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Test} from "forge-std/Test.sol";

import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";

import {ERC20} from "@solady-v0.0.245/tokens/ERC20.sol";

import {L2NativeSuperchainERC20, ZeroAddress} from "../src/L2NativeSuperchainERC20.sol";
import {IERC7802} from "@contracts-bedrock/L2/interfaces/IERC7802.sol";
import {ISuperchainERC20} from "@contracts-bedrock/L2/interfaces/ISuperchainERC20.sol";

contract L2NativeSuperchainERC20Test is Test {
    address internal constant ZERO_ADDRESS = address(0);
    address internal constant SUPERCHAIN_TOKEN_BRIDGE = Predeploys.SUPERCHAIN_TOKEN_BRIDGE;

    L2NativeSuperchainERC20 public superchainERC20;

    /// @notice Helper function to setup a mock and expect a call to it.
    function _mockAndExpect(address _receiver, bytes memory _calldata, bytes memory _returned) internal {
        vm.mockCall(_receiver, _calldata, _returned);
        vm.expectCall(_receiver, _calldata);
    }

    /// @notice Sets up the test suite.
    function setUp() public {
        superchainERC20 = new L2NativeSuperchainERC20();
    }

    function testFuzz_mint_succeeds(address _to, uint256 _amount) public {
        // Ensure `_to` is not the zero address
        vm.assume(_to != ZERO_ADDRESS);

        // Get the total supply and balance of `_to` before the mint to compare later on the assertions
        uint256 _totalSupplyBefore = superchainERC20.totalSupply();
        uint256 _toBalanceBefore = superchainERC20.balanceOf(_to);
        // Look for the emit of the `Transfer` event
        vm.expectEmit(true, true, true, true, address(superchainERC20));
        emit ERC20.Transfer(ZERO_ADDRESS, _to, _amount);

        // Look for the emit of the `Mint` event
        vm.expectEmit(true, true, true, true, address(superchainERC20));
        emit L2NativeSuperchainERC20.Mint(_to, _amount);

        superchainERC20.mint(_to, _amount);

        assertEq(superchainERC20.totalSupply(), _totalSupplyBefore + _amount);
        assertEq(superchainERC20.balanceOf(_to), _toBalanceBefore + _amount);
    }

    function testFuzz_mint_toZeroAddress_reverts(uint256 _amount) public {
        // Expect the revert with `ZeroAddress` selector
        vm.expectRevert(ZeroAddress.selector);

        // Call the `mint` function with the zero address
        superchainERC20.mint(ZERO_ADDRESS, _amount);
    }

    /// @notice Tests the `mint` function reverts when the caller is not the bridge.
    function testFuzz_crosschainMint_callerNotBridge_reverts(address _caller, address _to, uint256 _amount) public {
        // Ensure the caller is not the bridge
        vm.assume(_caller != SUPERCHAIN_TOKEN_BRIDGE);

        // Expect the revert with `Unauthorized` selector
        vm.expectRevert(ISuperchainERC20.Unauthorized.selector);

        // Call the `mint` function with the non-bridge caller
        vm.prank(_caller);
        superchainERC20.crosschainMint(_to, _amount);
    }

    function testFuzz_crosschainMint_succeeds(address _to, uint256 _amount) public {
        // Ensure `_to` is not the zero address
        vm.assume(_to != ZERO_ADDRESS);

        // Get the total supply and balance of `_to` before the mint to compare later on the assertions
        uint256 _totalSupplyBefore = superchainERC20.totalSupply();
        uint256 _toBalanceBefore = superchainERC20.balanceOf(_to);

        // Look for the emit of the `Transfer` event
        vm.expectEmit(true, true, true, true, address(superchainERC20));
        emit ERC20.Transfer(ZERO_ADDRESS, _to, _amount);

        // Look for the emit of the `Mint` event
        vm.expectEmit(true, true, true, true, address(superchainERC20));
        emit IERC7802.CrosschainMint(_to, _amount, SUPERCHAIN_TOKEN_BRIDGE);

        vm.prank(SUPERCHAIN_TOKEN_BRIDGE);
        superchainERC20.crosschainMint(_to, _amount);

        assertEq(superchainERC20.totalSupply(), _totalSupplyBefore + _amount);
        assertEq(superchainERC20.balanceOf(_to), _toBalanceBefore + _amount);
    }

    /// @notice Tests the `burn` function reverts when the caller is not the bridge.
    function testFuzz_crosschainBurn_callerNotBridge_reverts(address _caller, address _from, uint256 _amount) public {
        // Ensure the caller is not the bridge
        vm.assume(_caller != SUPERCHAIN_TOKEN_BRIDGE);

        // Expect the revert with `Unauthorized` selector
        vm.expectRevert(ISuperchainERC20.Unauthorized.selector);

        // Call the `burn` function with the non-bridge caller
        vm.prank(_caller);
        superchainERC20.crosschainBurn(_from, _amount);
    }

    /// @notice Tests the `burn` burns the amount and emits the `CrosschainBurn` event.
    function testFuzz_crosschainBurn_succeeds(address _from, uint256 _amount) public {
        // Ensure `_from` is not the zero address
        vm.assume(_from != ZERO_ADDRESS);

        // Mint some tokens to `_from` so then they can be burned
        vm.prank(SUPERCHAIN_TOKEN_BRIDGE);
        superchainERC20.crosschainMint(_from, _amount);

        // Get the total supply and balance of `_from` before the burn to compare later on the assertions
        uint256 _totalSupplyBefore = superchainERC20.totalSupply();
        uint256 _fromBalanceBefore = superchainERC20.balanceOf(_from);

        // Look for the emit of the `Transfer` event
        vm.expectEmit(address(superchainERC20));
        emit ERC20.Transfer(_from, ZERO_ADDRESS, _amount);

        // Look for the emit of the `CrosschainBurn` event
        // vm.expectEmit(address(superchainERC20));
        vm.expectEmit(true, true, true, true, address(superchainERC20));
        emit IERC7802.CrosschainBurn(_from, _amount, SUPERCHAIN_TOKEN_BRIDGE);

        // Call the `burn` function with the bridge caller
        vm.prank(SUPERCHAIN_TOKEN_BRIDGE);
        superchainERC20.crosschainBurn(_from, _amount);

        // Check the total supply and balance of `_from` after the burn were updated correctly
        assertEq(superchainERC20.totalSupply(), _totalSupplyBefore - _amount);
        assertEq(superchainERC20.balanceOf(_from), _fromBalanceBefore - _amount);
    }
}
