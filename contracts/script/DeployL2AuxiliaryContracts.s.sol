// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.26;

import {Script, console} from "forge-std/Script.sol";

import {PoolManager} from "@uniswap-v4-core/PoolManager.sol";
import {IPoolManager} from "@uniswap-v4-core/interfaces/IPoolManager.sol";
import {Currency} from "@uniswap-v4-core/types/Currency.sol";

import {PositionManager} from "@uniswap-v4-periphery/PositionManager.sol";
import {PositionDescriptor} from "@uniswap-v4-periphery/PositionDescriptor.sol";
import {StateView} from "@uniswap-v4-periphery/lens/StateView.sol";
import {V4Router} from "@uniswap-v4-periphery/V4Router.sol";

import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";
import {Preinstalls} from "@contracts-bedrock/libraries/Preinstalls.sol";

import {Router} from "../src/uniswap/Router.sol";
import {PositionManagerLib} from "../src/uniswap/PositionManager.sol";

interface ICreate2Deployer {
    function computeAddress(bytes32 salt, bytes32 codeHash) external view returns (address);
    function deploy(uint256 value, bytes32 salt, bytes memory code) external;
}

contract DeployL2AuxiliaryContracts is Script {
    /// @notice Permit2 address.
    address _permit2 = Preinstalls.Permit2;

    /// @notice Create2 deployer address.
    ICreate2Deployer internal constant _deployer = ICreate2Deployer(Preinstalls.Create2Deployer);

    /// @notice Create2Deployer creationCode.
    bytes internal constant _deployerCode =
        hex"6080604052600436106100435760003560e01c8063076c37b21461004f578063481286e61461007157806356299481146100ba57806366cfa057146100da57600080fd5b3661004a57005b600080fd5b34801561005b57600080fd5b5061006f61006a366004610327565b6100fa565b005b34801561007d57600080fd5b5061009161008c366004610327565b61014a565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b3480156100c657600080fd5b506100916100d5366004610349565b61015d565b3480156100e657600080fd5b5061006f6100f53660046103ca565b610172565b61014582826040518060200161010f9061031a565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe082820381018352601f90910116604052610183565b505050565b600061015683836102e7565b9392505050565b600061016a8484846102f0565b949350505050565b61017d838383610183565b50505050565b6000834710156101f4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f437265617465323a20696e73756666696369656e742062616c616e636500000060448201526064015b60405180910390fd5b815160000361025f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f437265617465323a2062797465636f6465206c656e677468206973207a65726f60448201526064016101eb565b8282516020840186f5905073ffffffffffffffffffffffffffffffffffffffff8116610156576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f437265617465323a204661696c6564206f6e206465706c6f790000000000000060448201526064016101eb565b60006101568383305b6000604051836040820152846020820152828152600b8101905060ff815360559020949350505050565b61014e806104ad83390190565b6000806040838503121561033a57600080fd5b50508035926020909101359150565b60008060006060848603121561035e57600080fd5b8335925060208401359150604084013573ffffffffffffffffffffffffffffffffffffffff8116811461039057600080fd5b809150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000806000606084860312156103df57600080fd5b8335925060208401359150604084013567ffffffffffffffff8082111561040557600080fd5b818601915086601f83011261041957600080fd5b81358181111561042b5761042b61039b565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f011681019083821181831017156104715761047161039b565b8160405282815289602084870101111561048a57600080fd5b826020860160208301376000602084830101528095505050505050925092509256fe608060405234801561001057600080fd5b5061012e806100206000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063249cb3fa14602d575b600080fd5b603c603836600460b1565b604e565b60405190815260200160405180910390f35b60008281526020818152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915281205460ff16608857600060aa565b7fa2ef4600d742022d532d4747cb3547474667d6f13804902513b2ec01c848f4b45b9392505050565b6000806040838503121560c357600080fd5b82359150602083013573ffffffffffffffffffffffffffffffffffffffff8116811460ed57600080fd5b80915050925092905056fea26469706673582212205ffd4e6cede7d06a5daf93d48d0541fc68189eeb16608c1999a82063b666eb1164736f6c63430008130033a2646970667358221220fdc4a0fe96e3b21c108ca155438d37c9143fb01278a3c1d274948bad89c564ba64736f6c63430008130033";

    /// @notice Salt used for all create2 deployments
    bytes32 internal constant _salt = bytes32(0);

    function run() public {
        // setup the create2 deployer
        vm.etch(address(_deployer), _deployerCode);

        console.log("Deploying L2AuxilliaryContracts");
        deployUniswapV4();
    }

    function deployUniswapV4() public {
        console.log("Deploying UniswapV4");

        PoolManager poolManager = deployUniswapV4PoolManager();
        console.log("PoolManager deployed at", address(poolManager));

        PositionDescriptor positionDescriptor = deployUniswapV4PositionDescriptor(address(poolManager));
        console.log("PositionDescriptor deployed at", address(positionDescriptor));

        PositionManager positionManager = deployUniswapV4PositionManager(address(poolManager), address(positionDescriptor));
        console.log("PositionManager deployed at", address(positionManager));

        StateView stateView = deployUniswapStateView(address(poolManager));
        console.log("StateView deployed at", address(stateView));

        V4Router router = deployUniswapV4Router(address(poolManager));
        console.log("Router deployed at", address(router));
    }

    function deployUniswapV4PoolManager() internal returns (PoolManager) {
        bytes memory args = abi.encode(address(0));
        bytes memory initcode = abi.encodePacked(type(PoolManager).creationCode, args);

        address addr = _deployer.computeAddress(_salt, keccak256(initcode));
        _deployer.deploy(0, _salt, initcode);
        return PoolManager(addr);
    }

    function deployUniswapV4PositionDescriptor(address _manager) internal returns (PositionDescriptor) {
        bytes memory args = abi.encode(_manager, Predeploys.WETH, "ETH");
        bytes memory initcode = abi.encodePacked(type(PositionDescriptor).creationCode, args);
        address addr = _deployer.computeAddress(_salt, keccak256(initcode));
        _deployer.deploy(0, _salt, initcode);
        return PositionDescriptor(addr);
    }

    function deployUniswapV4PositionManager(address _manager, address _positionsDescriptor)
        internal
        returns (PositionManager)
    {
        //bytes memory args = abi.encode(_manager, _permit2, 300_000, _positionsDescriptor, Predeploys.WETH);
        //bytes memory initcode = abi.encodePacked(type(PositionManager).creationCode, args);

        bytes memory args = abi.encode(_manager, _positionsDescriptor);
        bytes memory initcode = abi.encodePacked(PositionManagerLib.MIGRATION_CODE, args);

        address addr = _deployer.computeAddress(_salt, keccak256(initcode));
        _deployer.deploy(0, _salt, initcode);
        return PositionManager(payable(addr));
    }

    function deployUniswapStateView(address _manager) internal returns (StateView) {
        bytes memory args = abi.encode(_manager);
        bytes memory initcode = abi.encodePacked(type(StateView).creationCode, args);
        address addr = _deployer.computeAddress(_salt, keccak256(initcode));
        _deployer.deploy(0, _salt, initcode);
        return StateView(addr);
    }

    function deployUniswapV4Router(address _manager) internal returns (V4Router) {
        bytes memory args = abi.encode(_manager);
        bytes memory initcode = abi.encodePacked(type(Router).creationCode, args);
        address addr = _deployer.computeAddress(_salt, keccak256(initcode));
        _deployer.deploy(0, _salt, initcode);
        return V4Router(payable(addr));
    }
}
