// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {IL2ToL2CrossDomainMessenger} from "@contracts-bedrock/L2/interfaces/IL2ToL2CrossDomainMessenger.sol";
import {ICrossL2Inbox} from "src/L2/interfaces/ICrossL2Inbox.sol";
import {Hashing} from "@contracts-bedrock/libraries/Hashing.sol";
import {Encoding} from "@contracts-bedrock/libraries/Encoding.sol";
import {SafeCall} from "@contracts-bedrock/libraries/SafeCall.sol";

import {IMailbox, TypeCasts, IMessageRecipient} from "./Interfaces.sol";

contract HyperlaneL2toL2CrossDomainMessenger is
    IL2ToL2CrossDomainMessenger,
    IMessageRecipient
{
    using TypeCasts for address;
    using TypeCasts for bytes32;

    uint256 immutable localChainId;

    IMailbox public immutable mailbox;
    uint240 internal msgNonce;
    mapping(uint32 => address) remoteMessengers;
    bool public autoRelay;

    mapping(bytes32 => bool) processedMessages;

    // Temp variables
    bool internal isProcessingMessage;
    address internal currentSender;
    uint256 internal originChainId;

    /// @notice Current message version identifier.
    uint16 public constant messageVersion = uint16(0);

    /// @notice Emitted whenever a message is sent to a destination
    /// @param destination  Chain ID of the destination chain.
    /// @param target       Target contract or wallet address.
    /// @param messageNonce Nonce associated with the messsage sent
    /// @param sender       Address initiating this message call
    /// @param message      Message payload to call target with.
    event SentMessage(
        uint256 indexed destination,
        address indexed target,
        uint256 indexed messageNonce,
        address sender,
        bytes message
    );

    fallback() payable external {}

    constructor(address _mailbox, bool _autoRelay, uint256 _localChainId) {
        mailbox = IMailbox(_mailbox);
        autoRelay = _autoRelay;
        localChainId = _localChainId;
    }

    /// @notice Sets the address of the messenger contract on the destination chain.
    /// @param _remoteMessenger Address of the messenger contract on the destination chain.
    function setRemoteMessenger(
        uint32 remote,
        address _remoteMessenger
    ) external {
        remoteMessengers[remote] = _remoteMessenger;
    }

    /// @notice Mapping of message hashes to boolean receipt values. Note that a message will only
    ///         be present in this mapping if it has successfully been relayed on this chain, and
    ///         can therefore not be relayed again.
    /// @param _msgHash message hash to check.
    /// @return Returns true if the message corresponding to the `_msgHash` was successfully relayed.
    function successfulMessages(bytes32 _msgHash) external view returns (bool) {
        return processedMessages[_msgHash];
    }

    /// @notice Retrieves the sender of the current cross domain message.
    /// @return sender_ Address of the sender of the current cross domain message.
    function crossDomainMessageSender() external view returns (address) {
        require(isProcessingMessage, "Not currently processing a message");
        return currentSender;
    }

    /// @notice Retrieves the source of the current cross domain message.
    /// @return source_ Chain ID of the source of the current cross domain message.
    function crossDomainMessageSource() external view returns (uint256) {
        require(isProcessingMessage, "Not currently processing a message");
        return originChainId;
    }

    /// @notice Retrieves the context of the current cross domain message. If not entered, reverts.
    /// @return sender_ Address of the sender of the current cross domain message.
    /// @return source_ Chain ID of the source of the current cross domain message.
    function crossDomainMessageContext()
        external
        view
        returns (address sender_, uint256 source_)
    {
        require(isProcessingMessage, "Not currently processing a message");
        return (currentSender, originChainId);
    }

    /// @notice Sends a message to some target address on a destination chain. Note that if the call
    ///         always reverts, then the message will be unrelayable, and any ETH sent will be
    ///         permanently locked. The same will occur if the target on the other chain is
    ///         considered unsafe (see the _isUnsafeTarget() function).
    /// @param _destination Chain ID of the destination chain.
    /// @param _target      Target contract or wallet address.
    /// @param _message     Message to trigger the target address with.
    /// @return msgHash_ The hash of the message being sent, which can be used for tracking whether
    ///                  the message has successfully been relayed.
    function sendMessage(
        uint256 _destination,
        address _target,
        bytes calldata _message
    ) external returns (bytes32 msgHash_) {
        uint256 nonce = messageNonce();
        emit SentMessage(_destination, _target, nonce, msg.sender, _message);

        msgNonce++;

        bytes memory messageBody = abi.encode(
            // CDM args
            nonce,
            msg.sender,
            _target,
            _message,
            // CrossL2Inbox.Identifier
            block.number,
            // approximate logIndex
            uint256(0),
            block.timestamp
        );
        address remoteMessenger = remoteMessengers[uint32(_destination)];

        uint256 quote = mailbox.quoteDispatch(
            uint32(_destination),
            remoteMessenger.addressToBytes32(),
            messageBody
        );
        mailbox.dispatch{value: quote}(
            uint32(_destination),
            remoteMessenger.addressToBytes32(),
            messageBody
        );

        return
            Hashing.hashL2toL2CrossDomainMessage({
                _destination: _destination,
                _source: localChainId,
                _nonce: nonce,
                _sender: msg.sender,
                _target: _target,
                _message: _message
            });
    }

    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _message
    ) external payable {
        require(
            msg.sender == address(mailbox),
            "HyperlaneL2toL2CrossDomainMessenger: Only mailbox can call this function"
        );
        address remoteMessenger = remoteMessengers[_origin];
        require(
            _sender == remoteMessenger.addressToBytes32(),
            "HyperlaneL2toL2CrossDomainMessenger: Invalid sender"
        );

        (
            uint256 nonce,
            address sender,
            address target,
            bytes memory message
        ) = abi.decode(_message, (uint256, address, address, bytes));

        // TODO: populate replay protection, technically not necessary
        bytes32 messageHash = Hashing.hashL2toL2CrossDomainMessage({
            _destination: localChainId,
            _source: _origin,
            _nonce: nonce,
            _sender: _sender.bytes32ToAddress(),
            _target: target,
            _message: message
        });

        // TODO: Store so that it can be called by relayMessage, for now we just auto relay
        isProcessingMessage = true;
        originChainId = uint256(_origin);
        currentSender = sender;

        bool success = SafeCall.call(target, msg.value, message);

        require(
            success,
            "HyperlaneL2toL2CrossDomainMessenger: Target call failed"
        );
        processedMessages[messageHash] = true;
    }

    /// @notice Relays a message that was sent by the other CrossDomainMessenger contract. Can only
    ///         be executed via cross-chain call from the other messenger OR if the message was
    ///         already received once and is currently being replayed.
    /// @param _id          Identifier of the SentMessage event to be relayed
    /// @param _sentMessage Message payload of the `SentMessage` event
    function relayMessage(
        ICrossL2Inbox.Identifier calldata _id,
        bytes calldata _sentMessage
    ) external payable {}

    /// @notice Adds a version number into the first two bytes of a message nonce.
    /// @param _nonce   Message nonce to encode into.
    /// @param _version Version number to encode into the message nonce.
    /// @return Message nonce with version encoded into the first two bytes.
    function encodeVersionedNonce(
        uint240 _nonce,
        uint16 _version
    ) internal pure returns (uint256) {
        uint256 nonce;
        assembly {
            nonce := or(shl(240, _version), _nonce)
        }
        return nonce;
    }

    /// @notice Retrieves the next message nonce. Message version will be added to the upper two bytes of the message
    ///         nonce. Message version allows us to treat messages as having different structures.
    /// @return Nonce of the next message to be sent, with added message version.
    function messageNonce() public view returns (uint256) {
        return Encoding.encodeVersionedNonce(msgNonce, messageVersion);
    }
}
