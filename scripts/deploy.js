/**
 * @file deploy.js
 * @description Hardhat deployment script for BadgeContract
 * 
 * Usage: npx hardhat run scripts/deploy.js --network baseSepolia
 */

async function main() {
  console.log("Deploying BadgeContract to Base Sepolia...");

  // Get the contract factory
  const BadgeContract = await ethers.getContractFactory("BadgeContract");

  // Deploy the contract
  const badgeContract = await BadgeContract.deploy();

  // Wait for deployment to finish
  await badgeContract.deployed();

  console.log("✅ BadgeContract deployed to:", badgeContract.address);
  console.log("\n📝 Next steps:");
  console.log("1. Copy the contract address above");
  console.log("2. Paste it in your .env.local:");
  console.log('   NEXT_PUBLIC_BADGE_CONTRACT=' + badgeContract.address);
  console.log("3. Restart your dev server (npm run dev)");
  console.log("\n🔍 View on Basescan: https://sepolia.basescan.org/address/" + badgeContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
