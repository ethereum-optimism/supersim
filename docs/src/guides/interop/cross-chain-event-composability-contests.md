# Cross Chain Event Composability (Contests)

We showcase cross chain composability through the implementation of contests. Leveraging the same underlying mechanism powering TicTacToe, this contests can permissionlessly integrate with the events emitted by any contract in the Superchain.

See the documentation for the [frontend](https://github.com/ethereum-optimism/supersim/tree/main/examples/contests) for how the contests UI is presented to the user.

- [How it works](#how-it-works)
  - [BlockHash Contest](#blockhash-contest)
  - [TicTacToe Contest](#tictactoe-contest)
- [Takeaways](#takeaways)

## How it works

Unlike TicTacToe which is deployed on every participating chain, the Contests is deployed on a single L2, behaving like an application-specific op-stack chain rather than a horizontally scaled app.

[Contests.sol](https://github.com/ethereum-optimism/supersim/blob/main/contracts/src/contests/Contests.sol) contains the implementation of the contests. We won't go into the details of the implementation here, but instead focus on how the contests can leverage cross chain event reading to compose with other contracts in the Superchain.

The system predeploy that enables pulling in validated cross-chain events is the [CrossL2Inbox](https://specs.optimism.io/interop/predeploys.html#crossl2inbox).

```solidity
contract ICrossL2Inbox {
    function validateMessage(Identifier calldata _id, bytes32 _msgHash) external view;
}
```

A contest is identified by and has its outcome determined by the `IContestResolver` instance. The resolver starts in the `UNDECIDED` state, updated into `YES` or `NO` when resolving itself
with the contest.

```solidity
enum ContestOutcome {
    UNDECIDED,
    YES,
    NO
}

interface IContestResolver {
    function outcome() external returns (ContestOutcome);
}
```

### BlockHash Contest

With the existence of an event that emits the blockhash and height of a block, we can create a contest on the parity of the blockhash being even or odd.

```solidity
contract BlockHashEmitter {
    event BlockHash(uint256 blockHeight, bytes32 blockHash);

    function emitBlockHash(uint256 _blockHeight) external {
        bytes32 hash = blockhash(_blockHeight);
        require(hash != bytes32(0));

        emit BlockHash(_blockNumber, hash);
    }
}
```

Integrating this emitter into a contest is extremely simple.  The `BlockHashContestFactory` is a simple factory that creates a new contest for a given chain & block height. When live, **anyone** can resolve the contest by simply providing the right `BlockHash` event to the deployed resolver.

```solidity
contract BlockHashContestFactory {
    Contests         public contests;
    BlockHashEmitter public emitter; // Same emitter deployed on every chain

    function newContest(uint256 _chainId, uint256 _blockNumber) public payable {
        IContestResolver resolver = new BlockHashResolver(contests, emitter, _chainId, _blockNumber);
        contests.newContest{ value: msg.value }(resolver, msg.sender);
    }
}

contract BlockHashResolver is IContestResolver {
    Contests         public contests;
    ContestOutcome   public outcome;
    BlockHashEmitter public emitter;

    // The target chain & block height
    uint256 public chainId;
    uint256 public blockNumber;

    function resolve(Identifier calldata _id, bytes calldata _data) external {
        require(outcome == ContestOutcome.UNDECIDED);

        // Validate Log
        require(_id.origin == address(emitter), "not an event from the emitter");
        require(_id.chainId == chainId, "must match target chain");
        CrossL2Inbox(Predeploys.CROSS_L2_INBOX).validateMessage(_id, keccak256(_data));

        bytes32 selector = abi.decode(_data[:32], (bytes32));
        require(selector == BlockHashEmitter.BlockHash.selector, "incorrect event");

        // Event should correspond to the right contest
        uint256 dataBlockNumber = abi.decode(_data[32:64], (uint256));
        require(dataBlockNumber == blockNumber, "must match target block height");

        // Resolve the contest (yes if odd, no if even)
        bytes32 blockHash = abi.decode(_data[64:], (bytes32));
        outcome = uint256(blockHash) % 2 != 0 ? ContestOutcome.YES : ContestOutcome.NO;
        contests.resolveContest(this);
    }

}
```

### TicTacToe Contest

A contest for TicTacToe is created on an accepted game between two players, captured by the emitted `AcceptedGame` event. When decoding the event, the game is uniquely identified by the chain it was created on, `chainId`, and the associated `gameId`. These identifying properties of the game are used to create the resolver for the game.

```solidity
contract TicTacToeContestFactory {
    Contests  public contests;
    TicTacToe public tictactoe;

    function newContest(Identifier calldata _id, bytes calldata _data) public payable {
        // Validate Log
        require(_id.origin == address(tictactoe), "not an event from the TicTacToe contract");
        CrossL2Inbox(Predeploys.CROSS_L2_INBOX).validateMessage(_id, keccak256(_data));

        bytes32 selector = abi.decode(_data[:32], (bytes32));
        require(selector == TicTacToe.AcceptedGame.selector, "incorrect event");

        // Decode the event data
        (uint256 chainId, uint256 gameId, address creator,) = abi.decode(_data[32:], (uint256, uint256, address, address));

        IContestResolver resolver = new TicTacToeGameResolver(contest, tictactoe, chainId, gameId, creator);
        contests.newContest{ value: msg.value }(resolver, msg.sender);
    }
}
```

When live, **anyone** can resolve the contest by providing the `GameWon` or `GameDraw` event of the associated game from the TicTacToe contract.

```solidity
contract TicTacToeGameResolver is IContestResolver {
    Contests       public contests;
    ContestOutcome public outcome;
    TicTacToe      public tictactoe;

    // @notice Game for this resolver
    Game public game;

    constructor(Contests _contest, TicTacToe _tictactoe, uint256 _chainId, uint256 _gameId, address _creator) {
        contest = _contest;
        tictactoe = _tictactoe;

        game = Game({chainId: _chainId, gameId: _gameId, creator: _creator});
        outcome = ContestOutcome.UNDECIDED;
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
        outcome = winner == game.creator && selector != TicTacToe.GameDraw.selector ? ContestOutcome.YES : ContestOutcome.NO;
        contests.resolveContest(this);
    }
}
```

## Takeaways

Leveraging superchain interop, contracts in the superchain can compose with each other in a similar fashion to how they would on a single chain. No restrictions are placed on the kinds of events a contract can consume via the `CrossL2Inbox`.

In this example, the `BlockHashContestFactory` and `TicTacToeContestFactory` can be seen as just starting points for the `Contests` app chain. As more contracts and apps are created in the superchain, this developer can compose with them in a similar fashion without needing to change the `Contests` contract at all!