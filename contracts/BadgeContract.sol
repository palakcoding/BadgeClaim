// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title BadgeContract
 * @dev Simple badge claiming system for the hackathon
 * Users can claim badges without needing ETH (gas paid via UGF with Mock USD)
 */

contract BadgeContract {
    // Mapping to track which users have claimed badges
    mapping(address => bool) public hasClaimed;
    mapping(address => uint256) public claimCount;
    
    // Events
    event BadgeClaimed(address indexed user, uint256 timestamp);
    
    /**
     * @dev Allows a user to claim a badge
     * This is a simple action that demonstrates gas-free transactions via UGF
     */
    function claimBadge() external {
        require(!hasClaimed[msg.sender], "You have already claimed a badge!");
        
        hasClaimed[msg.sender] = true;
        claimCount[msg.sender]++;
        
        emit BadgeClaimed(msg.sender, block.timestamp);
    }
    
    /**
     * @dev Check if an address has claimed a badge
     */
    function isBadgeClaimed(address user) external view returns (bool) {
        return hasClaimed[user];
    }
    
    /**
     * @dev Get claim count for an address
     */
    function getClaimCount(address user) external view returns (uint256) {
        return claimCount[user];
    }
    
    /**
     * @dev Allow user to claim badge again (for testing)
     */
    function resetClaim() external {
        hasClaimed[msg.sender] = false;
    }
}
