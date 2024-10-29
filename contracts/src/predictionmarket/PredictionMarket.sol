// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import { IMarketResolver, MarketOutcome } from "./MarketResolver.sol";
import { MintableBurnableERC20 } from "./utils/MintableBurnableERC20.sol";

enum MarketStatus {
    OPEN,
    CLOSED
}

struct Market {
    MarketStatus status;
    MarketOutcome outcome;

    // Outcome Tokens
    MintableBurnableERC20 yesToken;
    MintableBurnableERC20 noToken;
    MintableBurnableERC20 lpToken;

    // Liquidity held in the market
    uint256 ethBalance;
    uint256 yesBalance;
    uint256 noBalance;
}

// @notice thrown when the caller is not authorized to perform an action
error Unauthorized();

// @notice thrown when the market is in an open state
error MarketOpen();

// @notice thrown when the market is in a closed state
error MarketClosed();

// @notice thrown when a resolver has decided the outcome for a market
error ResolverOutcomeDecided();

// @notice thrown when no value is sent to a payable function
error NoValue();

// @notice thrown when there is insufficient liquidity in the market
error InsufficientLiquidity();

// @notice A very basic implementation of a prediction market.
//         1. We only support markets with a yes or no outcome.
//         2. Once a bet is placed, we do not allow swapping out of a position with the market directly.
//         3. No incentive to provide liquidity since swap fees are not collected. LP tokens can only be redeemed
//            when the market has resolved.
//
//         Open to Pull Requests! This is simply reference :)
contract PredictionMarket {
    // @notice created markets, addressed by their resolver
    mapping(IMarketResolver => Market) public markets;

    // @notice emitted when a new market has been created
    event NewMarket(IMarketResolver _resolver, address yesToken, address noToken, address lpToken);

    // @notice emitted when a market has been resolved
    event MarketResolved(IMarketResolver indexed _resolver, MarketOutcome outcome);

    // @notice emitted when liquidity has been added to a market
    event LiquidityAdded(IMarketResolver indexed resolver, address indexed provider, uint256 ethAmountIn);

    // @notice emitted when liquidity has been redeemed from a market
    event LiquidityRedeemed(IMarketResolver indexed resolver, address indexed redeemer, uint256 lpAmount);

    // @notice emitted when a bet has been placed on a market
    event BetPlaced(IMarketResolver indexed resolver, address indexed bettor, MarketOutcome outcome, uint256 ethAmountIn, uint256 amountOut);

    // @notice emitted when an outcome token has been redeemed
    event OutcomeRedeemed(IMarketResolver indexed resolver, address indexed redeemer, MarketOutcome outcome, uint256 amount, uint256 ethPayout);

    // @notice create and seed a new prediction market with liquidity
    // @param _resolver contract identifying the outcome for an open market
    // @param _to address to mint LP tokens to
    function newMarket(IMarketResolver _resolver, address _to) public payable {
        if (msg.value == 0) revert NoValue();
        if (_resolver.outcome() != MarketOutcome.UNDECIDED) revert ResolverOutcomeDecided();

        Market storage market = markets[_resolver];
        market.status = MarketStatus.OPEN;
        market.outcome = MarketOutcome.UNDECIDED;

        market.yesToken = new MintableBurnableERC20("Yes", "Yes");
        market.noToken = new MintableBurnableERC20("No", "No");
        market.lpToken = new MintableBurnableERC20("LP", "LP");

        addLiquidity(_resolver, _to);

        emit NewMarket(_resolver, address(market.yesToken), address(market.noToken), address(market.lpToken));
    }

    // @notice resolve the market
    // @param _resolver contract identifying the outcome for an open market
    function resolveMarket(IMarketResolver _resolver) external {
        if (msg.sender != address(_resolver)) revert Unauthorized();

        Market storage market = markets[_resolver];
        if (market.status == MarketStatus.CLOSED) revert MarketClosed();

        // Market must be resolvable
        MarketOutcome outcome = _resolver.outcome();
        require(outcome != MarketOutcome.UNDECIDED, "outcome must be decided");

        // Resolve this market
        market.outcome = outcome;
        market.status = MarketStatus.CLOSED;

        emit MarketResolved(_resolver, outcome);
    }

    // @notice Entry point for adding liquidity into the specified market
    // @param _resolver contract identifying the outcome for an open market
    // @param _to address to mint LP tokens to
    function addLiquidity(IMarketResolver _resolver, address _to) public payable {
        if (msg.value == 0) revert NoValue();

        Market storage market = markets[_resolver];
        if (market.status == MarketStatus.CLOSED) revert MarketClosed();

        uint256 ethAmount = msg.value;
        uint256 lpSupply = market.lpToken.totalSupply();

        uint256 yesAmount;
        uint256 noAmount;

        if (lpSupply == 0) {
            // Initial liquidity
            yesAmount = ethAmount;
            noAmount = ethAmount;
        } else {
            // Calculate tokens to mint based on current pool ratios
            yesAmount = (ethAmount * market.yesBalance) / lpSupply;
            noAmount = (ethAmount * market.noBalance) / lpSupply;
        }

        // Hold pool assets
        market.yesToken.mint(address(this), yesAmount);
        market.noToken.mint(address(this), noAmount);

        market.ethBalance += ethAmount;
        market.yesBalance += yesAmount;
        market.noBalance += noAmount;

        // Mint LP tokens to the sender
        market.lpToken.mint(_to, ethAmount);
        emit LiquidityAdded(_resolver, _to, ethAmount);
    }

    // @notice calculate the amount of outcome tokens to receive for a given amount of ETH
    // @param _resolver contract identifying the outcome for an open market
    // @param _outcome the outcome to buy
    // @param ethAmountIn the amount of ETH to buy
    // @dev Held Invariant: `yes_balance * no_balance = k` Where k is the total amount of liquidity. The outcome tokens
    //      are backed 1:1 with eth which allows eth to always be the input for the swap for either outcome token.
    function calcOutcomeOut(IMarketResolver _resolver, MarketOutcome _outcome, uint256 ethAmountIn) public view returns (uint256) {
        Market memory market = markets[_resolver];
        if (_outcome == MarketOutcome.YES) {
            return (ethAmountIn * market.yesBalance) / (ethAmountIn + market.noBalance);
        } else {
            return (ethAmountIn * market.noBalance) / (ethAmountIn + market.yesBalance);
        }
    }

    // @notice calculate the current ETH payout when placing a bet on an outcome
    function calcOutcomePayout(IMarketResolver _resolver, MarketOutcome _outcome, uint256 ethAmountIn) public view returns (uint256) {
        uint256 amountOut = calcOutcomeOut(_resolver, _outcome, ethAmountIn);
        Market memory market = markets[_resolver];
        if (_outcome == MarketOutcome.YES) {
            return (market.ethBalance + ethAmountIn) * amountOut / market.yesToken.totalSupply();
        } else {
            return (market.ethBalance + ethAmountIn) * amountOut / market.noToken.totalSupply();
        }
    }

    // @notice buy an outcome token
    // @param _resolver contract identifying the outcome for an open market
    // @param _outcome the outcome to buy
    function buyOutcome(IMarketResolver _resolver, MarketOutcome _outcome) public payable {
        if (msg.value == 0) revert NoValue();
        require(_outcome == MarketOutcome.YES || _outcome == MarketOutcome.NO);

        Market storage market = markets[_resolver];
        if (market.status == MarketStatus.CLOSED) revert MarketClosed();

        // Compute trade amounts & swap
        uint256 amountIn = msg.value;
        uint256 amountOut = calcOutcomeOut(_resolver, _outcome, amountIn);
        if (_outcome == MarketOutcome.YES) {
            if (amountOut > market.yesBalance) revert InsufficientLiquidity();
            market.yesBalance -= amountOut;
            market.yesToken.transfer(msg.sender, amountOut);
        } else {
            if (amountOut > market.noBalance) revert InsufficientLiquidity();
            market.noBalance -= amountOut;
            market.noToken.transfer(msg.sender, amountOut);
        }

        market.ethBalance += amountIn;
        emit BetPlaced(_resolver, msg.sender, _outcome, amountIn, amountOut);
    }

    // @notice redeem outcome tokens for ETH
    // @param _resolver contract identifying the outcome for an open market
    function redeem(IMarketResolver _resolver) public {
        Market storage market = markets[_resolver];
        if (market.status == MarketStatus.OPEN) revert MarketOpen();

        MintableBurnableERC20 outcomeToken = market.outcome == MarketOutcome.YES ? market.yesToken : market.noToken;
        uint256 outcomeBalance = outcomeToken.balanceOf(msg.sender);
        uint256 outcomeSupply = outcomeToken.totalSupply();

        // Transfer & burn the winning outcome tokens
        outcomeToken.burnFrom(msg.sender, outcomeBalance);

        // Payout is directly proportional to the amount of tokens (eth balance > supply as bets are placed)
        uint256 ethPayout = (market.ethBalance * outcomeBalance) / outcomeSupply;
        require(ethPayout <= market.ethBalance);

        market.ethBalance -= ethPayout;

        (bool success, ) = payable(msg.sender).call{value: ethPayout}("");
        require(success);

        emit OutcomeRedeemed(_resolver, msg.sender, market.outcome, outcomeBalance, ethPayout);
    }

    // @notice remove liquidity from the specified market (outcome tokens only)
    // @param _resolver contract identifying the outcome for an open market
    function redeemLP(IMarketResolver _resolver) public {
        Market storage market = markets[_resolver];
        if (market.status == MarketStatus.OPEN) revert MarketOpen();

        uint256 lpSupply = market.lpToken.totalSupply();
        uint256 lpBalance = market.lpToken.balanceOf(msg.sender);

        // Burn LP tokens
        market.lpToken.burnFrom(msg.sender, lpBalance);

        // Return appropriate share the winning outcome.
        if (market.outcome == MarketOutcome.YES) {
            uint256 yesAmount = (market.yesBalance * lpBalance) / lpSupply;
            require(market.yesBalance <= yesAmount);

            market.yesBalance -= yesAmount;
            market.yesToken.transfer(msg.sender, yesAmount);
        } else {
            uint256 noAmount = (market.noBalance * lpBalance) / lpSupply;
            require(market.noBalance <= noAmount);

            market.noBalance -= noAmount;
            market.noToken.transfer(msg.sender, noAmount);
        }

        // Redeem the transferred outcome tokens
        redeem(_resolver);

        emit LiquidityRedeemed(_resolver, msg.sender, lpBalance);
    }
}
