// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { Test } from "forge-std/Test.sol";

import { MintableBurnableERC20 } from "../../src/predictionmarket/utils/MintableBurnableERC20.sol";
import { MarketOutcome } from "../../src/predictionmarket/MarketResolver.sol";
import {
    Market,
    MarketStatus,
    NoValue,
    ResolverOutcomeDecided,
    PredictionMarket
} from "../../src/predictionmarket/PredictionMarket.sol";

import { TestResolver } from "./TestResolver.sol";

contract PredictionMarketTest is Test {
    PredictionMarket public predictionMarket;

    function setUp() public {
        predictionMarket = new PredictionMarket();
    }

    function test_newMarket_succeeds() public {
        TestResolver testResolver = new TestResolver();
        predictionMarket.newMarket(testResolver);

        (MarketStatus status, MarketOutcome outcome, , , , ) = predictionMarket.markets(testResolver);
        if (status != MarketStatus.OPEN) fail();
        if (outcome != MarketOutcome.UNDECIDED) fail();
    }

    function test_newMarket_addLiquidityWithValue_succeeds() public {
        TestResolver testResolver = new TestResolver();
        predictionMarket.newMarket{ value: 1 ether }(testResolver);

        (, , MintableBurnableERC20 yesToken, MintableBurnableERC20 noToken, MintableBurnableERC20 lpToken, uint256 liquidity) =
            predictionMarket.markets(testResolver);

        // eth balance is tracked
        assertEq(liquidity, 1 ether);

        // lp and pool tokens at fair odds
        assertEq(lpToken.balanceOf(address(this)), liquidity);
        assertEq(yesToken.balanceOf(address(predictionMarket)), liquidity);
        assertEq(noToken.balanceOf(address(predictionMarket)), liquidity);
    }

    function test_newMarket_decidedOutcome_reverts() public {
        TestResolver testResolver = new TestResolver();
        testResolver.setOutcome(MarketOutcome.YES);

        vm.expectRevert(ResolverOutcomeDecided.selector);
        predictionMarket.newMarket(testResolver);
    }

    function test_buyOutcome_succeeds() public {
        // seed some liquidity
        TestResolver testResolver = new TestResolver();
        predictionMarket.newMarket{ value: 1 ether }(testResolver);

        (, , MintableBurnableERC20 yesToken, , ,) = predictionMarket.markets(testResolver);

        // buy YES outcome with half of the available liquidity
        uint256 expectedAmountOut = predictionMarket.calcOutcomeOut(testResolver, MarketOutcome.YES, 0.5 ether);
        predictionMarket.buyOutcome{ value: 0.5 ether }(testResolver, MarketOutcome.YES);

        assertEq(yesToken.balanceOf(address(this)), expectedAmountOut);

        // Additional ETH is now winnable in this pool
        (, , , , , uint256 liquidity) = predictionMarket.markets(testResolver);
        assertEq(liquidity, 1.5 ether);
    }

    function test_addLiquidity_succeeds() public {
        TestResolver testResolver = new TestResolver();
        predictionMarket.newMarket{ value: 1 ether }(testResolver);

        // double the liquidity
        predictionMarket.addLiquidity { value: 1 ether }(testResolver);

        (, , MintableBurnableERC20 yesToken, MintableBurnableERC20 noToken, MintableBurnableERC20 lpToken, uint256 liquidity) =
            predictionMarket.markets(testResolver);

        assertEq(liquidity, 2 ether);

        // lp and pool tokens at fair odds
        assertEq(lpToken.balanceOf(address(this)), liquidity);
        assertEq(yesToken.balanceOf(address(predictionMarket)), liquidity);
        assertEq(noToken.balanceOf(address(predictionMarket)), liquidity);
    }

    function test_addLiquidity_noValue_reverts() public {
        TestResolver testResolver = new TestResolver();
        predictionMarket.newMarket(testResolver);

        vm.expectRevert(NoValue.selector);
        predictionMarket.addLiquidity(testResolver);
    }

    function test_addLiquidity_atFairOdds_succeeds() public {
        TestResolver testResolver = new TestResolver();
        predictionMarket.newMarket{ value: 1 ether }(testResolver);

        (, , MintableBurnableERC20 yesToken, MintableBurnableERC20 noToken, MintableBurnableERC20 lpToken, ) =
            predictionMarket.markets(testResolver);

        // Perform a swap to skew the odds
        predictionMarket.buyOutcome{ value: 0.5 ether }(testResolver, MarketOutcome.YES);

        uint256 yesBalance = yesToken.balanceOf(address(predictionMarket));
        uint256 noBalance = noToken.balanceOf(address(predictionMarket));

        // add an additional ETH of liquidity via a new account
        vm.prank(address(1)); vm.deal(address(1), 1 ether);
        predictionMarket.addLiquidity{ value: 1 ether }(testResolver);

        uint256 newYesBalance = yesToken.balanceOf(address(predictionMarket));
        uint256 newNoBalance = noToken.balanceOf(address(predictionMarket));

        // pool probabilities remain the same relative to lp supply -- added liquidity. (old 1eth, new 2eth)
        assertEq(newYesBalance / 2 ether, yesBalance / 1 ether);
        assertEq(newNoBalance / 2 ether, noBalance / 1 ether);

        // LP Supply should be equal between the two providers
        assertEq(lpToken.balanceOf(address(this)), lpToken.balanceOf(address(1)));
    }
}
