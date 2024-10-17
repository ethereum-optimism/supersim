// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {SuperchainERC20} from "@contracts-bedrock/L2/SuperchainERC20.sol";
import {ISemver} from "@contracts-bedrock/universal/interfaces/ISemver.sol";

/// @notice Thrown when attempting to mint or burn tokens and the account is the zero address.
error ZeroAddress();

/// @title L2NativeSuperchainERC20
/// @notice Mock implementation of a native Superchain ERC20 token that is L2 native (not backed by an L1 native token).
/// The mint/burn functionality is intentionally open to ANYONE to make it easier to test with. For production use,
/// this functionality should be restricted.
contract L2NativeSuperchainERC20 is SuperchainERC20 {
    /// @notice Emitted whenever tokens are minted for an account.
    /// @param account Address of the account tokens are being minted for.
    /// @param amount  Amount of tokens minted.
    event Mint(address indexed account, uint256 amount);

    /// @notice Emitted whenever tokens are burned from an account.
    /// @param account Address of the account tokens are being burned from.
    /// @param amount  Amount of tokens burned.
    event Burn(address indexed account, uint256 amount);

    /// @notice Allows ANYONE to mint tokens. For production use, this should be restricted.
    /// @param _to     Address to mint tokens to.
    /// @param _amount Amount of tokens to mint.
    function mint(address _to, uint256 _amount) external virtual {
        if (_to == address(0)) revert ZeroAddress();

        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    /// @notice Allows ANYONE to burn tokens. For production use, this should be restricted.
    /// @param _from   Address to burn tokens from.
    /// @param _amount Amount of tokens to burn.
    function burn(address _from, uint256 _amount) external virtual {
        if (_from == address(0)) revert ZeroAddress();

        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }

    function name() public pure virtual override returns (string memory) {
        return "L2NativeSuperchainERC20";
    }

    function symbol() public pure virtual override returns (string memory) {
        return "MOCK";
    }

    function decimals() public pure override returns (uint8) {
        return 18;
    }
}
