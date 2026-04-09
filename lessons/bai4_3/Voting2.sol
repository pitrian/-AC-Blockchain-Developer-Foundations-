///phiên bản vote nhiều ứng viên cùng lúc trong lần vote đầu tiên, tối đa là 3 ứng viên.
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
    // FREE VOTE MULTIPLE (MAX 3)
    // =========================
    function voteMultiple(uint[] memory _candidateIds) public {
        // ❗ chỉ được dùng 1 lần free
        require(!hasUsedFreeVote[msg.sender], "Free vote already used");

        // ❗ giới hạn tối đa 3 candidate
        require(_candidateIds.length > 0, "Empty vote");
        require(_candidateIds.length <= 3, "Max 3 candidates");

        for (uint i = 0; i < _candidateIds.length; i++) {
            uint id = _candidateIds[i];

            // ❗ candidate hợp lệ
            require(id < candidatesCount, "Invalid candidate");

            // ❗ không vote trùng
            require(!hasVoted[msg.sender][id], "Already voted for this candidate");

            hasVoted[msg.sender][id] = true;
            candidates[id].voteCount++;

            emit Voted(msg.sender, id);
        }

        // đánh dấu đã dùng free vote
        hasUsedFreeVote[msg.sender] = true;
    }

    // =========================
    // PAID VOTE (1 candidate)
    // =========================
    function voteETH(uint _candidateId) public payable {
        require(_candidateId < candidatesCount, "Candidate does not exist");

        // ❗ phải trả đúng tiền
        require(msg.value == 0.00001 ether, "Must send exactly 0.00001 ETH");

        // ❗ không vote trùng
        require(!hasVoted[msg.sender][_candidateId], "Already voted for this candidate");

        // chuyển tiền
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
