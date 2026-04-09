# Voting Contract Changelog

## April 10, 2026 - Bug Fix Release

### Fixed Issues
- **Duplicate Voting Bug**: Users could vote multiple times for the same candidate using the `voteETH()` function
- **Vote Count Inflation**: Vote counts were incorrectly incremented on each `voteETH()` call regardless of previous voting status

### Changes Made
1. Modified `voteETH()` function to check if user has already voted for a candidate before allowing the vote
2. Added validation: `require(!hasVoted[msg.sender][_candidateId], "You have already voted for this candidate");`
3. Simplified vote recording logic to unconditionally record votes (since we now prevent duplicates upfront)

### Verification
The contract now properly enforces:
- One vote per user per candidate (both free and paid votes)
- First vote is free using `vote()`
- Additional votes require 0.00001 ETH using `voteETH()`
- All successful votes emit appropriate events
- Owner controls candidate creation

All existing functionality preserved while fixing security vulnerability.