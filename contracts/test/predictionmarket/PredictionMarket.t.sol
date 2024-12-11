// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";

import {MintableBurnableERC20} from "../../src/predictionmarket/utils/MintableBurnableERC20.sol";
import {MarketOutcome} from "../../src/predictionmarket/MarketResolver.sol";
import {MockResolver} from "../../src/predictionmarket/resolvers/MockResolver.sol";
import {
    Market,
    MarketStatus,
    NoValue,
    ResolverOutcomeDecided,
    PredictionMarket
} from "../../src/predictionmarket/PredictionMarket.sol";

contract PredictionMarketTest is Test {
    PredictionMarket public predictionMarket;

    function setUp() public {
        predictionMarket = new PredictionMarket();
    }

    function test_newMarket_succeeds() public {
        MockResolver testResolver = new MockResolver(predictionMarket);
        predictionMarket.newMarket{ value: 1 ether }(testResolver, address(this));

        (, , MintableBurnableERC20 yesToken, MintableBurnableERC20 noToken, MintableBurnableERC20 lpToken, uint256 ethBalance, uint256 yesBalance, uint256 noBalance) =
            predictionMarket.markets(testResolver);

        // eth balance is tracked
        assertEq(ethBalance, 1 ether);

        // lp and pool tokens at fair odds
        assertEq(lpToken.balanceOf(address(this)), ethBalance);
        assertEq(yesToken.balanceOf(address(predictionMarket)), yesBalance);
        assertEq(noToken.balanceOf(address(predictionMarket)), noBalance);
    }

    function test_newMarket_decidedOutcome_reverts() public {
        MockResolver testResolver = new MockResolver(predictionMarket);
        testResolver.setOutcome(MarketOutcome.YES);

        vm.expectRevert(ResolverOutcomeDecided.selector);
        predictionMarket.newMarket{ value: 1 ether }(testResolver, address(this));
    }

    function test_buyOutcome_succeeds() public {
        // seed some liquidity
        MockResolver testResolver = new MockResolver(predictionMarket);
        predictionMarket.newMarket{ value: 1 ether }(testResolver, address(this));

        (, , MintableBurnableERC20 yesToken, , , , uint256 yesBalance, ) = predictionMarket.markets(testResolver);

        // buy YES outcome with half of the available liquidity
        uint256 expectedAmountOut = predictionMarket.calcOutcomeOut(testResolver, MarketOutcome.YES, 0.5 ether);
        predictionMarket.buyOutcome{ value: 0.5 ether }(testResolver, MarketOutcome.YES);

        assertEq(yesToken.balanceOf(address(this)), expectedAmountOut);
        assertEq(yesToken.balanceOf(address(predictionMarket)), yesBalance - expectedAmountOut);

        // Additional ETH is now winnable in this pool
        (, , , , , uint256 ethBalance, uint256 newYesBalance, ) = predictionMarket.markets(testResolver);
        assertEq(ethBalance, 1.5 ether);
        assertEq(yesToken.balanceOf(address(predictionMarket)), newYesBalance);
    }

    function test_addLiquidity_succeeds() public {
        MockResolver testResolver = new MockResolver(predictionMarket);
        predictionMarket.newMarket{ value: 1 ether }(testResolver, address(this));

        // double the liquidity
        predictionMarket.addLiquidity { value: 1 ether }(testResolver, address(this));

        (, , MintableBurnableERC20 yesToken, MintableBurnableERC20 noToken, MintableBurnableERC20 lpToken, uint256 ethBalance, uint256 yesBalance, uint256 noBalance) =
            predictionMarket.markets(testResolver);

        // still at even odds since no swaps have occurred
        assertEq(ethBalance, 2 ether);
        assertEq(yesBalance, 2 ether);
        assertEq(noBalance, 2 ether);

        // lp and pool tokens at fair odds
        assertEq(lpToken.balanceOf(address(this)), ethBalance);
        assertEq(yesToken.balanceOf(address(predictionMarket)), yesBalance);
        assertEq(noToken.balanceOf(address(predictionMarket)), noBalance);
    }

    function test_addLiquidity_noValue_reverts() public {
        MockResolver testResolver = new MockResolver(predictionMarket);
        predictionMarket.newMarket{ value: 1 ether }(testResolver, address(this));

        vm.expectRevert(NoValue.selector);
        predictionMarket.addLiquidity(testResolver, address(this));
    }

    function test_addLiquidity_atFairOdds_succeeds() public {
        MockResolver testResolver = new MockResolver(predictionMarket);
        predictionMarket.newMarket{ value: 1 ether }(testResolver, address(this));

        // Perform a swap to skew the odds
        predictionMarket.buyOutcome{ value: 0.5 ether }(testResolver, MarketOutcome.YES);

        (, , MintableBurnableERC20 yesToken, MintableBurnableERC20 noToken, MintableBurnableERC20 lpToken, , uint256 yesBalance, uint256 noBalance) =
            predictionMarket.markets(testResolver);

        // add an additional ETH of liquidity via a new account
        vm.prank(address(1)); vm.deal(address(1), 1 ether);
        predictionMarket.addLiquidity{ value: 1 ether }(testResolver, address(1));

        uint256 newYesBalance = yesToken.balanceOf(address(predictionMarket));
        uint256 newNoBalance = noToken.balanceOf(address(predictionMarket));

        // pool probabilities remain the same relative to lp supply -- added liquidity. (old 1eth, new 2eth)
        assertEq(newYesBalance / 2 ether, yesBalance / 1 ether);
        assertEq(newNoBalance / 2 ether, noBalance / 1 ether);

        // LP Supply should be equal between the two providers
        assertEq(lpToken.balanceOf(address(this)), lpToken.balanceOf(address(1)));
    }
}
