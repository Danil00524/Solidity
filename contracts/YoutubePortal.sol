// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract YoutubePortal {
    uint256 totalVideoShares;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function shareVideo() public {
        totalVideoShares += 1;
        // Code for sharing
        console.log("%s has shared!", msg.sender);
    }

    function getTotalVideoShares() public view returns (uint256) {
        console.log("We have %d total number of video shares!", totalVideoShares);
        return totalVideoShares;
    }
}
