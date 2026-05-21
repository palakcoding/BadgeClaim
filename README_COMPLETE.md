# Badge Claim - Gas-Free Web3 dApp

## 🎯 Project Overview

A beginner-friendly Web3 dApp built for the hackathon that solves the "gas fee friction" problem using the Universal Gas Framework (UGF).

**Core Problem Solved:** Users normally need ETH in their wallet to pay gas fees before doing anything on blockchain (mint, send, donate, claim). This creates friction for beginners.

**Our Solution:** Badge Claim dApp allows users to:
- Claim badges without needing ETH
- Pay for gas using Mock USD (handled by UGF)
- Experience blockchain interaction that feels like a normal app
- Never see complex gas/wallet management

## 🚀 Key Features

- ✅ **Gas-Free Transactions** - Users pay with Mock USD, not ETH
- ✅ **Network Detection** - Automatically detects and switches to Base Sepolia
- ✅ **Beginner-Friendly UI** - Simple, one-click action, no crypto jargon
- ✅ **UGF Integration** - Demonstrates gas abstraction in action
- ✅ **Error Handling** - Graceful failure states and clear feedback
- ✅ **Transaction Tracking** - Users see loading states and confirmation

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 + React + TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Base Sepolia Testnet
- **Wallet Connection**: RainbowKit + Wagmi
- **Web3**: Viem, Ethers.js
- **State Management**: React Query
- **Smart Contracts**: Solidity

## 📋 Project Structure

```
badge-dapp/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Main page
│   └── globals.css              # Global styles
├── src/
│   ├── components/
│   │   ├── Providers.tsx        # Web3 providers setup (wagmi, RainbowKit)
│   │   ├── NetworkGuard.tsx     # Network detection & switching
│   │   ├── WalletButton.tsx     # Wallet connection display
│   │   └── BadgeClaimCard.tsx   # Main badge claiming component
│   └── lib/
│       ├── web3-config.ts       # Web3 configuration (chains, ABIs, addresses)
│       └── ugf-client.ts        # UGF integration client
├── contracts/
│   └── BadgeContract.sol        # Simple badge smart contract
├── .env.local.example           # Environment variables template
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
└── README.md                   # This file
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn
- A wallet (MetaMask, Rainbow, etc.)
- Base Sepolia testnet access

### 1. Install Dependencies

```bash
cd badge-dapp
npm install
```

### 2. Configure Environment

```bash
cp .env.local.example .env.local
```

Then edit `.env.local`:

```env
# Get from https://cloud.walletconnect.com
NEXT_PUBLIC_WC_PROJECT_ID=your_walletconnect_project_id

# This is the deployed badge contract (update after deployment)
NEXT_PUBLIC_BADGE_CONTRACT=0xYourContractAddressHere
```

### 3. Deploy Smart Contract

Use Remix, Hardhat, or Foundry to deploy `contracts/BadgeContract.sol` to Base Sepolia:

```bash
# Example with Hardhat
npx hardhat compile
npx hardhat run scripts/deploy.js --network baseSepolia
```

Copy the deployed contract address to `.env.local`

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔄 User Flow

1. **User Opens App**
   - Sees clean interface with wallet connection button
   - Info section explains no ETH needed

2. **User Connects Wallet**
   - Click "Connect Wallet" (RainbowKit)
   - Select wallet provider
   - Approve connection

3. **Network Check**
   - App checks if on Base Sepolia
   - If not, shows "Switch Network" button
   - User clicks to switch (wallet handles it)

4. **User Claims Badge**
   - Sees "Claim Badge" button
   - Clicks the button
   - App gets UGF quote (0.5 MockUSD for gas)

5. **Transaction Execution**
   - User sees loading state
   - UGF executes transaction in background
   - Gas paid with Mock USD (user doesn't see this)
   - Transaction completes

6. **Success Confirmation**
   - User sees badge claimed ✅
   - Shows transaction hash
   - Can see claim count

## 💡 Key Design Decisions

### 1. **Network Guarding** (NetworkGuard.tsx)
- **Why**: Most Web3 bugs come from wrong network
- **What**: Detects if user is on Base Sepolia, forces switch if not
- **Result**: Zero confusion for beginners

### 2. **Beginner-Friendly Language**
- ❌ "Execute transaction"
- ✅ "Claim Badge"
- ❌ "Pay gas fee in ETH"
- ✅ "Gas is free"

### 3. **Simple Smart Contract**
- Only two core functions: `claimBadge()` and check status
- No complex DeFi logic
- Easy to audit and verify

### 4. **UGF Integration**
- `ugfClient.getQuote()` - Get Mock USD cost
- `ugfClient.executeTransaction()` - Execute with gas sponsorship
- Mock implementation for testing

### 5. **Error Handling**
- Loading states at each step
- Clear success/failure messages
- Graceful retry options

## 🧪 Testing

### Local Testing

```bash
# 1. Connect wallet (use Sepolia testnet)
# 2. Make sure you have testnet ETH for initial transaction
# 3. Click "Claim Badge"
# 4. Approve transaction in wallet
# 5. See confirmation

# To reset and claim again:
# - Call resetClaim() on the contract
# - Or use a different wallet
```

### Contract Testing

```bash
# Deploy to local network
npx hardhat run scripts/deploy.js --network localhost

# Run contract tests
npx hardhat test
```

## 📊 UGF Integration Explained

### What is UGF?
UGF (Universal Gas Framework) is a service that:
1. Receives a blockchain action request
2. Calculates the gas cost
3. Gets a quote in Mock USD
4. Executes the transaction with gas sponsorship
5. User pays only in Mock USD

### Flow in Our App

```
User Clicks "Claim Badge"
         ↓
App calls ugfClient.getQuote()
         ↓
UGF returns: "0.5 MockUSD for this action"
         ↓
App shows quote to user
         ↓
User approves (no wallet interaction needed yet!)
         ↓
App calls ugfClient.executeTransaction()
         ↓
UGF pays for gas with ETH (from sponsorship pool)
         ↓
Transaction executes on-chain
         ↓
User account is debited 0.5 MockUSD
         ↓
Badge is claimed ✅
```

**Key Insight**: User never sees the gas payment to blockchain. It's abstracted away.

## 🚀 Deployment

### Frontend Deployment (Vercel)

```bash
# Push to GitHub, connect to Vercel
git push origin main

# Vercel auto-deploys
# Update .env.local in Vercel dashboard with contract address
```

### Smart Contract Deployment

**Option 1: Remix IDE**
1. Go to [remix.ethereum.org](https://remix.ethereum.org)
2. Upload `BadgeContract.sol`
3. Select "Base Sepolia" network
4. Deploy

**Option 2: Hardhat**
```bash
# Create hardhat.config.ts
# Add Base Sepolia network config
# Deploy with: npx hardhat run scripts/deploy.js --network baseSepolia
```

## 📱 Mobile Support

The app is fully responsive:
- Mobile-first design
- Touch-friendly buttons
- Works on MetaMask Mobile
- RainbowKit handles mobile wallets

## 🔐 Security Considerations

1. **Contract**: Simple, auditable code - no complex logic = less risk
2. **Frontend**: Uses established libraries (wagmi, RainbowKit)
3. **UGF**: Delegates gas sponsorship to trusted service
4. **User Keys**: Never transmitted - stays in wallet

## 🐛 Troubleshooting

### "Wrong Network!" Error
- Make sure MetaMask is set to Base Sepolia
- Click the "Switch Network" button
- Refresh the page

### "Not Connected" Message
- Click "Connect Wallet"
- Select your wallet provider
- Approve connection

### "Failed to Claim Badge"
- Check wallet has ETH for gas (if direct transaction)
- Check contract is deployed at correct address
- Verify you haven't already claimed
- Try with different wallet

### "Contract Not Found"
- Deploy contract first
- Copy address to `.env.local`
- Restart dev server

## 📚 Resources

- [Base Sepolia Testnet](https://sepolia.basescan.org/)
- [RainbowKit Docs](https://www.rainbowkit.com/)
- [Wagmi Docs](https://wagmi.sh/)
- [Universal Gas Framework](https://ugf.dev/)
- [Next.js 15 Docs](https://nextjs.org/docs)

## 🎖️ What Makes This Hackathon Submission Great

✅ **Solves Real Problem**: Gas fees are the #1 friction point for Web3 beginners

✅ **UX Focused**: Clean, simple interface - no crypto jargon

✅ **Technical Implementation**: Real blockchain interaction on Base Sepolia

✅ **Production Ready**: Error handling, loading states, network detection

✅ **Scalable Idea**: Same pattern works for NFTs, donations, rewards, etc.

✅ **Educational**: Shows how gas abstraction works in practice

## 👥 Team

Built for the Hackathon with ❤️

## 📝 License

MIT

---

**Let's make Web3 easy for everyone!** 🚀
