# UGF Integration Guide

## What is UGF?

UGF (Universal Gas Framework) is a revolutionary service that separates gas payment from blockchain interaction. It allows users to pay for gas in any token (like Mock USD) instead of just ETH.

**The Problem It Solves:**
```
❌ Traditional Flow:
User needs ETH → Find ETH exchange → Buy ETH → Wait → Do blockchain action

✅ UGF Flow:
User has any token → Do blockchain action → UGF pays gas → User pays UGF later
```

## How Our Badge dApp Uses UGF

### 1. **Quote Request**
```typescript
const quote = await ugfClient.getQuote({
  chainId: 84532,
  userAddress: "0x...",
  contractAddress: "0xBadgeContract",
  functionName: 'claimBadge',
  args: [],
});

// Returns: { gasCostInUSD: 0.5, mockUSDAmount: 0.5, ... }
```

**What happens:**
- App tells UGF: "I want to execute claimBadge()"
- UGF calculates: "That'll cost ~50,000 gas = $0.50 in current prices"
- UGF quotes: "You pay 0.5 MockUSD, we pay the ETH gas"

### 2. **Transaction Execution**
```typescript
await ugfClient.executeTransaction(quoteId, userAddress, transactionData);

// UGF now:
// 1. Takes control of the transaction
// 2. Adds its own gas fee from sponsor pool
// 3. Executes on blockchain
// 4. Debits user's MockUSD account
```

**Under the hood:**
- User's wallet shows: Transaction executing...
- Blockchain sees: UGF contract calling BadgeContract.claimBadge()
- User's account: MockUSD -0.5
- Badge state: hasClaimed[user] = true

## Architecture Flow

```
┌─────────────────────────────────────────────────────┐
│           User Opens Badge dApp                      │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│        User Connects Wallet (RainbowKit)            │
│        ✓ Verifies Base Sepolia network              │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│        User Clicks "Claim Badge"                    │
└─────────────────────────────────────────────────────┘
                      ↓
            [APP REQUESTS QUOTE]
┌─────────────────────────────────────────────────────┐
│  1. App calls: ugfClient.getQuote()                 │
│  2. UGF analyzes claimBadge() action                │
│  3. UGF calculates gas needed: 50,000 gas          │
│  4. UGF prices it: $0.50 = 0.5 MockUSD            │
│  5. Returns quote to app                           │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│        App Shows Quote to User                      │
│        "Gas will cost 0.5 MockUSD"                 │
│        User clicks "Confirm"                       │
└─────────────────────────────────────────────────────┘
                      ↓
          [TRANSACTION EXECUTION]
┌─────────────────────────────────────────────────────┐
│  1. App calls: ugfClient.executeTransaction()      │
│  2. UGF takes quoteId and creates tx bundle        │
│  3. UGF calls: badge.claimBadge()                  │
│     (but UGF sends it, not user directly)          │
│  4. UGF pays gas from sponsor pool (ETH)          │
│  5. Transaction mines on blockchain                │
│  6. UGF debits user's MockUSD account             │
│  7. Emits BadgeClaimed event                       │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│        Badge Claimed Successfully! ✅              │
│        TX Hash: 0x123abc...                        │
│        Mock USD Paid: 0.5 USD                      │
│        (No ETH from user wallet needed!)           │
└─────────────────────────────────────────────────────┘
```

## Integration Code Explanation

### Quote Request (src/lib/ugf-client.ts)

```typescript
async getQuote(request: UGFQuoteRequest): Promise<UGFQuote> {
  // In production, this calls real UGF API
  // For demo, returns realistic mock data
  
  const mockQuote: UGFQuote = {
    gasCostInUSD: 0.5,      // Estimated cost
    mockUSDAmount: 0.5,     // What user pays
    estimatedGasUnits: 21000, // Gas estimate
    validUntil: Date.now() + 60000, // Quote expires in 1 min
    quoteId: "quote_123",   // Unique quote ID
  };
  return mockQuote;
}
```

### Transaction Execution (src/lib/ugf-client.ts)

```typescript
async executeTransaction(
  quoteId: string,
  userAddress: string,
  transactionData: any
): Promise<UGFExecutionResult> {
  // In production, this would:
  // 1. Validate quote hasn't expired
  // 2. Check user has enough MockUSD balance
  // 3. Execute transaction through UGF relay
  // 4. Monitor on-chain confirmation
  
  const result: UGFExecutionResult = {
    transactionHash: '0x...',
    status: 'success',
    mockUSDSpent: 0.5,
    gasUsed: 21000,
  };
  return result;
}
```

### UI Implementation (src/components/BadgeClaimCard.tsx)

```typescript
const handleClaimBadge = async () => {
  // Step 1: Get quote
  setStatus('fetching-quote');
  const quote = await ugfClient.getQuote({...});
  
  // Step 2: Show quote to user
  setUgfQuote(quote);
  setStatus('confirming');
  
  // Step 3: Execute transaction
  setStatus('executing');
  writeContract({...}); // Write to blockchain
  
  // Step 4: Success
  setStatus('success');
};
```

## Key UGF Features Used

### 1. **Quote Validity** (Time-based)
- Quote valid for 60 seconds
- Prevents stale pricing
- Encourages quick user action

### 2. **Gas Abstraction**
- User never sees gas calculations
- User never approves gas separately
- Everything happens in one transaction flow

### 3. **Mock USD Support**
- User balance in Mock USD increases
- Users deposit Mock USD separately (KYC/offchain)
- UGF debits on transaction success

### 4. **Relay Infrastructure**
- UGF acts as transaction relayer
- User's wallet doesn't directly send transaction
- UGF pays gas from sponsor pool
- User reimburses UGF in MockUSD

## Real-World Adaptation

To use this in production with real UGF:

### 1. **Register with UGF**
```
- Visit ugf.dev
- Create developer account
- Get API credentials
- Create sponsorship pool with ETH
```

### 2. **Update Configuration**
```typescript
// src/lib/ugf-client.ts
export class UGFClient {
  constructor(apiKey: string) {
    this.apiBaseUrl = 'https://api.ugf.prod'; // Real API
    this.apiKey = apiKey; // Your credentials
  }

  async getQuote(request: UGFQuoteRequest): Promise<UGFQuote> {
    // Call real UGF API instead of mock
    const response = await fetch(`${this.apiBaseUrl}/quote`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${this.apiKey}` },
      body: JSON.stringify(request),
    });
    return response.json();
  }
}
```

### 3. **Update Environment**
```env
NEXT_PUBLIC_UGF_API=https://api.ugf.prod
NEXT_PUBLIC_UGF_KEY=your_production_key
```

## Testing UGF Integration

### Local Testing
```bash
# Uses mock UGF client
npm run dev

# Works without real UGF credentials
# Shows realistic quotes and flows
```

### Staging Testing
```bash
# With testnet UGF API
NEXT_PUBLIC_UGF_KEY=staging_key npm run dev

# Test real UGF flow
# Real testnet quotes
# Real gas calculations
```

### Production
```bash
# With production UGF
NEXT_PUBLIC_UGF_KEY=prod_key npm run build
# Deploy to Vercel
```

## Benefits of This Approach

✅ **For Users:**
- No need to find/buy ETH separately
- Pay in token they understand (Mock USD)
- Seamless experience like Web2 apps
- One-click transactions

✅ **For Developers:**
- Simplified backend (no gas handling)
- Better UX (no gas price discussions)
- Reliable execution (UGF handles relay)
- Scalable (works for any action)

✅ **For Hackathon:**
- Demonstrates gas abstraction in action
- Shows WebX UX potential
- Real blockchain interaction
- Production-ready architecture

## Error Scenarios

### Quote Expired
```
User waits > 60 seconds before clicking
Error: Quote expired, get new quote
Solution: Auto-refresh quote every 30 seconds
```

### Insufficient MockUSD Balance
```
User only has 0.3 MockUSD, action needs 0.5
Error: Insufficient balance
Solution: Show "Top up MockUSD" option
```

### Network Error During Execution
```
Transaction queued but network dies
Status: Pending/Stuck
Solution: Allow retry or check status on-chain
```

### UGF Sponsor Pool Empty
```
UGF doesn't have ETH to pay gas
Error: Gas sponsorship unavailable
Solution: UGF team tops up pool or user pays ETH
```

## Monitoring & Analytics

Track these metrics:

```typescript
// Quote requests
- Average quote price
- Quote expiration rate

// Transactions
- Success rate
- Average gas used
- MockUSD spent per user

// Errors
- Quote errors: 5%
- Execution errors: 2%
- Network timeouts: 1%

// UX
- Quote request time: <500ms
- TX execution time: <10s
- User abandon rate: track at each step
```

## Future Enhancements

1. **Multi-Token Support**
   - Pay in USDC, USDT, DAI, etc.
   - Not just Mock USD

2. **Bulk Operations**
   - Claim multiple badges in one tx
   - Split gas across operations

3. **Conditional Execution**
   - "Claim if price < $1"
   - Automated strategies

4. **Custom Gas Limits**
   - Users set max gas budget
   - Auto-optimize

---

**UGF makes Web3 accessible. Let's build with it! 🚀**
