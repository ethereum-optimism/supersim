// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MintableERC20 is ERC20 {
    constructor() ERC20("TestERC20", "TST") {}

    function mint(uint256 amount) external {
        super._mint(msg.sender, amount);
    }
}
