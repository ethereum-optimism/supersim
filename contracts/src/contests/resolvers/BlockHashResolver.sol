// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import { Predeploys } from "@contracts-bedrock/libraries/Predeploys.sol";
import { CrossL2Inbox, Identifier } from "@contracts-bedrock/L2/CrossL2Inbox.sol";

import { BlockHashEmitter } from "../utils/BlockHashEmitter.sol";

import { IContestResolver, ContestOutcome } from "../ContestResolver.sol";
import { Contests } from "../Contests.sol";

contract BlockHashResolver is IContestResolver {
    // @notice contests
    Contests public contests;

    // @notice BlockHashEmitter contract
    BlockHashEmitter public emitter;

    // @notice Chain ID that will resolve this contest
    uint256 public chainId;

    // @notice block height of this bet
    uint256 public blockNumber;
    
    // @notice current outcome of this bet
    ContestOutcome public outcome;

    constructor(Contests _contests, BlockHashEmitter _emitter, uint256 _chainId, uint256 _blockNumber) {
        outcome = ContestOutcome.UNDECIDED;

        contests = _contests;
        emitter = _emitter;

        chainId = _chainId;
        blockNumber = _blockNumber;
    }

    function resolve(Identifier calldata _id, bytes calldata _data) external {
        require(outcome == ContestOutcome.UNDECIDED, "already resolved");

        // Validate Log
        require(_id.origin == address(emitter), "event not from the emitter");
        require(_id.chainId == chainId, "event not from the correct chain");
        CrossL2Inbox(Predeploys.CROSS_L2_INBOX).validateMessage(_id, keccak256(_data));

        bytes32 selector = abi.decode(_data[:32], (bytes32));
        require(selector == BlockHashEmitter.BlockHash.selector, "event not a block hash");

        // Event should correspond to the right contest
        uint256 dataBlockNumber = abi.decode(_data[32:64], (uint256));
        require(dataBlockNumber == blockNumber, "event not for the right height");

        bytes32 blockHash = abi.decode(_data[64:], (bytes32));
        bool isOdd = uint256(blockHash) % 2 != 0;

        // Resolve the contest (yes if odd, no if even)
        if (isOdd) {
            outcome = ContestOutcome.YES;
        } else {
            outcome = ContestOutcome.NO;
        }

        contests.resolveContest(this);
    }
}
