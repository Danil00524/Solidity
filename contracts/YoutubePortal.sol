// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract YoutubePortal {
    uint256 totalVideoShares;

    constructor() payable {
        console.log("We have been constructed!");
    }

    // ===== Types =====
    struct ShareInfo {
        address sharedAddress;
        string youtubeUrl;
        uint256 timestamp;
    }
    ShareInfo[] sharesInfo;

    // ===== Events =====
    event OnShareVideo(address indexed from, uint256 timestamp, string message);

    // ===== Methods =====
    function shareVideo(string memory _message) public {
        totalVideoShares += 1;

        sharesInfo.push(ShareInfo(msg.sender, _message, block.timestamp));
        emit OnShareVideo(msg.sender, block.timestamp, _message);

        uint256 prizeAmount = 0.0001 ether;
        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");
    }

    function getAllSharesInfo() public view returns (ShareInfo[] memory) {
        return sharesInfo;
    }

    function getTotalVideoShares() public view returns (uint256) {
        return totalVideoShares;
    }
}
