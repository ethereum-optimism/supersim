// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MintableBurnableERC20 is ERC20, Ownable {
    constructor(string memory _name, string memory _symbol) Ownable() ERC20(_name, _symbol) {}

    function mint(address recipient, uint256 value) external onlyOwner {
        _mint(recipient, value);
    }

    function burnFrom(address from, uint256 value) external onlyOwner {
        _burn(from, value);
    }
}
