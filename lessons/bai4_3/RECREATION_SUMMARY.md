# Voting Contract Recreation

## Action Taken
Deleted the existing Voting.sol file and created a brand new implementation with the correct logic.

## Key Features Implemented

1. **Owner Controls**:
   - Only owner can add candidates via `addCandidate()`

2. **Voting Rules**:
   - First vote (for any candidate) is free using `vote()`
   - Additional votes require 0.00001 ETH using `voteETH()`
   - Each user can vote only once per candidate
   - Users can vote for multiple different candidates

3. **Security Measures**:
   - Both `vote()` and `voteETH()` check for duplicate votes
   - Payment validation for ETH transactions
   - Proper event emission for all voting activities

4. **Data Tracking**:
   - `hasVoted` mapping tracks individual user votes per candidate
   - `hasVotedOnce` mapping tracks if user has voted at least once
   - Vote counts properly incremented for candidates

## Functions Summary

### `vote(uint _candidateId)`
- Free first vote for any candidate
- Prevents duplicate votes with `require(!hasVoted[msg.sender][_candidateId])`
- Reverts if user has already voted once, directing to `voteETH()`

### `voteETH(uint _candidateId)`
- Paid voting function (0.00001 ETH required)
- Prevents duplicate votes with `require(!hasVoted[msg.sender][_candidateId])`
- Transfers ETH to contract owner
- Records vote and updates vote count

Both functions now correctly enforce the core requirement: "Each user can vote ONLY ONCE for EACH candidate."