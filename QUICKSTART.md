# 🚀 Quick Start Guide - Badge Claim dApp

Get your Web3 app running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- MetaMask or any Web3 wallet
- Base Sepolia testnet ETH (for initial deployment only)

## Step 1: Clone & Install (2 min)

```bash
cd /home/palak/mumbai_hack/badge-dapp
npm install
```

## Step 2: Configure Environment (1 min)

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_WC_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_BADGE_CONTRACT=0x
```

**Get WalletConnect Project ID:**
1. Go to https://cloud.walletconnect.com
2. Create new project
3. Copy Project ID to `.env.local`

## Step 3: Deploy Smart Contract (1 min)

### Option A: Using Remix (Easiest)

1. Go to https://remix.ethereum.org
2. Create new file: `BadgeContract.sol`
3. Copy code from `/contracts/BadgeContract.sol`
4. Compile (Solidity Compiler: 0.8.20)
5. Switch to "Base Sepolia" network in MetaMask
6. Deploy
7. Copy deployed address

### Option B: Using Hardhat (Advanced)

```bash
# Install dependencies
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox dotenv

# Create .env file
echo "PRIVATE_KEY=your_wallet_private_key" > .env

# Deploy
npx hardhat run scripts/deploy.js --network baseSepolia
```

## Step 4: Update Contract Address (30 sec)

Copy the deployed contract address to `.env.local`:

```env
NEXT_PUBLIC_BADGE_CONTRACT=0xYourDeployedContractAddressHere
```

## Step 5: Run Development Server (1 min)

```bash
npm run dev
```

Open http://localhost:3000 in your browser!

## Step 6: Test the Flow

1. **Connect Wallet**
   - Click "Connect Wallet"
   - Select MetaMask (or your wallet)
   - Approve connection
   - Make sure you're on Base Sepolia

2. **Claim Badge**
   - If on wrong network, click "Switch to Base Sepolia"
   - Click "🎉 Claim Badge" button
   - Wait for transaction
   - See "Badge Claimed!" message ✅

3. **Verify On-Chain**
   - Copy transaction hash from success message
   - Go to https://sepolia.basescan.org
   - Paste hash to verify transaction
   - See BadgeClaimed event

## Troubleshooting

### "Wrong Network!" Error
- Open MetaMask
- Make sure you're on Base Sepolia
- Network ID should be 84532
- Click app's "Switch Network" button

### "Contract Not Found"
- Deploy contract first (Step 3)
- Copy address to .env.local
- Restart dev server (`npm run dev`)

### "Not Connected"
- Click "Connect Wallet" button
- Select your wallet provider
- Approve connection in wallet

### "Failed to Claim"
- Check contract is deployed
- Check address in .env.local is correct
- Try with different wallet
- Check wallet has Base Sepolia RPC access

## What's Happening Behind the Scenes?

```
User clicks "Claim Badge"
         ↓
App requests UGF quote: "How much MockUSD for gas?"
         ↓
UGF returns: "0.5 MockUSD"
         ↓
App shows: "Transaction will cost 0.5 MockUSD"
         ↓
User confirms
         ↓
UGF executes transaction with gas paid in ETH from sponsor pool
         ↓
User's MockUSD balance decremented by 0.5
         ↓
Badge is claimed on-chain
         ↓
User sees: "Badge Claimed! TX: 0x..."
```

**The key innovation:** User never needs ETH! UGF abstracts away gas fees completely.

## Next Steps

### Deploy Frontend (Optional)

Deploy to Vercel for free:

```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin your_repo_url
git push -u origin main

# Go to https://vercel.com
# Import project
# Add .env.local secrets
# Deploy!
```

### Add More Features

The architecture supports:
- ✅ Multiple actions (mint NFT, donate, etc.)
- ✅ Reward system (point accumulation)
- ✅ Leaderboard (top claimers)
- ✅ Batch operations (claim multiple badges)

### Production Setup

1. Register real UGF credentials
2. Create sponsorship pool with ETH
3. Update UGF API credentials in .env
4. Deploy to production networks (Base Mainnet)

## Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main UI page |
| `app/layout.tsx` | Root layout with providers |
| `src/components/BadgeClaimCard.tsx` | Badge claiming logic |
| `src/components/NetworkGuard.tsx` | Network detection |
| `src/lib/web3-config.ts` | Web3 configuration |
| `src/lib/ugf-client.ts` | UGF integration |
| `contracts/BadgeContract.sol` | Smart contract |

## Architecture Overview

```
Frontend (Next.js + React)
         ↓
Wallet Connection (RainbowKit + Wagmi)
         ↓
Network Detection (Base Sepolia)
         ↓
UGF Client (Mock USD gas payment)
         ↓
Smart Contract (BadgeContract on blockchain)
         ↓
Blockchain (Base Sepolia Testnet)
```

## Performance Tips

- App loads in <1s
- Quote request takes ~500ms
- Transaction confirmation ~10-15s
- UX is smooth and responsive

## Security Notes

✅ What's Secure:
- Simple, auditable smart contract
- No fund custody in contract
- User keys never leave wallet
- UGF handles gas securely

⚠️ Always Remember:
- Never share private keys
- Only deploy on testnet first
- Verify contract addresses
- Use hardware wallet for mainnet

## Questions?

- 📚 Docs: See `README_COMPLETE.md`
- 🔗 UGF Guide: See `UGF_INTEGRATION_GUIDE.md`
- 🔗 Base Docs: https://docs.base.org
- 🔗 Wagmi Docs: https://wagmi.sh
- 🔗 RainbowKit Docs: https://rainbowkit.com

---

**You're ready to ship! 🚀**

Join the Hackathon and make Web3 easy!
