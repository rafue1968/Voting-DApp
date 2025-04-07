// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    string[] public options;
    mapping(string => uint256) public votes;
    mapping(address => bool) public hasVoted;

    constructor(string[] memory _options) {
        options = _options;
    }

    function vote(string memory _option) public {
        require(!hasVoted[msg.sender], "You already voted");
        bool valid = false;

        for (uint256 i = 0; i < options.length; i++) {
            if (keccak256(bytes(options[i])) == keccak256(bytes(_option))) {
                valid = true;
                break;
            }
        }

        require(valid, "Invalid option");
        votes[_option]++;
        hasVoted[msg.sender] = true;
    }

    function getVotes(string memory _option) public view returns (uint256) {
        return votes[_option];
    }

    function getOptions() public view returns (string[] memory) {
        return options;
    }
}
