// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

enum ContestOutcome {
    UNDECIDED,
    YES,
    NO
}

interface IContestResolver {
    // @notice the origin chain that this resolver was instantiated from
    function chainId() external returns (uint256);

    // @notice get the outcome of the contest. This MUST be deterministic as the prediction contest
    //         will use this value to determine the outcome of the contest ONCE when resolved.
    function outcome() external returns (ContestOutcome);
}
