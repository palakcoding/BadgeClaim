// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../contracts/BadgeContract.sol";

contract BadgeContractTest is Test {
    BadgeContract public badge;
    address public user1 = address(0x1);
    address public user2 = address(0x2);

    function setUp() public {
        badge = new BadgeContract();
    }

    function testClaimBadgeSuccess() public {
        vm.prank(user1);
        badge.claimBadge();
        assertTrue(badge.isBadgeClaimed(user1));
        assertEq(badge.getClaimCount(user1), 1);
    }

    function testClaimBadgeCannotClaimTwice() public {
        vm.prank(user1);
        badge.claimBadge();
        
        vm.prank(user1);
        vm.expectRevert("You have already claimed a badge!");
        badge.claimBadge();
    }

    function testMultipleUsersCanClaim() public {
        vm.prank(user1);
        badge.claimBadge();
        
        vm.prank(user2);
        badge.claimBadge();
        
        assertTrue(badge.isBadgeClaimed(user1));
        assertTrue(badge.isBadgeClaimed(user2));
    }

    function testResetClaim() public {
        vm.prank(user1);
        badge.claimBadge();
        assertTrue(badge.isBadgeClaimed(user1));
        
        vm.prank(user1);
        badge.resetClaim();
        assertFalse(badge.isBadgeClaimed(user1));
    }
}
