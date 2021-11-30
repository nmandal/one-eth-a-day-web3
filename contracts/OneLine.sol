// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract OneLine {
    uint256 totalEntries;
    uint256 private seed;

    event NewEntry(address indexed from, uint256 timestamp, string message, uint256 mood);

    struct Entry {
        address author;
        string message;
        uint256 timestamp;
        uint256 mood;
    }

    Entry[] entries;

    mapping(address => uint256) public lastEntryAt;

    constructor() payable {
        console.log("Yo yo, I am a contract and I am smart");
        seed = (block.timestamp + block.difficulty) % 365;
    }

    function createEntry(string memory _message, uint256 _mood) public {
        require(
            lastEntryAt[msg.sender] + 30 seconds < block.timestamp,
            "Wait 60m"
        );

        lastEntryAt[msg.sender] = block.timestamp;

        totalEntries += 1;
        console.log("%s has created an entry", msg.sender);

        entries.push(Entry(msg.sender, _message, block.timestamp, _mood));

        seed = (block.difficulty + block.timestamp + seed) % 365;
        console.log("Random # generated: %d", seed);

        /* Give a 1 in 365 chance that the user wins the prize. */
        if (seed <= 1) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than this contract has..."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        emit NewEntry(msg.sender, block.timestamp, _message, _mood);
    }

    function getAllEntries() public view returns (Entry[] memory) {
        return entries;
    }

    function getTotalEntries() public view returns (uint256) {
        console.log("We have %d total entries!", totalEntries);
        return totalEntries;
    }
}