# 🆘 Troubleshooting Guide

Common issues and solutions when working with the Badge Claim dApp.

## Installation Issues

### Problem: `npm install` fails

**Symptoms:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve
```

**Solution:**
```bash
# Use legacy peer deps flag
npm install --legacy-peer-deps

# Or clear cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Problem: Node version incompatible

**Symptoms:**
```
The engine "node" is incompatible with this package
```

**Solution:**
```bash
# Check your Node version
node --version

# Need Node 18+
# Update Node with nvm:
nvm install 18
nvm use 18
```

## Build Issues

### Problem: TypeScript compilation errors

**Symptoms:**
```
error TS2307: Cannot find module '@/components/...'
```

**Solution:**
1. Check `tsconfig.json` paths:
   ```json
   "paths": { "@/*": ["./src/*"] }
   ```
2. Ensure components are in `src/components/`
3. Run: `npm run build`

### Problem: Build succeeds but preview fails

**Symptoms:**
```
Cannot GET /
```

**Solution:**
```bash
# Clean and rebuild
rm -rf .next
npm run build
npm run start
```

## Wallet Connection Issues

### Problem: Connect button doesn't appear

**Symptoms:**
- No wallet button visible
- App says "Not connected"

**Solutions:**
1. Check browser console for errors (F12)
2. Verify RainbowKit is imported in layout.tsx
3. Check Providers component wraps app
4. Try hard refresh (Ctrl+Shift+R)
5. Try different browser

### Problem: Wallet connection rejected

**Symptoms:**
- MetaMask shows connection request then rejects
- "User rejected connection"

**Solutions:**
1. Check browser extensions aren't blocking
2. Clear MetaMask cache
3. Try different wallet (Rainbow, WalletConnect)
4. Check `NEXT_PUBLIC_WC_PROJECT_ID` is set

### Problem: "No compatible wallets"

**Symptoms:**
- RainbowKit shows no wallet options

**Solutions:**
1. Install MetaMask or other wallet extension
2. Create account in wallet
3. Refresh the app
4. Try WalletConnect option

## Network Issues

### Problem: "Wrong Network!" message

**Symptoms:**
- Can't proceed with app
- "Please switch to Base Sepolia"

**Solutions:**
1. Click "Switch to Base Sepolia" button
2. If button doesn't work, manually switch in MetaMask:
   - Open MetaMask
   - Click network dropdown (top)
   - Select "Base Sepolia"
   - If not listed, add manually:
     - Network: Base Sepolia
     - ChainID: 84532
     - RPC: https://sepolia.base.org

### Problem: Wrong network even after switching

**Symptoms:**
- Clicked switch but still shows error
- MetaMask says switched but app says wrong network

**Solutions:**
1. Hard refresh page (Ctrl+Shift+R)
2. Clear browser cache
3. Close and reopen wallet
4. Try in incognito/private mode

### Problem: "Network error" when getting quotes

**Symptoms:**
- Can't get UGF quote
- "Network error" message

**Solutions:**
1. Check internet connection
2. Check RPC endpoint working:
   ```bash
   curl https://sepolia.base.org
   ```
3. Try different RPC provider
4. Check firewall/VPN not blocking

## Contract Issues

### Problem: "Contract not found at address"

**Symptoms:**
- After deploying contract
- App says "Contract not found"
- Or clam button shows error

**Solutions:**
1. Verify contract was deployed:
   - Check BaseScan: https://sepolia.basescan.org
   - Search for your address
   - Should show "Contract" tab

2. Copy correct address:
   - Remove "0x" if present
   - Add "0x" if missing
   - Check case (0xabc = 0xABC)

3. Update .env.local:
   ```env
   NEXT_PUBLIC_BADGE_CONTRACT=0xYourAddress
   ```

4. Restart dev server

### Problem: "Function not found on contract"

**Symptoms:**
- Contract deployed but claimBadge button doesn't work
- Error about function not existing

**Solutions:**
1. Check contract was deployed to Base Sepolia (not wrong network)
2. Verify contract source matches BadgeContract.sol
3. Check ABI in web3-config.ts matches contract
4. Try resetting contract state:
   - Call resetClaim() in Remix
   - Verify with isBadgeClaimed()

### Problem: "Invalid contract ABI"

**Symptoms:**
- App crashes when trying to interact
- "Invalid ABI" error

**Solutions:**
1. Check BADGE_CONTRACT_ABI in web3-config.ts
2. Ensure function names match exactly
3. Verify parameter types are correct
4. Compare with deployed contract

## Transaction Issues

### Problem: Transaction stuck "pending"

**Symptoms:**
- Clicked Claim, waiting forever
- No success or error message

**Solutions:**
1. Wait 1-2 minutes (blockchain is slow sometimes)
2. Check BaseScan:
   - Go to https://sepolia.basescan.org
   - Paste your wallet address
   - Look for pending transactions
   - Click tx to see details

3. If stuck, try:
   - Refresh page
   - Reconnect wallet
   - Try again

### Problem: "Insufficient balance for gas"

**Symptoms:**
- You have 0 ETH
- Error: "Insufficient balance"

**Solutions:**
- This shouldn't happen if UGF is working!
- Verify UGF is properly configured
- Check MockUSD balance instead
- Contact UGF support if persistent

### Problem: "Transaction reverted"

**Symptoms:**
- Transaction executed but reverted
- Error message from contract

**Solutions:**
1. Check error message - it tells you why
2. Common reasons:
   - Already claimed: Use different wallet or call resetClaim()
   - Wrong contract address: Check and update .env
   - Network mismatch: Verify on Base Sepolia
   - Gas limit too low: Shouldn't happen with UGF

### Problem: MetaMask rejects transaction

**Symptoms:**
- MetaMask shows transaction
- User clicks "Reject"
- Nothing happens

**Solutions:**
- This is normal! User can try again
- Click "Claim Badge" again
- Or adjust transaction details if needed

## Configuration Issues

### Problem: Environment variables not loading

**Symptoms:**
- App shows "undefined" for contract address
- Console shows missing env variables

**Solutions:**
1. Check `.env.local` exists (not `.env`)
2. Check variables are set correctly:
   ```env
   NEXT_PUBLIC_WC_PROJECT_ID=your_id
   NEXT_PUBLIC_BADGE_CONTRACT=0x...
   ```
3. Restart dev server (they're read at start time)
4. Check no quotes or extra spaces:
   ```env
   # ✅ Correct
   NEXT_PUBLIC_WC_PROJECT_ID=abc123
   
   # ❌ Wrong
   NEXT_PUBLIC_WC_PROJECT_ID="abc123"
   NEXT_PUBLIC_WC_PROJECT_ID = abc123
   ```

### Problem: WalletConnect Project ID invalid

**Symptoms:**
- "Invalid project ID" error
- Wallet connection doesn't work

**Solutions:**
1. Get new project ID from https://cloud.walletconnect.com
2. Create account if needed
3. Create new project
4. Copy Project ID exactly
5. Update .env.local
6. Restart dev server

## UI/UX Issues

### Problem: App looks broken on mobile

**Symptoms:**
- Buttons cut off
- Text overlapping
- Landscape mode looks weird

**Solutions:**
1. Refresh page
2. Close and reopen
3. Try portrait orientation
4. Clear browser cache
5. Try different browser

### Problem: Can't see wallet button

**Symptoms:**
- "Connect Wallet" button hidden
- RainbowKit not displaying

**Solutions:**
1. Check browser zoom is 100% (Ctrl+0)
2. Maximize browser window
3. Check console for errors (F12)
4. Try different browser
5. Disable browser extensions

### Problem: Text is too small or too large

**Symptoms:**
- Can't read text
- Buttons too small

**Solutions:**
1. Adjust browser zoom:
   - Ctrl++ for bigger
   - Ctrl+- for smaller
   - Ctrl+0 for reset
2. Check browser settings
3. Check OS display scaling

## Performance Issues

### Problem: App is very slow

**Symptoms:**
- Page takes 10+ seconds to load
- Quote request takes forever
- Transactions very slow

**Solutions:**
1. Check internet speed: https://speedtest.net
2. Check network tab (F12) for slow requests
3. Try different network (WiFi vs cellular)
4. Try different device
5. Check Base RPC endpoint is working

### Problem: High CPU usage

**Symptoms:**
- Computer fans spinning
- App causes high CPU

**Solutions:**
1. Close other tabs/apps
2. Check browser console for errors
3. Restart browser
4. Try different browser
5. Report issue on GitHub

## Deployment Issues

### Problem: Vercel deployment fails

**Symptoms:**
- Build fails on Vercel
- Works locally but not on Vercel

**Solutions:**
1. Check build logs on Vercel
2. Ensure all env variables set:
   - NEXT_PUBLIC_WC_PROJECT_ID
   - NEXT_PUBLIC_BADGE_CONTRACT
3. Run `npm run build` locally first
4. Check for hardcoded values
5. Try rebuilding on Vercel dashboard

### Problem: Frontend deployed but doesn't work

**Symptoms:**
- Opens but can't connect wallet
- Contract not found
- Network issues

**Solutions:**
1. Check env variables on Vercel are correct
2. Verify contract is on Base Sepolia testnet
3. Check CORS isn't blocking RPC calls
4. Try from browser console (F12)
5. Check Vercel analytics/logs

## Debugging Tips

### Enable Debug Mode

Add to your component:
```typescript
console.log('Contract address:', contractAddress);
console.log('Is connected:', isConnected);
console.log('Chain ID:', chainId);
console.log('Has claimed:', hasClaimed);
```

### Check Browser Console

Press F12 to open developer tools:
- **Console tab**: Check for errors
- **Network tab**: See API calls
- **Application tab**: Check env variables
- **Elements tab**: Inspect UI elements

### Test with Console

```javascript
// In browser console (F12):
console.log(localStorage); // Check stored data
console.log(window.ethereum); // Check wallet
```

### Common Error Messages

| Error | Meaning | Fix |
|-------|---------|-----|
| "Cannot find module" | Missing dependency | `npm install` |
| "EADDRINUSE" | Port 3000 in use | `npm run dev -- -p 3001` |
| "Cannot GET /" | Wrong route | Check routes exist |
| "401 Unauthorized" | Auth failed | Check API keys |
| "Cannot read property" | Undefined value | Check initialization |

## When All Else Fails

1. **Clear everything:**
   ```bash
   rm -rf node_modules .next
   npm install
   npm run build
   npm run dev
   ```

2. **Check a fresh clone:**
   ```bash
   git clone [repo]
   cd badge-dapp
   npm install
   # Follow QUICKSTART.md
   ```

3. **Check documentation:**
   - README_COMPLETE.md
   - QUICKSTART.md
   - ARCHITECTURE.md

4. **Create minimal test:**
   - Test just wallet connection
   - Test just network switching
   - Test each piece separately

5. **Ask for help:**
   - Check GitHub issues
   - Check Discord communities
   - Reach out to UGF team

---

**Still stuck?** Check the error message carefully - it usually tells you exactly what's wrong! 🔍
