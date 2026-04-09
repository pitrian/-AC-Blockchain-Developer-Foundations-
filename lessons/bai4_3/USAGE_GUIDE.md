# Voting Smart Contract - Usage Guide

## Contract Overview

This Solidity smart contract implements a voting system with the following features:
- First vote is free for each user
- Subsequent votes require a payment of 0.00001 ETH
- Owner can add candidates
- Users can vote for multiple candidates
- All voting activities are logged with events

## Files

1. `Voting.sol` - Main smart contract
2. `README.md` - Original requirements
3. `test.ts` - Test instructions (Remix-based)

## Contract Functions

### Owner Functions
- `addCandidate(string memory _name)` - Add a new candidate (owner only)

### User Functions
- `vote(uint _candidateId)` - Cast a free vote (first vote only)
- `voteETH(uint _candidateId)` - Cast a vote with ETH payment (required for subsequent votes)
- `getCandidate(uint _candidateId)` - View candidate information
- `checkHasVoted(address _voter, uint _candidateId)` - Check if an address has voted for a candidate
- `checkHasVotedOnce(address _voter)` - Check if an address has voted at least once

## Deployment and Testing in Remix IDE

1. Go to https://remix.ethereum.org
2. Create a new file named `Voting.sol`
3. Copy the content of Voting.sol into the file
4. Compile with Solidity compiler (0.8.0 or higher)
5. Deploy using "JavaScript VM" environment
6. Test the functions:
   - Add candidates using `addCandidate` (as owner)
   - Vote for the first time using `vote` (free)
   - Vote again using `voteETH` with 0.00001 ETH payment
   - Check results with `getCandidate`

## Requirements Met

✅ Struct `Candidate` with `name (string)`, `voteCount (uint)`
✅ Mapping `candidates(uint => Candidate)`
✅ Mapping `hasVoted(address => bool)`
✅ Modifier `onlyOwner` for candidate creation
✅ Event `Voted(address voter, uint candidateId)`
✅ Event `PaidVote(address voter, uint candidateId, uint amount)` for tracking ETH payments
✅ First vote is free, subsequent votes require ETH payment