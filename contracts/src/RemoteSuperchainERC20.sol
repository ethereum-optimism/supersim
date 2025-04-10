// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Create2} from "@openzeppelin/contracts/utils/Create2.sol";

import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";
import {IL2ToL2CrossDomainMessenger} from "@contracts-bedrock-interfaces/L2/IL2ToL2CrossDomainMessenger.sol";

contract RemoteSuperchainERC20 is ERC20 {
    /// @dev The address of deployer available on all optimism chains used to create the remote representation
    address constant _CREATE2_DEPLOYER = address(0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2);

    /// @notice the ERC20 token of this remote representation
    IERC20 public erc20;

    /// @notice the chain the ERC20 lives on
    uint256 public homeChainId;

    /// @notice the remote chain that can hold a lock on this ERC20
    uint256 public remoteChainId;

    /// @notice the account allowed to acquire this lock from the user via `transferFrom()`
    address public spender;

    /// @dev The messenger predeploy to handle message passing
    IL2ToL2CrossDomainMessenger internal _messenger =
        IL2ToL2CrossDomainMessenger(Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER);

    /// @notice The constructor. ERC20Metadata is only present on the home chain so we omit it for now.
    /// @param _homeChainId The chain the ERC20 lives on
    /// @param _erc20 The ERC20 token this remote representation is based on
    /// @param _remoteChainId The chain this erc20 is controlled by
    /// @param _spender The account allowed to acquire this lock from the user via `transferFrom()`
    constructor(uint256 _homeChainId, IERC20 _erc20, uint256 _remoteChainId, address _spender) ERC20("", "") {
        // By asserting the deployer is used, we obtain good safety that
        //  1. This contract was deterministically created based on the constructor args
        //  2. `approve()` & `transfer()` only works on the correctly erc20 address.
        require(msg.sender == _CREATE2_DEPLOYER);

        homeChainId = _homeChainId;
        erc20 = _erc20;
        remoteChainId = _remoteChainId;
        spender = _spender;
    }

    /// @notice Approve a spender on the remote to pull an amout of RemoteSuperchainERC20
    /// @param _spender The address of the spender on the remote chain
    /// @param _amount The amount to approve
    /// @return success True if the approval was successful
    function approve(address _spender, uint256 _amount) public override returns (bool) {
        if (block.chainid == homeChainId) {
            // Resource lock the erc20 on the remote chain
            require(_spender == spender);

            // (1) Escrow the ERC20
            erc20.transferFrom(msg.sender, address(this), _amount);

            // (2) Send a message to approve the spender over the lock (we reuse the first argument to propogate the owner)
            bytes memory call = abi.encodeCall(this.approve, (msg.sender, _amount));
            _messenger.sendMessage(remoteChainId, address(this), call);
            return true;
        } else {
            // Minting the RemoteERC20 to be acquirable by the spender.
            require(block.chainid == remoteChainId);
            require(msg.sender == address(_messenger));

            // In this context we're reusing the _sender argument to propogate the owner of the asset.
            address owner = _spender;

            // (1) Call must have come from the this RemoteERC20
            address sender = _messenger.crossDomainMessageSender();
            require(sender == address(this));

            // (2) Mint the ERC20 to the original owner (re-used _sender argument)
            super._mint(owner, _amount);

            // (3) Manually set the allowance over the lock for the spender
            super._approve(owner, spender, _amount);
            return true;
        }
    }

    /// @notice Transfer the approved RemoteSuperchainERC20 to the spender.
    /// @param _from The sender
    /// @param _to The recipient
    /// @param _amount The amount
    /// @return success True if the transfer was successful
    function transferFrom(address _from, address _to, uint256 _amount) public override returns (bool) {
        require(block.chainid == remoteChainId);
        return super.transferFrom(_from, _to, _amount);
    }

    /// @notice Transfer the RemoteSuperchainERC20. This unlocks the ERC20 on the home chain.
    /// @param _to The recipient
    /// @param _amount The amount
    /// @return success True if the transfer was successful
    function transfer(address _to, uint256 _amount) public override returns (bool) {
        if (block.chainid == homeChainId) {
            // Unlock the ERC20 that was remotely transferred.
            require(msg.sender == address(_messenger));

            // (1) Call must have come from the this RemoteERC20
            address sender = _messenger.crossDomainMessageSender();
            require(sender == address(this));

            // (2) Unlock the ERC20 to the recipient
            return erc20.transfer(_to, _amount);
        } else {
            // Remotely transfer the ERC20
            require(block.chainid == remoteChainId);

            // (2) Burn the Remotely Held RemoteERC20 (either the original owner or the spender)
            //     @note: If this is the original owner and not the spender, they will still have the allowance set
            //            on the sender. However, the user would have to manually approve again for there to be any
            //            tokens for the spender to pull so it is fine for this allowance to remain.
            super._burn(msg.sender, _amount);

            // (3) Send a message to unlock
            _messenger.sendMessage(homeChainId, address(this), abi.encodeCall(this.transfer, (_to, _amount)));
            return true;
        }
    }
}
