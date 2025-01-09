// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import { BlockHashEmitter } from "../utils/BlockHashEmitter.sol";
import { BlockHashResolver } from "../resolvers/BlockHashResolver.sol";

import { PredictionMarket } from "../PredictionMarket.sol";
import { IMarketResolver } from "../MarketResolver.sol";

contract BlockHashMarketFactory {
    // @notice BlockHashEmitter contract
    BlockHashEmitter public emitter;

    // @notice PredictionMarket contract
    PredictionMarket public predictionMarket;

    // @notice Emitted when a new market for a block hash is created
    event NewMarket(IMarketResolver resolver);

    // @notice indiciator if a resolver originated from this factory
    mapping(IMarketResolver => bool) public fromFactory;

    constructor(PredictionMarket _predictionMarket, BlockHashEmitter _emitter) {
        predictionMarket = _predictionMarket;
        emitter = _emitter;
    }

    function newMarket(uint256 _chainId, uint256 _blockNumber) public payable {
        IMarketResolver resolver = new BlockHashResolver(predictionMarket, emitter, _chainId, _blockNumber);
        predictionMarket.newMarket{ value: msg.value }(resolver, msg.sender);

        fromFactory[resolver] = true;

        emit NewMarket(resolver);
    }
}
