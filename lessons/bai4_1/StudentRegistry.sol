// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistry {
    struct Student {
        string name;
        uint256 age;
        bool isRegistered;
    }

    mapping(address => Student) public students;

    function register(string memory name, uint256 age) external {
        require(!students[msg.sender].isRegistered, "Already registered");
        students[msg.sender] = Student({
            name: name,
            age: age,
            isRegistered: true
        });
    }

    function getStudent(address user) external view returns (Student memory) {
        return students[user];
    }

    function isStudentRegistered(address user) external view returns (bool) {
        return students[user].isRegistered;
    }
}