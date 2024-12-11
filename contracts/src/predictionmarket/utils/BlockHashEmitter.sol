// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;


contract BlockHashEmitter {
    event BlockHash(uint256 indexed blockNumber, bytes32 blockHash);

    function emitBlockHash(uint256 _blockNumber) public {
        bytes32 hash = blockhash(_blockNumber);
        require(hash != bytes32(0), "block hash too old");


        emit BlockHash(_blockNumber, hash);
    }
}
