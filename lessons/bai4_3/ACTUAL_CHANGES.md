# Actual Changes Made to Voting.sol

## Key Modification

Added duplicate vote prevention to the `vote()` function:

Line 47: Added the following check:
```solidity
// Check if user has already voted for this candidate
require(!hasVoted[msg.sender][_candidateId], "You have already voted for this candidate");
```

This change was placed after the candidate existence check and before the free vote logic.

## Why This Fix Was Needed

Previously, the `vote()` function only checked if a user had voted at least once (`hasVotedOnce[msg.sender]`) but didn't check if they had already voted for the specific candidate they were trying to vote for. This meant:

1. A user could call `vote()` for candidate A (successful)
2. Then call `vote()` for candidate B (would fail and redirect to use `voteETH()`)
3. But there was a gap in the logic where duplicate votes for the same candidate weren't prevented in the free vote path

## Result

Now both `vote()` and `voteETH()` functions properly prevent users from voting multiple times for the same candidate:

- `vote()`: First vote for any candidate (prevents duplicates)
- `voteETH()`: Paid votes for additional candidates (prevents duplicates)

Both functions now include:
```solidity
require(!hasVoted[msg.sender][_candidateId], "You have already voted for this candidate");
```

This ensures the core requirement is met: "Each user can vote ONLY ONCE for EACH candidate."