// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import { IContestResolver, ContestOutcome } from "./ContestResolver.sol";
import { MintableBurnableERC20 } from "./utils/MintableBurnableERC20.sol";

struct Contest {
    ContestOutcome outcome;

    // Outcome Tokens
    MintableBurnableERC20 yesToken;
    MintableBurnableERC20 noToken;
    MintableBurnableERC20 lpToken;

    // Liquidity held in the contest
    uint256 ethBalance;
    uint256 yesBalance;
    uint256 noBalance;
}

// @notice thrown when the caller is not authorized to perform an action
error Unauthorized();

// @notice thrown when the contest is in an open state
error ContestOpen();

// @notice thrown when the contest is in a closed state
error ContestClosed();

// @notice thrown when a resolver has decided the outcome for a contest
error ResolverOutcomeDecided();

// @notice thrown when no value is sent to a payable function
error NoValue();

// @notice thrown when there is insufficient liquidity in the contest
error InsufficientLiquidity();

// @notice A very basic implementation of  contests.
//         1. We only support contests with a yes or no outcome.
//         2. Once a bet is placed, we do not allow swapping out of a position with the contest directly.
//         3. No incentive to provide liquidity since swap fees are not collected. LP tokens can only be redeemed
//            when the contest has resolved.
//
//         Open to Pull Requests! This is simply reference :)
contract Contests {
    // @notice created contests, addressed by their resolver
    mapping(IContestResolver => Contest) public contests;

    // @notice emitted when a new contest has been created
    event NewContest(IContestResolver _resolver, address yesToken, address noToken, address lpToken);

    // @notice emitted when a contest has been resolved
    event ContestResolved(IContestResolver indexed _resolver, ContestOutcome outcome);

    // @notice emitted when liquidity has been added to a contest
    event LiquidityAdded(IContestResolver indexed resolver, address indexed provider, uint256 ethAmountIn);

    // @notice emitted when liquidity has been redeemed from a contest
    event LiquidityRedeemed(IContestResolver indexed resolver, address indexed redeemer, uint256 lpAmount);

    // @notice emitted when a bet has been placed on a contest
    event BetPlaced(IContestResolver indexed resolver, address indexed bettor, ContestOutcome outcome, uint256 ethAmountIn, uint256 amountOut);

    // @notice emitted when an outcome token has been redeemed
    event OutcomeRedeemed(IContestResolver indexed resolver, address indexed redeemer, ContestOutcome outcome, uint256 amount, uint256 ethPayout);

    // @notice create and seed a new contest with liquidity
    // @param _resolver contract identifying the outcome for an open contest
    // @param _to address to mint LP tokens to
    function newContest(IContestResolver _resolver, address _to) public payable {
        if (msg.value == 0) revert NoValue();
        if (_resolver.outcome() != ContestOutcome.UNDECIDED) revert ResolverOutcomeDecided();

        Contest storage contest = contests[_resolver];
        contest.outcome = ContestOutcome.UNDECIDED;

        contest.yesToken = new MintableBurnableERC20("Yes", "Yes");
        contest.noToken = new MintableBurnableERC20("No", "No");
        contest.lpToken = new MintableBurnableERC20("LP", "LP");

        addLiquidity(_resolver, _to);

        emit NewContest(_resolver, address(contest.yesToken), address(contest.noToken), address(contest.lpToken));
    }

    // @notice resolve the contest
    // @param _resolver contract identifying the outcome for an open contest
    function resolveContest(IContestResolver _resolver) external {
        if (msg.sender != address(_resolver)) revert Unauthorized();

        Contest storage contest = contests[_resolver];
        if (contest.outcome != ContestOutcome.UNDECIDED) revert ContestClosed();

        // Contest must be resolvable
        ContestOutcome outcome = _resolver.outcome();
        require(outcome != ContestOutcome.UNDECIDED, "outcome must be decided");

        // Resolve this contest
        contest.outcome = outcome;

        emit ContestResolved(_resolver, outcome);
    }

    // @notice Entry point for adding liquidity into the specified contest
    // @param _resolver contract identifying the outcome for an open contest
    // @param _to address to mint LP tokens to
    function addLiquidity(IContestResolver _resolver, address _to) public payable {
        if (msg.value == 0) revert NoValue();

        Contest storage contest = contests[_resolver];
        if (contest.outcome != ContestOutcome.UNDECIDED) revert ContestClosed();

        uint256 ethAmount = msg.value;
        uint256 lpSupply = contest.lpToken.totalSupply();

        uint256 yesAmount;
        uint256 noAmount;

        if (lpSupply == 0) {
            // Initial liquidity
            yesAmount = ethAmount;
            noAmount = ethAmount;
        } else {
            // Calculate tokens to mint based on current pool ratios
            yesAmount = (ethAmount * contest.yesBalance) / lpSupply;
            noAmount = (ethAmount * contest.noBalance) / lpSupply;
        }

        // Hold pool assets
        contest.yesToken.mint(address(this), yesAmount);
        contest.noToken.mint(address(this), noAmount);

        contest.ethBalance += ethAmount;
        contest.yesBalance += yesAmount;
        contest.noBalance += noAmount;

        // Mint LP tokens to the sender
        contest.lpToken.mint(_to, ethAmount);
        emit LiquidityAdded(_resolver, _to, ethAmount);
    }

    // @notice calculate the amount of outcome tokens to receive for a given amount of ETH
    // @param _resolver contract identifying the outcome for an open contest
    // @param _outcome the outcome to buy
    // @param ethAmountIn the amount of ETH to buy
    // @dev Held Invariant: `yes_balance * no_balance = k` Where k is the total amount of liquidity. The outcome tokens
    //      are backed 1:1 with eth which allows eth to always be the input for the swap for either outcome token.
    function calcOutcomeOut(IContestResolver _resolver, ContestOutcome _outcome, uint256 ethAmountIn) public view returns (uint256) {
        Contest memory contest = contests[_resolver];
        if (_outcome == ContestOutcome.YES) {
            return (ethAmountIn * contest.yesBalance) / (ethAmountIn + contest.noBalance);
        } else {
            return (ethAmountIn * contest.noBalance) / (ethAmountIn + contest.yesBalance);
        }
    }

    // @notice calculate the current ETH payout when placing a bet on an outcome
    function calcOutcomePayout(IContestResolver _resolver, ContestOutcome _outcome, uint256 ethAmountIn) public view returns (uint256) {
        uint256 amountOut = calcOutcomeOut(_resolver, _outcome, ethAmountIn);
        Contest memory contest = contests[_resolver];
        if (_outcome == ContestOutcome.YES) {
            return (contest.ethBalance + ethAmountIn) * amountOut / contest.yesToken.totalSupply();
        } else {
            return (contest.ethBalance + ethAmountIn) * amountOut / contest.noToken.totalSupply();
        }
    }

    // @notice buy an outcome token
    // @param _resolver contract identifying the outcome for an open contest
    // @param _outcome the outcome to buy
    function buyOutcome(IContestResolver _resolver, ContestOutcome _outcome) public payable {
        if (msg.value == 0) revert NoValue();
        require(_outcome == ContestOutcome.YES || _outcome == ContestOutcome.NO);

        Contest storage contest = contests[_resolver];
        if (contest.outcome != ContestOutcome.UNDECIDED) revert ContestClosed();

        // Compute trade amounts & swap
        uint256 amountIn = msg.value;
        uint256 amountOut = calcOutcomeOut(_resolver, _outcome, amountIn);
        if (_outcome == ContestOutcome.YES) {
            if (amountOut > contest.yesBalance) revert InsufficientLiquidity();
            contest.yesBalance -= amountOut;
            contest.yesToken.transfer(msg.sender, amountOut);
        } else {
            if (amountOut > contest.noBalance) revert InsufficientLiquidity();
            contest.noBalance -= amountOut;
            contest.noToken.transfer(msg.sender, amountOut);
        }

        contest.ethBalance += amountIn;
        emit BetPlaced(_resolver, msg.sender, _outcome, amountIn, amountOut);
    }

    // @notice redeem outcome tokens for ETH
    // @param _resolver contract identifying the outcome for an open contest
    function redeem(IContestResolver _resolver) public {
        Contest storage contest = contests[_resolver];
        if (contest.outcome == ContestOutcome.UNDECIDED) revert ContestOpen();

        MintableBurnableERC20 outcomeToken = contest.outcome == ContestOutcome.YES ? contest.yesToken : contest.noToken;
        uint256 outcomeBalance = outcomeToken.balanceOf(msg.sender);
        uint256 outcomeSupply = outcomeToken.totalSupply();

        // Transfer & burn the winning outcome tokens
        outcomeToken.burnFrom(msg.sender, outcomeBalance);

        // Payout is directly proportional to the amount of tokens (eth balance > supply as bets are placed)
        uint256 ethPayout = (contest.ethBalance * outcomeBalance) / outcomeSupply;
        require(ethPayout <= contest.ethBalance);

        contest.ethBalance -= ethPayout;

        (bool success, ) = payable(msg.sender).call{value: ethPayout}("");
        require(success);

        emit OutcomeRedeemed(_resolver, msg.sender, contest.outcome, outcomeBalance, ethPayout);
    }

    // @notice remove liquidity from the specified contest (outcome tokens only)
    // @param _resolver contract identifying the outcome for an open contest
    function redeemLP(IContestResolver _resolver) public {
        Contest storage contest = contests[_resolver];
        if (contest.outcome == ContestOutcome.UNDECIDED) revert ContestOpen();

        uint256 lpSupply = contest.lpToken.totalSupply();
        uint256 lpBalance = contest.lpToken.balanceOf(msg.sender);

        // Burn LP tokens
        contest.lpToken.burnFrom(msg.sender, lpBalance);

        // Return appropriate share the winning outcome.
        if (contest.outcome == ContestOutcome.YES) {
            uint256 yesAmount = (contest.yesBalance * lpBalance) / lpSupply;
            require(contest.yesBalance <= yesAmount);

            contest.yesBalance -= yesAmount;
            contest.yesToken.transfer(msg.sender, yesAmount);
        } else {
            uint256 noAmount = (contest.noBalance * lpBalance) / lpSupply;
            require(contest.noBalance <= noAmount);

            contest.noBalance -= noAmount;
            contest.noToken.transfer(msg.sender, noAmount);
        }

        // Redeem the transferred outcome tokens
        redeem(_resolver);

        emit LiquidityRedeemed(_resolver, msg.sender, lpBalance);
    }
}
