// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Voting {
    // Struct for Candidate
    struct Candidate {
        string name;
        uint voteCount;
    }
    // State variables
    address public owner;
    mapping(uint => Candidate) public candidates;
    mapping(address => mapping(uint => bool)) public hasVoted; // Tracks if an address has voted for a candidate
    mapping(address => bool) public hasVotedOnce; // Tracks if an address has voted at least once
    uint public candidatesCount;
    // Events
    event Voted(address voter, uint candidateId);
    event CandidateAdded(uint candidateId, string name);
    event PaidVote(address voter, uint candidateId, uint amount);
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    // Constructor
    constructor() {
        owner = msg.sender;
    }
    // Function to add candidate - only owner
    function addCandidate(string memory _name) public onlyOwner {
        candidates[candidatesCount] = Candidate(_name, 0);
        emit CandidateAdded(candidatesCount, _name);
        candidatesCount++;
    }
    // Function to vote for a candidate (first vote is free)
    function vote(uint _candidateId) public {
        // Check if candidate exists
        require(_candidateId < candidatesCount, "Candidate does not exist");
        
        // First vote for any candidate is free
        if (!hasVotedOnce[msg.sender]) {
            // Record the vote
            hasVoted[msg.sender][_candidateId] = true;
            hasVotedOnce[msg.sender] = true;
            candidates[_candidateId].voteCount++;
            
            // Emit event
            emit Voted(msg.sender, _candidateId);
        } else {
            // After first vote, all votes require payment
            revert("After first vote, use voteETH function with payment");
        }
    }
    // Function to vote with ETH payment (required for all votes after the first)
    function voteETH(uint _candidateId) public payable {
        // Check if candidate exists
        require(_candidateId < candidatesCount, "Candidate does not exist");
        
        // Check if payment is correct (0.00001 ETH)
        require(msg.value == 0.00001 ether, "Must send exactly 0.00001 ETH");
        
        // Transfer ETH to owner
        payable(owner).transfer(msg.value);
        
        // Record the vote regardless of whether it's first or subsequent
        if (!hasVoted[msg.sender][_candidateId]) {
            hasVoted[msg.sender][_candidateId] = true;
        }
        
        // Mark user as having voted at least once
        hasVotedOnce[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        
        // Emit events
        emit PaidVote(msg.sender, _candidateId, msg.value);
    }
    // Function to get candidate information
    function getCandidate(uint _candidateId) public view returns (string memory name, uint voteCount) {
        require(_candidateId < candidatesCount, "Candidate does not exist");
        return (candidates[_candidateId].name, candidates[_candidateId].voteCount);
    }
    
    // Function to check if an address has voted for a candidate
    function checkHasVoted(address _voter, uint _candidateId) public view returns (bool) {
        return hasVoted[_voter][_candidateId];
    }
    
    // Function to check if an address has voted at least once
    function checkHasVotedOnce(address _voter) public view returns (bool) {
        return hasVotedOnce[_voter];
    }
}