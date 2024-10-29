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

// @notice A very basic implementation of a prediction market. We only support
//         placing a bets on outcome. Once a bet is placed, we do not allow swapping 
//         out of the position with the market directly.
contract PredictionMarket {
    // @notice created markets, addressed by their resolver
    mapping(address => Market) public markets;

    // @notice emitted when a new market has been created
    event NewMarket(IMarketResolver resolver, address yesToken, address noToken, address lpToken);

    // @notice emitted when a market has been resolved
    event MarketResolved(IMarketResolver resolver, MarketOutcome outcome);

    // @notice emitted when liquidity has been added to a market
    event LiquidityAdded(address resolver, address provider, uint256 ethAmount);

    // @notice emitted when a bet has been placed on a market
    event BetPlaced(address resolver, address bettor, MarketOutcome outcome, uint256 amountIn, uint256 amountOut);

    // @notice create and seed a new prediction market with liquidity
    // @param _resolver contract identifying the outcome for an open market
    function newMarket(IMarketResolver _resolver) public payable {
        require(_resolver.outcome() == MarketOutcome.UNDECIDED);

        Market storage market = markets[address(_resolver)];
        market.status = MarketStatus.OPEN;
        market.outcome = MarketOutcome.UNDECIDED;

        market.yesToken = new MintableBurnableERC20("Yes", "Y");
        market.noToken = new MintableBurnableERC20("No", "N");
        market.lpToken = new MintableBurnableERC20("LP", "LP");

        if (msg.value > 0) {
            addLiquidity(address(_resolver));
        }

        emit NewMarket(_resolver, address(market.yesToken), address(market.noToken), address(market.lpToken));
    }


    // @notice Entry point for adding liquidity into the specified market
    // @param _resolver contract identifying the outcome for an open market
    function addLiquidity(address _resolver) public payable {
        require(msg.value > 0);
        uint256 ethAmount = msg.value;

        Market storage market = markets[_resolver];
        require(market.status == MarketStatus.OPEN);
        require(market.outcome == MarketStatus.UNDECIDED);

        // Create equal amount of each outcome
        market.yesToken.mint(msg.sender, ethAmount);
        market.noToken.mint(msg.sender, ethAmount);

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

    // @notice resolve the market
    // @param _resolver contract identifying the outcome for an open market
    function resolveMarket(address _resolver) public {
        Market storage market = markets[_resolver];
        require(market.status == MarketStatus.OPEN);

        // Market must be resolvable
        MarketOutcome outcome = market.resolver.outcome();
        require(outcome != MarketStatus.UNDECIDED);

        // Resolve this market
        market.status = MarketStatus.CLOSED;
        market.outcome = outcome;

        emit MarketResolved(_resolver, outcome);
    }

    // @notice buy an outcome token
    // @param _resolver contract identifying the outcome for an open market
    // @param _outcome the outcome to buy
    function buyOutcome(address _resolver, MarketOutcome _outcome) public payable {
        require(msg.value > 0);
        require(_outcome == MarketOutcome.YES || _outcome == MarketOutcome.NO);

        // Market must be tradeable
        Market storage market = markets[_resolver];
        require(market.status == MarketStatus.OPEN);
        require(market.outcome == MarketStatus.UNDECIDED);
        require(market.ethBalance > 0);

        uint256 amountIn = msg.value;
        uint256 yesBalance = market.yesToken.balanceOf(address(this));
        uint256 noBalance = market.noToken.balanceOf(address(this));

        // TODO:
        // - Handle insufficient liquidity to perform this swap
        // - Handle invariant calculation

        // Compute trade amounts
        uint256 amountOut;
        MintableBurnableERC20 outcomeToken;
        if (_outcome == MarketOutcome.YES) {
            outcomeToken = market.yesToken;
            amountOut = (amountIn * yesBalance) / (amountIn + noBalance);
        } else {
            outcomeToken = market.noToken;
            amountOut = (amountIn * noBalance) / (amountIn + yesBalance);
        }

        // Perform swap
        market.ethBalance += amountIn;
        outcomeToken.transfer(address(this), amountOut);

        emit BetPlaced(_resolver, msg.sender, _outcome, amountIn, amountOut);
    }
}
