# 📋 Deployment Checklist

Use this checklist to prepare your Web3 dApp for the hackathon demo!

## Pre-Deployment

- [ ] Run `npm run build` - verify no build errors
- [ ] Test locally with `npm run dev`
- [ ] Connect wallet and verify RainbowKit works
- [ ] Verify network detection works (try clicking "Switch Network")

## Smart Contract Deployment

- [ ] Have Base Sepolia testnet ETH in wallet (~0.1 ETH for gas)
- [ ] Compile `BadgeContract.sol` in Remix or Hardhat
- [ ] Deploy to Base Sepolia testnet
- [ ] Verify deployment on https://sepolia.basescan.org
- [ ] Copy contract address
- [ ] Update `.env.local`: `NEXT_PUBLIC_BADGE_CONTRACT=0x...`

## Environment Configuration

- [ ] Create WalletConnect Project ID: https://cloud.walletconnect.com
- [ ] Add to `.env.local`: `NEXT_PUBLIC_WC_PROJECT_ID=...`
- [ ] Verify all required `.env.local` variables are set:
  ```
  NEXT_PUBLIC_WC_PROJECT_ID=xxx
  NEXT_PUBLIC_BADGE_CONTRACT=0x...
  ```
- [ ] Test that env variables load: `npm run dev` and check console

## Functional Testing

- [ ] [ ] Step 1: Open app → See connect wallet button
- [ ] [ ] Step 2: Connect wallet → See wallet address in header
- [ ] [ ] Step 3: Verify on Base Sepolia → Network guard passes
- [ ] [ ] Step 4: Click "Claim Badge" → See loading state
- [ ] [ ] Step 5: See UGF quote → "0.5 MockUSD" price shown
- [ ] [ ] Step 6: Confirm transaction → See executing state
- [ ] [ ] Step 7: See success message → Transaction hash shown
- [ ] [ ] Step 8: Verify on-chain → Check hash on BaseScan
- [ ] [ ] Step 9: Check contract state → Badge is claimed
- [ ] [ ] Step 10: Try claiming again → See "Already claimed" message

## Error Handling Testing

- [ ] [ ] Disconnect wallet → See "Not connected" message
- [ ] [ ] Switch to wrong network → See "Wrong Network!" button
- [ ] [ ] Reject transaction in wallet → See error message gracefully
- [ ] [ ] Wait > 60 seconds before confirming → Quote expires gracefully
- [ ] [ ] Check with multiple wallets → Works correctly

## Performance Testing

- [ ] App loads in < 1 second
- [ ] Quote request in < 2 seconds
- [ ] Transaction confirmation in < 15 seconds
- [ ] No console errors
- [ ] Responsive on mobile (test in browser dev tools)

## Code Quality

- [ ] [ ] Run: `npm run lint` - no errors
- [ ] [ ] Run: `npm run build` - no errors
- [ ] [ ] All comments up to date
- [ ] [ ] No console.log() debug statements left
- [ ] [ ] Error messages are user-friendly

## Frontend Deployment (Vercel)

- [ ] [ ] Create GitHub repository
- [ ] [ ] Push code to GitHub
- [ ] [ ] Sign up for Vercel: https://vercel.com
- [ ] [ ] Import repository
- [ ] [ ] Add environment variables in Vercel dashboard:
    ```
    NEXT_PUBLIC_WC_PROJECT_ID=xxx
    NEXT_PUBLIC_BADGE_CONTRACT=0x...
    ```
- [ ] [ ] Deploy
- [ ] [ ] Test production link
- [ ] [ ] Verify all features work on production
- [ ] [ ] Share production link

## Documentation

- [ ] [ ] README.md is complete and clear
- [ ] [ ] QUICKSTART.md has working instructions
- [ ] [ ] UGF_INTEGRATION_GUIDE.md explains architecture
- [ ] [ ] Comments in code explain complex sections
- [ ] [ ] Environment variables are documented

## Hackathon Submission

- [ ] [ ] Test link works and is shareable
- [ ] [ ] App title and description are clear
- [ ] [ ] All features demonstrated in video/demo
- [ ] [ ] Explain how UGF solves the gas problem
- [ ] [ ] Show it works without ETH in wallet (have 0 ETH)
- [ ] [ ] Transaction visible on BaseScan

## Demo Day Preparation

- [ ] [ ] Have 2 wallets ready (one for demo, one as backup)
- [ ] [ ] Have Meta Mask / wallet extension installed
- [ ] [ ] Know your explanation (pitch = 1 minute)
- [ ] [ ] Practice the flow:
     1. Connect wallet
     2. Verify network
     3. Claim badge
     4. Show transaction
     5. Explain UGF magic
- [ ] [ ] Have backup demo link (localhost or Vercel)
- [ ] [ ] Test WiFi/internet connection
- [ ] [ ] Have screenshots/video of full flow

## Live Demo Script (1 minute)

```
"Welcome to Badge Claim - a gas-free Web3 experience!

[Connect wallet]
"First, we connect our wallet. Notice - no ETH needed.

[Click Claim Badge]
"Now we claim a badge. The app asks UGF for a quote.

[Show quote]
"See? Only 0.5 MockUSD gas fee, not ETH!

[Confirm transaction]
"We confirm... and the transaction goes through.

[Show success + BaseScan]
"Done! Badge claimed, no ETH, all gas paid through UGF.

This is what gas abstraction looks like. 
Web3 should be this easy for everyone!"
```

## Feedback Collection

- [ ] [ ] Ask judges: "How easy was the UX?"
- [ ] [ ] Ask judges: "Would beginners understand this?"
- [ ] [ ] Ask judges: "What would make it better?"
- [ ] [ ] Take notes for improvements

## Post-Hackathon

- [ ] [ ] Document feedback
- [ ] [ ] Plan additional features:
    - Multiple badge types?
    - Point system?
    - Leaderboard?
    - NFT integration?
- [ ] [ ] Consider Open Source contribution
- [ ] [ ] Prepare for investor/partnership conversations

---

## Success Criteria ✅

Your submission is ready if:

1. ✅ App loads without errors
2. ✅ Wallet connects properly
3. ✅ Network detection works
4. ✅ Badge claiming works end-to-end
5. ✅ Transaction visible on-chain
6. ✅ UGF integration demonstrated
7. ✅ No ETH required in user wallet
8. ✅ UI is clean and beginner-friendly
9. ✅ Code is well-documented
10. ✅ Demo is smooth and impressive

---

**You're ready to ship and win! 🏆🚀**
