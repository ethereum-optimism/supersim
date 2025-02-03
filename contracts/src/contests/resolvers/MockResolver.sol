// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import { IContestResolver, ContestOutcome } from "../ContestResolver.sol";
import { Contests } from "../Contests.sol";

contract MockResolver is IContestResolver {
    // @notice prediction contests
    Contests public contests;

    // @notice outcome of the resolver
    ContestOutcome public outcome;

    // @notice chain of this resolver
    uint256 public chainId = block.chainid;

    constructor(Contests _contests) {
        contests = _contests;
    }

    function setOutcome(ContestOutcome _outcome) public {
        require(outcome == ContestOutcome.UNDECIDED, "already resolved");
        require(_outcome != ContestOutcome.UNDECIDED, "outcome must be undecided");

        outcome = _outcome;
        contests.resolveContest(this);
    }
}
