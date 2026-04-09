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

    // user đã vote lần nào chưa (để phân biệt free / paid)
    mapping(address => bool) public hasVotedOnce;

    // EVENTS
    event Voted(address voter, uint candidateId);
    event PaidVote(address voter, uint candidateId, uint amount);
    event CandidateAdded(uint candidateId, string name);

    // MODIFIER
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
    // FREE VOTE (ONLY ONCE TOTAL)
    // =========================
    function vote(uint _candidateId) public {
        require(_candidateId < candidatesCount, "Candidate does not exist");

        // ❗ CHẶN vote trùng candidate
        require(!hasVoted[msg.sender][_candidateId], "Already voted for this candidate");

        // ❗ chỉ được free 1 lần duy nhất
        require(!hasVotedOnce[msg.sender], "Use voteETH after first vote");

        hasVotedOnce[msg.sender] = true;
        hasVoted[msg.sender][_candidateId] = true;

        candidates[_candidateId].voteCount++;

        emit Voted(msg.sender, _candidateId);
    }

    // =========================
    // PAID VOTE
    // =========================
    function voteETH(uint _candidateId) public payable {
        require(_candidateId < candidatesCount, "Candidate does not exist");

        // ❗ PHẢI gửi đúng tiền
        require(msg.value == 0.00001 ether, "Must send exactly 0.00001 ETH");

        // ❗ CHẶN vote trùng candidate
        require(!hasVoted[msg.sender][_candidateId], "Already voted for this candidate");

        // chuyển tiền cho owner
        (bool success, ) = owner.call{value: msg.value}("");
        require(success, "Transfer failed");

        hasVoted[msg.sender][_candidateId] = true;

        // đánh dấu đã vote (nếu chưa)
        if (!hasVotedOnce[msg.sender]) {
            hasVotedOnce[msg.sender] = true;
        }

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

    function checkHasVotedOnce(address _voter)
        public
        view
        returns (bool)
    {
        return hasVotedOnce[_voter];
    }
}