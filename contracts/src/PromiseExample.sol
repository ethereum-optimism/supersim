// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {Promise} from "./Promise.sol";
import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";

contract PromiseExample {
    Promise public p = Promise(0xFcdC08d2DFf80DCDf1e954c4759B3316BdE86464);

    mapping(address => uint256) public wethBalances;

    function refreshBalance(uint256 _destination, address _account) public {
        bytes32 msgHash = p.sendMessage(_destination, Predeploys.WETH, abi.encodeWithSelector(IERC20.balanceOf.selector, _account));
        p.then(msgHash, this.update.selector, abi.encode(_account));

    }

    function update(uint256 _balance) external {
        require(msg.sender == address(p), "PromiseExample: caller not Promise");

        address _account = abi.decode(p.promiseContext(), (address));
        wethBalances[_account] = _balance;
    }
}