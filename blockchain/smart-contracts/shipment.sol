// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Shipment {
    string public id;
    string public sender;
    string public recipient;
    string public status;
    uint256 public createdAt;

    constructor(string memory _sender, string memory _recipient) {
        id = sha256(_sender + _recipient + block.timestamp);
        sender = _sender;
        recipient = _recipient;
        status = "created";
        createdAt = block.timestamp;
    }

    function updateStatus(string memory _newStatus) public {
        require(msg.sender == sender || msg.sender == recipient, "Only sender or recipient can update status");
        status = _newStatus;
    }
}
