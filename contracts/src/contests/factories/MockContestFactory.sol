// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import { MockResolver } from "../resolvers/MockResolver.sol";

import { Contests } from "../Contests.sol";
import { IContestResolver } from "../ContestResolver.sol";

contract MockContestFactory {
    // @notice Contests contract
    Contests public contests;

    // @notice Emitted when a new contest is created
    event NewContest(IContestResolver resolver);

    // @notice indiciator if a resolver originated from this factory
    mapping(IContestResolver => bool) public fromFactory;

    constructor(Contests _contests) {
        contests = _contests;
    }

    function newContest() public payable {
        IContestResolver resolver = new MockResolver(contests);
        contests.newContest{ value: msg.value }(resolver, msg.sender);

        fromFactory[resolver] = true;

        emit NewContest(resolver);
    }
}
