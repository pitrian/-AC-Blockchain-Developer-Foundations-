///====================================================================================
/// Phiên bản khác, có thể vote cho nhiều ứng viên cùng lúc, không giới hạn số lượng ứng viên trong 1 lần vote
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    address public owner;
    uint public candidatesCount;

    mapping(uint => Candidate) public candidates;

    // user => candidateId => đã vote chưa
    mapping(address => mapping(uint => bool)) public hasVoted;

    // user đã dùng free vote chưa
    mapping(address => bool) public hasUsedFreeVote;

    // EVENTS
    event Voted(address voter, uint candidateId);
    event PaidVote(address voter, uint candidateId, uint amount);
    event CandidateAdded(uint candidateId, string name);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // =========================
    // ADD CANDIDATE
    // =========================
    function addCandidate(string memory _name) public onlyOwner {
        candidates[candidatesCount] = Candidate(_name, 0);
        emit CandidateAdded(candidatesCount, _name);
        candidatesCount++;
    }

    // =========================
    // FREE VOTE (KHÔNG GIỚI HẠN SỐ LƯỢNG)
    // =========================
    function voteMultiple(uint[] memory _candidateIds) public {
        require(!hasUsedFreeVote[msg.sender], "Free vote already used");
        require(_candidateIds.length > 0, "Empty vote");

        for (uint i = 0; i < _candidateIds.length; i++) {
            uint id = _candidateIds[i];

            require(id < candidatesCount, "Invalid candidate");
            require(!hasVoted[msg.sender][id], "Already voted for this candidate");

            hasVoted[msg.sender][id] = true;
            candidates[id].voteCount++;

            emit Voted(msg.sender, id);
        }

        hasUsedFreeVote[msg.sender] = true;
    }

    // =========================
    // PAID VOTE
    // =========================
    function voteETH(uint _candidateId) public payable {
        require(_candidateId < candidatesCount, "Candidate does not exist");
        require(msg.value == 0.00001 ether, "Must send exactly 0.00001 ETH");

        require(!hasVoted[msg.sender][_candidateId], "Already voted for this candidate");

        (bool success, ) = owner.call{value: msg.value}("");
        require(success, "Transfer failed");

        hasVoted[msg.sender][_candidateId] = true;
        candidates[_candidateId].voteCount++;

        emit PaidVote(msg.sender, _candidateId, msg.value);
    }

    // =========================
    // VIEW FUNCTIONS
    // =========================
    function getCandidate(uint _candidateId)
        public
        view
        returns (string memory name, uint voteCount)
    {
        require(_candidateId < candidatesCount, "Candidate does not exist");
        Candidate memory c = candidates[_candidateId];
        return (c.name, c.voteCount);
    }

    function checkHasVoted(address _voter, uint _candidateId)
        public
        view
        returns (bool)
    {
        return hasVoted[_voter][_candidateId];
    }

    function checkHasUsedFreeVote(address _voter)
        public
        view
        returns (bool)
    {
        return hasUsedFreeVote[_voter];
    }
}