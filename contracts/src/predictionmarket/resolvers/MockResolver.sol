// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {IMarketResolver, MarketOutcome} from "../MarketResolver.sol";

contract MockResolver is IMarketResolver {
    MarketOutcome public outcome;

    function setOutcome(MarketOutcome _outcome) public {
        require(outcome == MarketOutcome.UNDECIDED);
        require(_outcome != MarketOutcome.UNDECIDED);

        outcome = _outcome;
    }
}