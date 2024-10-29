// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

enum MarketOutcome {
    UNDECIDED,

    YES,
    NO
}

interface IMarketResolver {

    // @notice get the outcome of the market. This MUST be deterministic.
    function outcome() external returns (MarketOutcome);
}
