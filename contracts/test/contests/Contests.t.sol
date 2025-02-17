// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";

import {MintableBurnableERC20} from "../../src/contests/utils/MintableBurnableERC20.sol";
import {ContestOutcome} from "../../src/contests/ContestResolver.sol";
import {MockResolver} from "../../src/contests/resolvers/MockResolver.sol";
import {
    Contests,
    NoValue,
    ResolverOutcomeDecided
} from "../../src/contests/Contests.sol";

contract ContestsTest is Test {
    Contests public contests;

    function setUp() public {
        contests = new Contests();
    }

    function test_newContest_succeeds() public {
        MockResolver testResolver = new MockResolver(contests);
        contests.newContest{ value: 1 ether }(testResolver, address(this));

        (, MintableBurnableERC20 yesToken, MintableBurnableERC20 noToken, MintableBurnableERC20 lpToken, uint256 ethBalance, uint256 yesBalance, uint256 noBalance) =
            contests.contests(testResolver);

        // eth balance is tracked
        assertEq(ethBalance, 1 ether);

        // lp and pool tokens at fair odds
        assertEq(lpToken.balanceOf(address(this)), ethBalance);
        assertEq(yesToken.balanceOf(address(contests)), yesBalance);
        assertEq(noToken.balanceOf(address(contests)), noBalance);
    }

    function test_newContest_decidedOutcome_reverts() public {
        MockResolver testResolver = new MockResolver(contests);
        testResolver.setOutcome(ContestOutcome.YES);

        vm.expectRevert(ResolverOutcomeDecided.selector);
        contests.newContest{ value: 1 ether }(testResolver, address(this));
    }

    function test_buyOutcome_succeeds() public {
        // seed some liquidity
        MockResolver testResolver = new MockResolver(contests);
        contests.newContest{ value: 1 ether }(testResolver, address(this));

        (, MintableBurnableERC20 yesToken, , , , uint256 yesBalance, ) = contests.contests(testResolver);

        // buy YES outcome with half of the available liquidity
        uint256 expectedAmountOut = contests.calcOutcomeOut(testResolver, ContestOutcome.YES, 0.5 ether);
        contests.buyOutcome{ value: 0.5 ether }(testResolver, ContestOutcome.YES);

        assertEq(yesToken.balanceOf(address(this)), expectedAmountOut);
        assertEq(yesToken.balanceOf(address(contests)), yesBalance - expectedAmountOut);

        // Additional ETH is now winnable in this pool
        (, , , , uint256 ethBalance, uint256 newYesBalance, ) = contests.contests(testResolver);
        assertEq(ethBalance, 1.5 ether);
        assertEq(yesToken.balanceOf(address(contests)), newYesBalance);
    }

    function test_addLiquidity_succeeds() public {
        MockResolver testResolver = new MockResolver(contests);
        contests.newContest{ value: 1 ether }(testResolver, address(this));

        // double the liquidity
        contests.addLiquidity { value: 1 ether }(testResolver, address(this));

        (, MintableBurnableERC20 yesToken, MintableBurnableERC20 noToken, MintableBurnableERC20 lpToken, uint256 ethBalance, uint256 yesBalance, uint256 noBalance) =
            contests.contests(testResolver);

        // still at even odds since no swaps have occurred
        assertEq(ethBalance, 2 ether);
        assertEq(yesBalance, 2 ether);
        assertEq(noBalance, 2 ether);

        // lp and pool tokens at fair odds
        assertEq(lpToken.balanceOf(address(this)), ethBalance);
        assertEq(yesToken.balanceOf(address(contests)), yesBalance);
        assertEq(noToken.balanceOf(address(contests)), noBalance);
    }

    function test_addLiquidity_noValue_reverts() public {
        MockResolver testResolver = new MockResolver(contests);
        contests.newContest{ value: 1 ether }(testResolver, address(this));

        vm.expectRevert(NoValue.selector);
        contests.addLiquidity(testResolver, address(this));
    }

    function test_addLiquidity_atFairOdds_succeeds() public {
        MockResolver testResolver = new MockResolver(contests);
        contests.newContest{ value: 1 ether }(testResolver, address(this));

        // Perform a swap to skew the odds
        contests.buyOutcome{ value: 0.5 ether }(testResolver, ContestOutcome.YES);

        (, MintableBurnableERC20 yesToken, MintableBurnableERC20 noToken, MintableBurnableERC20 lpToken, , uint256 yesBalance, uint256 noBalance) =
            contests.contests(testResolver);

        // add an additional ETH of liquidity via a new account
        vm.prank(address(1)); vm.deal(address(1), 1 ether);
        contests.addLiquidity{ value: 1 ether }(testResolver, address(1));

        uint256 newYesBalance = yesToken.balanceOf(address(contests));
        uint256 newNoBalance = noToken.balanceOf(address(contests));

        // pool probabilities remain the same relative to lp supply -- added liquidity. (old 1eth, new 2eth)
        assertEq(newYesBalance / 2 ether, yesBalance / 1 ether);
        assertEq(newNoBalance / 2 ether, noBalance / 1 ether);

        // LP Supply should be equal between the two providers
        assertEq(lpToken.balanceOf(address(this)), lpToken.balanceOf(address(1)));
    }
}
