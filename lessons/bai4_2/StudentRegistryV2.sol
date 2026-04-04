// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistryV2 {
    struct Student {
        string name;
        uint256 age;
        bool isRegistered;
    }

    mapping(address => Student) public students;
    address public owner;

    event StudentRegistered(address indexed studentAddress, string name, uint256 age);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can register students");
        _;
    }

    function registerStudent(address student, string memory name, uint256 age) external onlyOwner {
        require(!students[student].isRegistered, "Already registered");
        students[student] = Student({
            name: name,
            age: age,
            isRegistered: true
        });
        emit StudentRegistered(student, name, age);
    }

    function getStudent(address user) external view returns (Student memory) {
        return students[user];
    }

    function isStudentRegistered(address user) external view returns (bool) {
        return students[user].isRegistered;
    }
}