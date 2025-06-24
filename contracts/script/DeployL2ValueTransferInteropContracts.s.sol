// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import {Script, console} from "forge-std/Script.sol";

import { Predeploys } from "@contracts-bedrock/libraries/Predeploys.sol";

contract DeployL2ValueTransferInteropContracts is Script {
    /// @notice The storage slot that holds the address of a proxy implementation.
    /// @dev `bytes32(uint256(keccak256('eip1967.proxy.implementation')) - 1)`
    bytes32 internal constant PROXY_IMPLEMENTATION_SLOT =
        0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;
    
    /// @notice The storage slot that holds the address of the owner.
    /// @dev `bytes32(uint256(keccak256('eip1967.proxy.admin')) - 1)`
    bytes32 internal constant PROXY_ADMIN_SLOT = 0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103;
        
    /// @notice Modifier that wraps a function in broadcasting.
    modifier broadcast() {
        vm.startBroadcast();
        _;
        vm.stopBroadcast();
    }

    function setUp() public {}

    function runWithStateDump(string memory allocsPath, string memory outputPath) public {
        vm.loadAllocs(allocsPath);

        run();

        vm.dumpState(outputPath);
    }

    function run() public broadcast {
        setETHLiquidity();
        setSuperchainETHBridge();
        setSuperchainTokenBridge();
    }

    /// @notice This predeploy is following the safety invariant #1.
    ///         This contract has no initializer.
    function setSuperchainTokenBridge() internal {
        _setPredeployProxy(Predeploys.SUPERCHAIN_TOKEN_BRIDGE);
        _setImplementationCode(Predeploys.SUPERCHAIN_TOKEN_BRIDGE);
    }

    /// @notice This predeploy is following the safety invariant #1.
    ///         This contract has no initializer.
    function setSuperchainETHBridge() internal {
        _setPredeployProxy(Predeploys.SUPERCHAIN_ETH_BRIDGE);
        _setImplementationCode(Predeploys.SUPERCHAIN_ETH_BRIDGE);
    }

    /// @notice This predeploy is following the safety invariant #1.
    ///         This contract has no initializer.
    function setETHLiquidity() internal {
        _setPredeployProxy(Predeploys.ETH_LIQUIDITY);
        _setImplementationCode(Predeploys.ETH_LIQUIDITY);
        vm.deal(Predeploys.ETH_LIQUIDITY, type(uint248).max);
    }

    function _setPredeployProxy(address _addr) internal {
        bytes memory code = vm.getDeployedCode("Proxy.sol:Proxy");
        
        vm.etch(_addr, code);
        _setAdmin(_addr, Predeploys.PROXY_ADMIN);

        address implementation = Predeploys.predeployToCodeNamespace(_addr);
        _setImplementation(_addr, implementation);
    }

    /// @notice Sets the bytecode in state
    function _setImplementationCode(address _addr) internal returns (address) {
        string memory cname = Predeploys.getName(_addr);
        address impl = Predeploys.predeployToCodeNamespace(_addr);
        vm.etch(impl, vm.getDeployedCode(string.concat(cname, ".sol:", cname)));
        return impl;
    }

    function _setImplementation(address _addr, address _impl) internal {
        vm.store(_addr, PROXY_IMPLEMENTATION_SLOT, bytes32(uint256(uint160(_impl))));
    }

    function _setAdmin(address _addr, address _admin) internal {
        vm.store(_addr, PROXY_ADMIN_SLOT, bytes32(uint256(uint160(_admin))));
    }
}
