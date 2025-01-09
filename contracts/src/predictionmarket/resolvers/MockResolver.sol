// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import { IMarketResolver, MarketOutcome } from "../MarketResolver.sol";
import { PredictionMarket } from "../PredictionMarket.sol";

contract MockResolver is IMarketResolver {
    // @notice prediction market
    PredictionMarket public market;

    // @notice outcome of the resolver
    MarketOutcome public outcome;

    // @notice chain of this resolver
    uint256 public chainId = block.chainid;

    constructor(PredictionMarket _market) {
        market = _market;
    }

    function setOutcome(MarketOutcome _outcome) public {
        require(outcome == MarketOutcome.UNDECIDED && _outcome != MarketOutcome.UNDECIDED, "outcome must be undecided");

        outcome = _outcome;
        market.resolveMarket(this);
    }
}
