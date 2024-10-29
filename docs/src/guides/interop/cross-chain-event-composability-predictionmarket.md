# Cross Chain Event Composability (Prediction Market)

We showcase cross chain composability through the implementation of a Prediction Market. Leveraging the same underlying mechanism powering TicTacToe, this prediction market can permissionlessly integrate with the events emitted by any contract in the Superchain.

See the documentation for the [frontend](https://github.com/ethereum-optimism/supersim/tree/main/examples/prediction-market) for how the prediction market UI is presented to the user.

- [How it works](#how-it-works)
  - [BlockHash Market](#blockhash-market)
  - [TicTacToe Market](#tictactoe-market)
- [Takeaways](#takeaways)

## How it works

Unlike TicTacToe which is deployed on every participating chain, the PredictionMarket is deployed on a single L2, behaving like an application-specific op-stack chain rather than a horizontally scaled app.

[PredictionMarket.sol](https://github.com/ethereum-optimism/supersim/blob/main/contracts/src/prediction-market/PredictionMarket.sol) contains the implementation of the prediction market. We won't go into the details of the implementation here, but instead focus on how the prediction market can leverage cross chain event reading to compose with other contracts in the Superchain.

The system predeploy that enables pulling in validated cross-chain events is the [CrossL2Inbox](https://specs.optimism.io/interop/predeploys.html#crossl2inbox).

```solidity
contract ICrossL2Inbox {
    function validateMessage(Identifier calldata _id, bytes32 _msgHash) external view;
}
```

A market is identified by and has its outcome determined by the `IMarketResolver` instance. The resolver starts in the `UNDECIDED` state, updated into `YES` or `NO` when resolving itself
with the market.

```solidity
enum MarketOutcome {
    UNDECIDED,
    YES,
    NO
}

interface IMarketResolver {
    function outcome() external returns (MarketOutcome);
}
```

### Blockhash Market

With the existence of an event that emits the blockhash and height of a block, we can create a market on the parity of the blockhash being even or odd.

```solidity
contract BlockhashEmitter {
    event Blockhash(uint256 blockHeight, bytes32 blockhash);

    function emitBlockhash(uint256 _blockHeight) external {
        bytes32 hash = blockhash(_blockNumber);
        require(hash != bytes32(0));

        emit BlockHash(_blockNumber, hash);
    }
}
```

Integrating this emitter into a market is extremely simple.  The `BlockHashMarketFactory` is a simple factory that creates a new market for a given chain & block height. When live, **anyone** can resolve the market by simply providing the right `BlockHash` event to the deployed resolver.

```solidity
contract BlockHashMarketFactory {
    BlockHashEmitter public emitter; // Same emitter deployed on every chain
    PredictionMarket public predictionMarket;

    function newMarket(uint256 _chainId, uint256 _blockNumber) public payable {
        IMarketResolver resolver = new BlockHashResolver(predictionMarket, emitter, _chainId, _blockNumber);
        predictionMarket.newMarket{ value: msg.value }(resolver, msg.sender);
    }
}

contract BlockHashResolver is IMarketResolver {
    PredictionMarket public market;
    BlockHashEmitter public emitter;
    MarketOutcome    public outcome;

    // The target chain & block height
    uint256 public chainId;
    uint256 public blockNumber;

    function resolve(Identifier calldata _id, bytes calldata _data) external {
        require(outcome == MarketOutcome.UNDECIDED);

        // Validate Log
        require(_id.origin == address(emitter), "not an event from the emitter");
        require(_id.chainId == chainId, "must match target chain");
        CrossL2Inbox(Predeploys.CROSS_L2_INBOX).validateMessage(_id, keccak256(_data));

        bytes32 selector = abi.decode(_data[:32], (bytes32));
        require(selector == BlockHashEmitter.BlockHash.selector, "incorrect event");

        // Event should correspond to the right market
        uint256 dataBlockNumber = abi.decode(_data[32:64], (uint256));
        require(dataBlockNumber == blockNumber, "must match target block height");

        // Resolve the market (yes if odd, no if even)
        bytes32 blockHash = abi.decode(_data[64:], (bytes32));
        outcome = uint256(blockHash) % 2 != 0 ? MarketOutcome.YES : MarketOutcome.NO;
        market.resolveMarket(this);
    }

}
```

### TicTacToe Market

A market for TicTacToe is created on an accepted game between two players, captured by the emitted `AcceptedGame` event. When decoding the event, the game is uniquely identified by the chain it was created on, `chainId`, and the associated `gameId`. These identifying properties of the game are used to create the resolver for the game.

```solidity
contract TicTacToeMarketFactory {
    TicTacToe public tictactoe;
    PredictionMarket public market;

    function newMarket(Identifier calldata _id, bytes calldata _data) public payable {
        // Validate Log
        require(_id.origin == address(tictactoe), "not an event from the TicTacToe contract");
        CrossL2Inbox(Predeploys.CROSS_L2_INBOX).validateMessage(_id, keccak256(_data));

        bytes32 selector = abi.decode(_data[:32], (bytes32));
        require(selector == TicTacToe.AcceptedGame.selector, "incorrect event");

        // Decode the event data
        (uint256 chainId, uint256 gameId, address creator,) = abi.decode(_data[32:], (uint256, uint256, address, address));

        IMarketResolver resolver = new TicTacToeGameResolver(market, tictactoe, chainId, gameId, creator);
        market.newMarket{ value: msg.value }(resolver, msg.sender);
    }
}
```

When live, **anyone** can resolve the market by providing the `GameWon` or `GameDraw` event of the associated game from the TicTacToe contract.

```solidity
contract TicTacToeGameResolver is IMarketResolver {
    TicTacToe public tictactoe;
    PredictionMarket public market;
    MarketOutcome public outcome;

    // @notice Game for this resolver
    Game public game;

    constructor(PredictionMarket _market, TicTacToe _tictactoe, uint256 _chainId, uint256 _gameId, address _creator) {
        market = _market;
        tictactoe = _tictactoe;

        game = Game({chainId: _chainId, gameId: _gameId, creator: _creator});
        outcome = MarketOutcome.UNDECIDED;
    }

    // @notice resolve this game by providing the game ending event
    function resolve(Identifier calldata _id, bytes calldata _data) external {
        // Validate Log
        require(_id.origin == address(tictactoe));
        CrossL2Inbox(Predeploys.CROSS_L2_INBOX).validateMessage(_id, keccak256(_data));

        // Ensure this is a finalizing event
        bytes32 selector = abi.decode(_data[:32], (bytes32));
        require(selector == TicTacToe.GameWon.selector || selector == TicTacToe.GameDraw.selector, "event not a game outcome");

        // Event should correspond to the right game
        (uint256 _chainId, uint256 gameId, address winner,,) = abi.decode(_data[32:], (uint256, uint256, address, uint8, uint8));
        require(_chainId == game.chainId && gameId == game.gameId);

        // Resolve based on if the creator has won (non-draw)
        outcome = winner == game.creator && selector != TicTacToe.GameDraw.selector ? MarketOutcome.YES : MarketOutcome.NO;
        market.resolveMarket(this);
    }
}
```

## Takeaways

Leveraging superchain interop, contracts in the superchain can compose with each other in a similar fashion to how they would on a single chain. No restrictions are placed on the kinds of events a contract can consume via the `CrossL2Inbox`.

In this example, the `BlockHashMarketFactory` and `TicTacToeMarketFactory` can be seen as just starting points for the `PredictionMarket` app chain. As more contracts and apps are created in the superchain, this developer can compose with them in a similar fashion without needing to change the `PredictionMarket` contract at all!