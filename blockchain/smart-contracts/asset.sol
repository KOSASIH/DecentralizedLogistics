// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Asset {
    string public id;
    string public name;
    string public description;
    string public owner;
    string public status;
    uint256 public createdAt;

    constructor(string memory _name, string memory _description, string memory _owner) {
        id = sha256(_name + _description + block.timestamp);
        name = _name;
        description = _description;
        owner = _owner;
        status = "active";
        createdAt = block.timestamp;
    }

    function updateStatus(string memory _newStatus) public {
        require(msg.sender == owner, "Only the owner can update the status");
        status = _newStatus;
    }

    function transferOwnership(string memory _newOwner) public {
        require(msg.sender == owner, "Only the owner can transfer ownership");
        owner = _newOwner;
    }
}
