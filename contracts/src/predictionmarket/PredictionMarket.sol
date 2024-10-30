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
}

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
    event MarketResolved(IMarketResolver _resolver, MarketOutcome outcome);

    // @notice emitted when liquidity has been added to a market
    event LiquidityAdded(IMarketResolver resolver, address provider, uint256 ethAmount);

    // @notice emitted when liquidity has been redeemed from a market
    event LiquidityRedeemed(IMarketResolver resolver, address redeemer, uint256 yesAmount, uint256 noAmount);

    // @notice emitted when a bet has been placed on a market
    event BetPlaced(IMarketResolver resolver, address bettor, MarketOutcome outcome, uint256 amountIn, uint256 amountOut);

    // @notice emitted when an outcome token has been redeemed
    event OutcomeRedeemed(IMarketResolver resolver, address redeemer, MarketOutcome outcome, uint256 amount);

    // @notice create and seed a new prediction market with liquidity
    // @param _resolver contract identifying the outcome for an open market
    function newMarket(IMarketResolver _resolver) public payable {
        require(_resolver.outcome() == MarketOutcome.UNDECIDED);

        Market storage market = markets[_resolver];
        market.status = MarketStatus.OPEN;
        market.outcome = MarketOutcome.UNDECIDED;

        market.yesToken = new MintableBurnableERC20("Yes", "Y");
        market.noToken = new MintableBurnableERC20("No", "N");
        market.lpToken = new MintableBurnableERC20("LP", "LP");

        if (msg.value > 0) {
            addLiquidity(_resolver);
        }

        emit NewMarket(_resolver, address(market.yesToken), address(market.noToken), address(market.lpToken));
    }

    // @notice resolve the market
    // @param _resolver contract identifying the outcome for an open market
    function resolveMarket(IMarketResolver _resolver) public {
        Market storage market = markets[_resolver];
        require(market.status == MarketStatus.OPEN);

        // Market must be resolvable
        MarketOutcome outcome = _resolver.outcome();
        require(outcome != MarketOutcome.UNDECIDED);

        // Resolve this market
        market.status = MarketStatus.CLOSED;
        market.outcome = outcome;

        emit MarketResolved(_resolver, outcome);
    }


    // @notice Entry point for adding liquidity into the specified market
    // @param _resolver contract identifying the outcome for an open market
    function addLiquidity(IMarketResolver _resolver) public payable {
        require(msg.value > 0);
        uint256 ethAmount = msg.value;

        Market storage market = markets[_resolver];
        require(market.status == MarketStatus.OPEN);

        uint256 lpAmount;
        uint256 yesAmount;
        uint256 noAmount;

        if (market.lpToken.totalSupply() == 0) {
            // Initial liquidity
            lpAmount = ethAmount;
            yesAmount = ethAmount;
            noAmount = ethAmount;
        } else {
            // Add liquidity according to the current ratios of the market
            uint256 yesBalance = market.yesToken.balanceOf(address(this));
            uint256 noBalance = market.noToken.balanceOf(address(this));
            
            // Calculate tokens to mint based on current pool ratios
            yesAmount = (ethAmount * yesBalance) / market.ethBalance;
            noAmount = (ethAmount * noBalance) / market.ethBalance;
            
            // LP tokens are minted proportionally to ETH contribution
            lpAmount = (ethAmount * market.lpToken.totalSupply()) / market.ethBalance;
        }

        // Hold pool assets
        market.yesToken.mint(address(this), yesAmount);
        market.noToken.mint(address(this), noAmount);
        market.ethBalance += ethAmount;

        // Mint LP tokens to the sender
        market.lpToken.mint(msg.sender, lpAmount);
        emit LiquidityAdded(_resolver, msg.sender, ethAmount);
    }

    function calcOutcomeOut(IMarketResolver _resolver, MarketOutcome _outcome, uint256 ethAmountIn) public view returns (uint256) {
        Market memory market = markets[_resolver];
        uint256 yesBalance = market.yesToken.balanceOf(address(this));
        uint256 noBalance = market.noToken.balanceOf(address(this));
        if (_outcome == MarketOutcome.YES) {
            return (ethAmountIn * yesBalance) / (ethAmountIn + noBalance);
        } else {
            return (ethAmountIn * noBalance) / (ethAmountIn + yesBalance);
        }
    }

    // @notice buy an outcome token
    // @param _resolver contract identifying the outcome for an open market
    // @param _outcome the outcome to buy
    function buyOutcome(IMarketResolver _resolver, MarketOutcome _outcome) public payable {
        require(msg.value > 0);
        require(_outcome == MarketOutcome.YES || _outcome == MarketOutcome.NO);

        uint256 amountIn = msg.value;

        // Market must be tradeable & liquid with the amount eth in
        Market storage market = markets[_resolver];
        require(market.status == MarketStatus.OPEN);
        require(market.ethBalance > amountIn);

        // Compute trade amounts
        uint256 amountOut = calcOutcomeOut(_resolver, _outcome, amountIn);
        MintableBurnableERC20 outcomeToken = _outcome == MarketOutcome.YES ? market.yesToken : market.noToken; 

        // Perform swap
        market.ethBalance += amountIn;
        outcomeToken.transfer(address(this), amountOut);
        emit BetPlaced(_resolver, msg.sender, _outcome, amountIn, amountOut);
    }

    // @notice redeem outcome tokens for ETH
    // @param _resolver contract identifying the outcome for an open market
    function redeem(IMarketResolver _resolver) public {
        Market storage market = markets[_resolver];
        require(market.status == MarketStatus.CLOSED);

        MintableBurnableERC20 outcomeToken = market.outcome == MarketOutcome.YES ? market.yesToken : market.noToken;
        uint256 amount = outcomeToken.balanceOf(msg.sender);

        // Transfer & burn the winning outcome tokens
        outcomeToken.transfer(msg.sender, amount);
        outcomeToken.burn(amount);

        // Payout is directly proportional to the amount of tokens
        require(amount <= market.ethBalance);
        market.ethBalance -= amount;

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success);

        emit OutcomeRedeemed(_resolver, msg.sender, market.outcome, amount);
    }

    // @notice remove liquidity from the specified market (outcome tokens only)
    // @param _resolver contract identifying the outcome for an open market
    function redeemLP(IMarketResolver _resolver) public {
        Market storage market = markets[_resolver];
        require(market.status == MarketStatus.CLOSED);

        uint256 lpSupply = market.lpToken.totalSupply();
        uint256 lpBalance = market.lpToken.balanceOf(msg.sender);

        uint256 yesBalance = market.yesToken.balanceOf(address(this));
        uint256 noBalance = market.noToken.balanceOf(address(this));

        // Burn LP tokens
        market.lpToken.transferFrom(msg.sender, address(this),lpBalance);
        market.lpToken.burn(lpBalance);

        // Return appropriate share of both outcomes. We don't differentiate
        // between if the market is resolved or not since the losing outcome
        // token is not redeemable anyways.
        //
        // No ETH is returned as liquidity is permanently supplied at the
        // fair odds of the market.

        uint256 yesAmount = (lpBalance * yesBalance) / lpSupply;
        uint256 noAmount = (lpBalance * noBalance) / lpSupply;

        market.yesToken.transfer(msg.sender, yesAmount);
        market.noToken.transfer(msg.sender, noAmount);

        emit LiquidityRedeemed(_resolver, msg.sender, yesAmount, noAmount);
    }
}
