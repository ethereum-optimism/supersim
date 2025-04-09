// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Create2} from "@openzeppelin/contracts/utils/Create2.sol";

import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";
import {IL2ToL2CrossDomainMessenger} from "@contracts-bedrock-interfaces/L2/IL2ToL2CrossDomainMessenger.sol";

contract PhantomSuperchainERC20 is ERC20 {
    /// @dev The address of deployer available on all optimism chains used to create the phantom representation
    address constant CREATE2_DEPLOYER = address(0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2);

    /// @notice the chain the ERC20 lives on
    uint256 public homeChainId;

    /// @notice the ERC20 token of this phantom representation
    IERC20 public erc20;

    /// @dev The messenger predeploy to handle message passing
    IL2ToL2CrossDomainMessenger internal messenger =
        IL2ToL2CrossDomainMessenger(Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER);

    /// @notice The constructor. ERC20Metadata is only present on the home chain so we omit it for now.
    /// @param _homeChainId The chain the ERC20 lives on
    /// @param _erc20 The ERC20 token this phantom representation is based on
    constructor(uint256 _homeChainId, IERC20 _erc20) ERC20("", "") {
        // By asserting the deployer is used, we obtain good safety that
        //  1. This contract was deterministically created based on the constructor args
        //  2. `deposit()` only works on the correctly approved phantom address.
        require(msg.sender == CREATE2_DEPLOYER);

        homeChainId = _homeChainId;
        erc20 = _erc20;
    }

    /// @notice Transfer the Phantom ERC20
    /// @param _to The recipient
    /// @param _amount The amount
    /// @return success True if the transfer was successful
    function transfer(address _to, uint256 _amount) public override returns (bool) {
        if (block.chainid != homeChainId) {
            // Transfer through the home chain.
            require(msg.sender != address(messenger));

            // (1) Remove the phantom tokens
            super._burn(msg.sender, _amount);

            // (2) Send a message to the home chain to unlock to the recipient
            messenger.sendMessage(homeChainId, address(this), abi.encodeCall(this.transfer, (_to, _amount)));
            return true;
        } else {
            // Unlock from a remote transfer call
            require(msg.sender == address(messenger));

            // (1) Call must have come from the phantom contract
            address sender = messenger.crossDomainMessageSender();
            require(sender == address(this));

            // (2) Unlock the erc20 to the recipient
            return erc20.transfer(_to, _amount);
        }
    }

    /// @notice Deposit the ERC20 from a cross-domain call. This allows remote chains to pull funds
    ///         into the phantom representation, requiring only approvals from the account. An approval
    ///         must also be made on the cross domain sender in additional to this phantom contract.
    /// @param _to The recipient on the destination chain
    /// @param _amount The amount
    function crossDomainDepositFrom(address _to, uint256 _amount) public {
        require(block.chainid == homeChainId);
        require(msg.sender == address(messenger));

        (address sender, uint256 destination) = messenger.crossDomainMessageContext();
        require(destination != homeChainId);

        // (1) This cross domain sender MUST also have an approval. Otherwise anyone would
        //     be able to pull from the sender's account with an approval on the phantom token
        //     via the cross domain messenger.
        require(erc20.allowance(sender, address(this)) >= _amount);

        // (2) Deposit the ERC20
        deposit(destination, _to, _amount);
    }

    /// @notice Deposit the ERC20
    /// @param _destination The destination chain controlling the phantom representation
    /// @param _to The recipient on the destination chain
    /// @param _amount The amount
    function deposit(uint256 _destination, address _to, uint256 _amount) public returns (bytes32) {
        require(block.chainid == homeChainId);
        require(_destination != homeChainId);

        // (1) Escrow the ERC20 within this phantom contract
        erc20.transferFrom(msg.sender, address(this), _amount);

        // (2) Send a message to the destination to mint the phantom erc20 to the recipient
        return messenger.sendMessage(_destination, address(this), abi.encodeCall(this.handleDeposit, (_to, _amount)));
    }

    /// @notice Handle a deposit from the home chain to create the phantom representation
    function handleDeposit(address _to, uint256 _amount) external {
        require(msg.sender == address(messenger));

        address sender = messenger.crossDomainMessageSender();
        require(sender == address(this));

        // (1) Mint the phantom erc20 to the recipient
        super._mint(_to, _amount);
    }
}
