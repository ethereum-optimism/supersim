// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import { MockResolver } from "../resolvers/MockResolver.sol";

import { PredictionMarket } from "../PredictionMarket.sol";
import { IMarketResolver } from "../MarketResolver.sol";

contract MockResolverFactory {
    // @notice PredictionMarket contract
    PredictionMarket public predictionMarket;

    // @notice Emitted when a new market for a block hash is created
    event NewMarket(IMarketResolver resolver);

    // @notice indiciator if a resolver originated from this factory
    mapping(IMarketResolver => bool) public fromFactory;

    constructor(PredictionMarket _predictionMarket) {
        predictionMarket = _predictionMarket;
    }

    function newMarket(string memory _question, uint256 _resolutionTime) public payable {
        IMarketResolver resolver = new MockResolver(predictionMarket, _question, _resolutionTime);
        predictionMarket.newMarket{ value: msg.value }(resolver, msg.sender);

        fromFactory[resolver] = true;

        emit NewMarket(resolver);
    }
}
