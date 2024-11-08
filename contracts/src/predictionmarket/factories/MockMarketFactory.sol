// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {PredictionMarket} from "../PredictionMarket.sol";
import {MockResolver} from "../resolvers/MockResolver.sol";

contract MockMarketFactory {
    // @notice PredictionMarket contract
    PredictionMarket public predictionMarket;

    constructor(PredictionMarket _predictionMarket) {
        predictionMarket = _predictionMarket;
    }

    function newMarket() external {
        MockResolver resolver = new MockResolver();
        predictionMarket.newMarket(resolver);
    }
}