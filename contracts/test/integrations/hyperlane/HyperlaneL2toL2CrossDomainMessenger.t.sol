// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Test, console} from "forge-std/Test.sol";
import {HyperlaneL2toL2CrossDomainMessenger} from "src/integrations/hyperlane/HyperlaneL2toL2CrossDomainMessenger.sol";
import {IMessageRecipient, TypeCasts} from "src/integrations/hyperlane/Interfaces.sol";
import {CrossChainPingPong} from "src/pingpong/CrossChainPingPong.sol";

contract MockMailbox {
    using TypeCasts for bytes32;
    using TypeCasts for address;

    uint32 public inboundUnprocessedNonce = 0;
    uint32 public inboundProcessedNonce = 0;

    struct PendingMessage {
        uint256 originDomain;
        uint32 destinationDomain;
        address originSender;
        address target;
        bytes message;
    }

    mapping(uint256 => MockMailbox) public remoteMailboxes;
    mapping(uint256 => PendingMessage) public inboundMessages;

    uint256 immutable localChainId;

    constructor(uint256 _localChainId) {
        localChainId = _localChainId;
    }

    function quoteDispatch(
        uint32 destinationDomain,
        bytes32 recipientAddress,
        bytes calldata messageBody
    ) public view returns (uint256) {
        return 1;
    }

    function dispatch(
        uint32 destinationDomain,
        bytes32 recipientAddress,
        bytes calldata messageBody
    ) public payable returns (bytes32) {
        MockMailbox _destinationMailbox = remoteMailboxes[destinationDomain];
        require(
            address(_destinationMailbox) != address(0),
            "Missing remote mailbox"
        );
        _destinationMailbox.addInboundMessage(
            PendingMessage({
                originDomain: localChainId,
                destinationDomain: destinationDomain,
                originSender: msg.sender,
                message: messageBody,
                target: recipientAddress.bytes32ToAddress()
            })
        );

        return bytes32(0);
    }

    function addRemoteMailbox(uint256 _domain, MockMailbox _mailbox) external {
        remoteMailboxes[_domain] = _mailbox;
    }

    function addInboundMessage(PendingMessage memory _message) external {
        inboundMessages[inboundUnprocessedNonce] = _message;
        inboundUnprocessedNonce++;
    }

    function processNextInboundMessage() public payable {
        PendingMessage memory _message = inboundMessages[inboundProcessedNonce];

        IMessageRecipient(_message.target).handle(
            uint32(_message.originDomain),
            _message.originSender.addressToBytes32(),
            _message.message
        );
        inboundProcessedNonce++;
    }
}

contract TestRecipient {
    address public lastMsgSender;
    uint256 public lastValue;

    function foo(uint256 bar) external {
        lastValue = bar;
        lastMsgSender = msg.sender;
    }
}

contract L2NativeSuperchainERC20Test is Test {
    uint256 originChainId = 123;
    uint256 destinationChainId = 321;

    MockMailbox originMailbox;
    MockMailbox destinationMailbox;

    HyperlaneL2toL2CrossDomainMessenger originCDM;
    HyperlaneL2toL2CrossDomainMessenger destinationCDM;

    function setUp() public {
        originMailbox = new MockMailbox(originChainId);
        destinationMailbox = new MockMailbox(destinationChainId);

        originMailbox.addRemoteMailbox(destinationChainId, destinationMailbox);
        destinationMailbox.addRemoteMailbox(originChainId, originMailbox);

        originCDM = new HyperlaneL2toL2CrossDomainMessenger(
            address(originMailbox),
            true,
            originChainId
        );
        destinationCDM = new HyperlaneL2toL2CrossDomainMessenger(
            address(destinationMailbox),
            true,
            destinationChainId
        );

        // fund cdm
        (bool transferTx, ) = payable(address(originCDM)).call{
            value: 1000000000000000000
        }("");

        originCDM.setRemoteMessenger(
            uint32(destinationChainId),
            address(destinationCDM)
        );
        destinationCDM.setRemoteMessenger(
            uint32(originChainId),
            address(originCDM)
        );
    }

    function testWithTestRecipient(uint256 _value) public {
        TestRecipient testRecipient = new TestRecipient();

        originCDM.sendMessage(
            destinationChainId,
            address(testRecipient),
            abi.encodeCall(TestRecipient.foo, (_value))
        );

        destinationMailbox.processNextInboundMessage();
        assert(testRecipient.lastMsgSender() == address(destinationCDM));
        assert(testRecipient.lastValue() == _value);
    }

    function testWithPingPong() public {
        vm.chainId(originChainId);
        CrossChainPingPong originPingPong = new CrossChainPingPong(
            originChainId
        );
        originPingPong.setMessenger(address(originCDM));
        vm.chainId(destinationChainId);
        // CrossChainPingPong destinationPingPong = new CrossChainPingPong(originChainId, address(destinationCDM));

        vm.chainId(originChainId);
        originPingPong.hitBallTo(destinationChainId);

        // CrossChainPingPong relies on the same address on every chain, so this won't work
        // destinationMailbox.processNextInboundMessage();
    }
}
