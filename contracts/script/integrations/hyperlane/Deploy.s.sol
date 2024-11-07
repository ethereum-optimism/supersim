// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Script, console} from "forge-std/Script.sol";
import {CrossChainPingPong} from "../../../src/pingpong/CrossChainPingPong.sol";
import {HyperlaneL2toL2CrossDomainMessenger} from "../../../src/integrations/hyperlane/HyperlaneL2toL2CrossDomainMessenger.sol";

contract DeployScript is Script {
    function setUp() public {}

    function deploy(
        uint256 startingChainId,
        address mailbox,
        string calldata salt
    ) public {
        vm.startBroadcast();

        HyperlaneL2toL2CrossDomainMessenger cdm = new HyperlaneL2toL2CrossDomainMessenger{
                salt: keccak256(bytes(salt))
            }(mailbox, true, 1301);
        console.log("Deployed CDM at: ", address(cdm));
        CrossChainPingPong game = new CrossChainPingPong{
            salt: keccak256(bytes(salt))
        }(startingChainId);
        game.setMessenger(address(cdm));

        console.log("Deployed PingPong at: ", address(game));
    }

    function setRemoteCDM(
        address localCDM,
        address remoteCDM,
        uint32 remoteDomain
    ) public {
        vm.broadcast();
        HyperlaneL2toL2CrossDomainMessenger(payable(localCDM))
            .setRemoteMessenger(remoteDomain, remoteCDM);
    }

    function hitBallTo(address localPingPong, uint256 chainId) public {
        vm.broadcast();
        CrossChainPingPong(localPingPong).hitBallTo(chainId);
    }
}
