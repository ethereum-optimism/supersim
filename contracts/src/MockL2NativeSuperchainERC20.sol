// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {ERC20} from "@solady/tokens/ERC20.sol";
import {IL2ToL2CrossDomainMessenger} from "@contracts-bedrock/L2/IL2ToL2CrossDomainMessenger.sol";
import {ISuperchainERC20Extensions} from "@contracts-bedrock/L2/ISuperchainERC20.sol";
import {ISemver} from "@contracts-bedrock/universal/ISemver.sol";
import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";

/// @notice Thrown when attempting to relay a message and the function caller (msg.sender) is not
/// L2ToL2CrossDomainMessenger.
error CallerNotL2ToL2CrossDomainMessenger();

/// @notice Thrown when attempting to relay a message and the cross domain message sender is not this
/// OptimismSuperchainERC20.
error InvalidCrossDomainSender();

/// @notice Thrown when attempting to mint or burn tokens and the account is the zero address.
error ZeroAddress();

/// @title MockL2NativeSuperchainERC20
/// @notice Mock implementation of a native Superchain ERC20 token that is L2 native (not backed by an L1 native token).
/// The mint/burn functionality is intentionally open to ANYONE to make it easier to test with.
contract MockL2NativeSuperchainERC20 is ISuperchainERC20Extensions, ERC20, ISemver {
    /// @notice Emitted whenever tokens are minted for an account.
    /// @param account Address of the account tokens are being minted for.
    /// @param amount  Amount of tokens minted.
    event Mint(address indexed account, uint256 amount);

    /// @notice Emitted whenever tokens are burned from an account.
    /// @param account Address of the account tokens are being burned from.
    /// @param amount  Amount of tokens burned.
    event Burn(address indexed account, uint256 amount);

    /// @notice Address of the L2ToL2CrossDomainMessenger Predeploy.
    address internal constant MESSENGER = Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER;

    string public constant version = "0.0.1";

    /// @notice Allows ANYONE to mint tokens.
    /// @param _to     Address to mint tokens to.
    /// @param _amount Amount of tokens to mint.
    function mint(address _to, uint256 _amount) external virtual {
        if (_to == address(0)) revert ZeroAddress();

        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    /// @notice Allows ANYONE to burn tokens.
    /// @param _from   Address to burn tokens from.
    /// @param _amount Amount of tokens to burn.
    function burn(address _from, uint256 _amount) external virtual {
        if (_from == address(0)) revert ZeroAddress();

        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }

    /// @notice Sends tokens to some target address on another chain.
    /// @param _to      Address to send tokens to.
    /// @param _amount  Amount of tokens to send.
    /// @param _chainId Chain ID of the destination chain.
    function sendERC20(address _to, uint256 _amount, uint256 _chainId) external {
        if (_to == address(0)) revert ZeroAddress();

        _burn(msg.sender, _amount);

        bytes memory _message = abi.encodeCall(this.relayERC20, (msg.sender, _to, _amount));
        IL2ToL2CrossDomainMessenger(MESSENGER).sendMessage(_chainId, address(this), _message);

        emit SendERC20(msg.sender, _to, _amount, _chainId);
    }

    /// @notice Relays tokens received from another chain.
    /// @param _from   Address of the msg.sender of sendERC20 on the source chain.
    /// @param _to     Address to relay tokens to.
    /// @param _amount Amount of tokens to relay.
    function relayERC20(address _from, address _to, uint256 _amount) external {
        if (_to == address(0)) revert ZeroAddress();

        if (msg.sender != MESSENGER) revert CallerNotL2ToL2CrossDomainMessenger();

        if (IL2ToL2CrossDomainMessenger(MESSENGER).crossDomainMessageSender() != address(this)) {
            revert InvalidCrossDomainSender();
        }

        uint256 source = IL2ToL2CrossDomainMessenger(MESSENGER).crossDomainMessageSource();

        _mint(_to, _amount);

        emit RelayERC20(_from, _to, _amount, source);
    }

    function name() public pure virtual override returns (string memory) {
        return "MockL2NativeSuperchainERC20";
    }

    function symbol() public pure virtual override returns (string memory) {
        return "MOCK";
    }

    function decimals() public pure override returns (uint8) {
        return 18;
    }
}
