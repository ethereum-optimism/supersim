// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";
import {ICrossL2Inbox} from "@contracts-bedrock/L2/interfaces/ICrossL2Inbox.sol";

import { IMarketResolver, MarketOutcome } from "../MarketResolver.sol";

contract L1BlockResolver is IMarketResolver {
    // @notice Chain ID of the L2 chain
    uint256 public chainId;

    // @notice block height of this bet
    uint256 public blockNumber;

    // @notice whether the block hash is odd or even
    bool public isOdd;
    
    // @notice current outcome of this bet
    MarketOutcome public outcome;

    constructor(uint256 _chainId, uint256 _blockNumber, bool _isOdd) {
        outcome = MarketOutcome.UNDECIDED;

        chainId = _chainId;
        blockNumber = _blockNumber;
        isOdd = _isOdd;
    }

    function resolve(ICrossL2Inbox.Identifier calldata _id, bytes calldata _data) external {
        require(_id.origin == Predeploys.L1_BLOCK_ATTRIBUTES);
        ICrossL2Inbox(Predeploys.CROSS_L2_INBOX).validateMessage(_id, keccak256(_data));

        require(_id.chainId == chainId);

        if (uint256(blockhash(blockNumber)) % 2 == 0 && isOdd) {
            outcome = MarketOutcome.NO;
        } else {
            outcome = MarketOutcome.YES;
        }
    }
}
