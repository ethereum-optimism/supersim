// SPDX-License-Identifier: MIT

pragma solidity ^0.8.25;

import {Ownable} from "@solady/auth/Ownable.sol";
import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";

import {ISemver} from "@contracts-bedrock/universal/interfaces/ISemver.sol";
import {ICrossL2Inbox} from "@contracts-bedrock/L2/interfaces/ICrossL2Inbox.sol";

abstract contract SuperOwnable is Ownable, ISemver {
    // =============================================================
    // Errors
    // =============================================================

    error IdOriginNotSuperOwnable();
    error DataNotCrosschainOwnershipTransfer();
    error OwnershipNotInSync();

    // =============================================================
    // Events
    // =============================================================

    event CrosschainOwnershipTransfer(address indexed previousOwner, address indexed newOwner);

    // =============================================================
    // External Functions
    // =============================================================

    /// @notice Semantic version.
    /// @custom:semver 1.0.0-beta.1
    function version() external view virtual returns (string memory) {
        return "1.0.0-beta.1";
    }

    function updateOwner(ICrossL2Inbox.Identifier calldata _identifier, bytes calldata _data) external {
        if (_identifier.origin != address(this)) revert IdOriginNotSuperOwnable();
        ICrossL2Inbox(Predeploys.CROSS_L2_INBOX).validateMessage(_identifier, keccak256(_data));

        // Decode `CrosschainOwnershipTransfer` event
        bytes32 selector = abi.decode(_data[:32], (bytes32));
        if (selector != CrosschainOwnershipTransfer.selector) revert DataNotCrosschainOwnershipTransfer();
        (address previousOwner, address newOwner) = abi.decode(_data[32:], (address, address));
        if (previousOwner != owner()) revert OwnershipNotInSync();

        _setOwner(newOwner);
    }

    // =============================================================
    // Internal Functions
    // =============================================================

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _setOwner(address newOwner) internal override {
        emit CrosschainOwnershipTransfer(owner(), newOwner);
        super._setOwner(newOwner);
    }
}
