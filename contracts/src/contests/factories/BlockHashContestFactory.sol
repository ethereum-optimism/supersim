// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import { BlockHashEmitter } from "../utils/BlockHashEmitter.sol";
import { BlockHashResolver } from "../resolvers/BlockHashResolver.sol";

import { Contests } from "../Contests.sol";
import { IContestResolver } from "../ContestResolver.sol";

contract BlockHashContestFactory {
    // @notice BlockHashEmitter contract
    BlockHashEmitter public emitter;

    // @notice Contests contract
    Contests public contests;

    // @notice Emitted when a new contest for a block hash is created
    event NewContest(IContestResolver resolver);

    // @notice indiciator if a resolver originated from this factory
    mapping(IContestResolver => bool) public fromFactory;

    constructor(Contests _contests, BlockHashEmitter _emitter) {
        contests = _contests;
        emitter = _emitter;
    }

    function newContest(uint256 _chainId, uint256 _blockNumber) public payable {
        IContestResolver resolver = new BlockHashResolver(contests, emitter, _chainId, _blockNumber);
        contests.newContest{ value: msg.value }(resolver, msg.sender);

        fromFactory[resolver] = true;

        emit NewContest(resolver);
    }
}
