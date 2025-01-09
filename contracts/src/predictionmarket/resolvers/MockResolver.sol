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

    // @notice question of the resolver
    string public question;

    // @notice resolution time of the resolver
    uint256 public resolutionTime;

    constructor(PredictionMarket _market, string memory _question, uint256 _resolutionTime) {
        market = _market;
        question = _question;
        resolutionTime = _resolutionTime;
    }

    function setOutcome(MarketOutcome _outcome) public {
        require(outcome == MarketOutcome.UNDECIDED && _outcome != MarketOutcome.UNDECIDED, "outcome must be undecided");
        require(block.timestamp >= resolutionTime, "resolution time must be in the future");

        outcome = _outcome;
        market.resolveMarket(this);
    }
}
