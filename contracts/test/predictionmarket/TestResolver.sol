// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.25;

import { IMarketResolver, MarketOutcome } from "../../src/predictionmarket/MarketResolver.sol";

contract TestResolver is IMarketResolver {
    MarketOutcome public outcome;

    function setOutcome(MarketOutcome _outcome) public {
        outcome = _outcome;
    }
}
