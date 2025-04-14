// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Test} from "forge-std/Test.sol";
import {console} from "forge-std/console.sol";

import {StdUtils} from "forge-std/StdUtils.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {Relayer} from "@interop-lib/test/Relayer.sol";
import {CrossL2Inbox} from "@contracts-bedrock/L2/CrossL2Inbox.sol";
import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";
import {L2ToL2CrossDomainMessenger} from "@contracts-bedrock/L2/L2ToL2CrossDomainMessenger.sol";

import {Currency, CurrencyLibrary} from "@uniswap-v4-core/src/types/Currency.sol";
import {IHooks} from "@uniswap-v4-core/src/interfaces/IHooks.sol";
import {IPoolManager} from "@uniswap-v4-core/src/interfaces/IPoolManager.sol";
import {IPositionManager} from "@uniswap-v4-periphery/src/interfaces/IPositionManager.sol";
import {PoolId, PoolIdLibrary} from "@uniswap-v4-core/src/types/PoolId.sol";
import {PoolKey} from "@uniswap-v4-core/src/types/PoolKey.sol";
import {TickMath} from "@uniswap-v4-core/src/libraries/TickMath.sol";
import {LiquidityAmounts} from "@uniswap-v4-core/test/utils/LiquidityAmounts.sol";
import {StateLibrary} from "@uniswap-v4-core/src/libraries/StateLibrary.sol";
import {EasyPosm} from "@uniswap-v4-template/test/utils/EasyPosm.sol";

import {ERC20Reference} from "../src/ERC20Reference.sol";

import {UniswapFixtures} from "./UniswapFixtures.t.sol";
import {ERC20ReferenceTest} from "./ERC20Reference.t.sol";

contract ERC20ReferenceUniswapV4Test is Test, ERC20ReferenceTest, UniswapFixtures {
    using EasyPosm for IPositionManager;
    using PoolIdLibrary for PoolKey;
    using CurrencyLibrary for Currency;
    using StateLibrary for IPoolManager;

    PoolKey poolKey;
    PoolId poolId;

    // Chain A (Base), Chain B (OPM)
    constructor() ERC20ReferenceTest() {}

    function spender() public view override returns (address) {
        return address(posm);
    }

    function setUp() public override {
        // The v4 pool only exists on the remote chain with no erc20 (B)
        vm.selectFork(chainB);

        // creates the pool manager, utility routers, and test tokens
        deployFreshManagerAndRouters();
        deployPosm(manager);

        // Setup ERC20Reference. Setup after v4 deployment since
        // the POSM (uniswap v4) is going to be the approved spender
        super.setUp();

        // setup the create eth/erc20 pool
        poolKey = PoolKey(Currency.wrap(address(0)), Currency.wrap(address(remoteERC20)), 3000, 60, IHooks(address(0)));
        poolId = poolKey.toId();
        manager.initialize(poolKey, SQRT_PRICE_1_1);
    }

    function test_poolSetup() public {
        // Provide full-range liquidity to the pool
        int24 tickLower = TickMath.minUsableTick(poolKey.tickSpacing);
        int24 tickUpper = TickMath.maxUsableTick(poolKey.tickSpacing);

        uint128 liquidityAmount = 100e18;
        (uint256 amount0Expected, uint256 amount1Expected) = LiquidityAmounts.getAmountsForLiquidity(
            SQRT_PRICE_1_1,
            TickMath.getSqrtPriceAtTick(tickLower),
            TickMath.getSqrtPriceAtTick(tickUpper),
            liquidityAmount
        );

        // Deal erc20 on the home chain & Approve Uniswap
        vm.selectFork(chainA);
        deal(address(erc20), address(this), amount1Expected + 1);
        erc20.approve(address(remoteERC20), amount1Expected + 1);
        remoteERC20.approve(address(posm), amount1Expected + 1);
        relayAllMessages();

        // On remote, approve permit2 for the posm (could also just be a signature)
        vm.selectFork(chainB);
        vm.deal(address(this), amount0Expected + 1);
        permit2.approve(address(remoteERC20), address(posm), type(uint160).max, type(uint48).max);
        posm.mint(
            poolKey,
            tickLower,
            tickUpper,
            liquidityAmount,
            amount0Expected + 1,
            amount1Expected + 1,
            address(this),
            block.timestamp,
            ZERO_BYTES
        );
    }

    function test_swap() public {
        test_poolSetup();

        // No Balance on the chain with the native ERC20
        vm.selectFork(chainA);
        assertEq(erc20.balanceOf(address(this)), 0);

        // Swap in ETH on chain with the v4 Pool
        vm.selectFork(chainB);
        vm.deal(address(this), 1 ether);
        swap(poolKey, true, -1 ether, ZERO_BYTES);
        relayAllMessages();

        // THERE IS A NATIVE BALANCE (output of the swap)
        vm.selectFork(chainA);
        assertGt(erc20.balanceOf(address(this)), 0);
    }
}
