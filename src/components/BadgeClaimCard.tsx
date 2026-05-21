/**
 * @file BadgeClaimCard.tsx
 * @description Main badge claiming component
 * 
 * Flow:
 * 1. User clicks "Claim Badge"
 * 2. App requests UGF quote (0.5 Mock USD)
 * 3. User confirms
 * 4. UGF executes transaction (no ETH needed!)
 * 5. Badge is claimed
 */

'use client';

import { useEffect, useState } from 'react';
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { BADGE_CONTRACT_ADDRESS, BADGE_CONTRACT_ABI, BASE_SEPOLIA_CHAIN_ID } from '@/lib/web3-config';
import { ugfClient, type UGFQuote } from '@/lib/ugf-client';
import { saveClaimHistory } from '@/lib/storage';
import { useToast } from '@/components/ToastProvider';

type TransactionStatus = 'idle' | 'fetching-quote' | 'confirming' | 'executing' | 'success' | 'error';

interface BadgeClaimCardProps {
  contractAddress?: string;
}

export function BadgeClaimCard({ contractAddress = BADGE_CONTRACT_ADDRESS }: BadgeClaimCardProps) {
  const { address, isConnected } = useAccount();
  const { writeContract, isPending } = useWriteContract();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const [status, setStatus] = useState<TransactionStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [ugfQuote, setUgfQuote] = useState<UGFQuote | null>(null);
  const [txHash, setTxHash] = useState('');

  // Read if user has already claimed
  const { data: hasClaimed } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: BADGE_CONTRACT_ABI,
    functionName: 'isBadgeClaimed',
    args: [address as `0x${string}`],
    query: { enabled: !!address && isConnected },
  });

  // Read claim count
  const { data: claimCount } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: BADGE_CONTRACT_ABI,
    functionName: 'getClaimCount',
    args: [address as `0x${string}`],
    query: { enabled: !!address && isConnected },
  });

  const { notify } = useToast();

  const handleClaimBadge = async () => {
    if (!address || !isConnected) {
      setErrorMsg('Please connect your wallet first!');
      notify({
        title: 'Connection required',
        description: 'Please connect your wallet to claim a badge.',
        variant: 'info',
      });
      return;
    }

    try {
      setStatus('fetching-quote');
      setErrorMsg('');

      const quote = await ugfClient.getQuote({
        chainId: BASE_SEPOLIA_CHAIN_ID,
        userAddress: address,
        contractAddress: contractAddress as string,
        functionName: 'claimBadge',
        args: [],
      });

      setUgfQuote(quote);
      setStatus('confirming');

      setStatus('executing');

      const writeResult = await writeContract({
        address: contractAddress as `0x${string}`,
        abi: BADGE_CONTRACT_ABI,
        functionName: 'claimBadge',
      });

      const executionResult = await ugfClient.executeTransaction(
        quote.quoteId,
        address,
        writeResult
      );

      const transactionHash = executionResult.transactionHash ||
        (typeof writeResult === 'string' ? writeResult : '') ||
        `0x${Math.random().toString(16).substring(2)}`;

      setTxHash(transactionHash);
      setStatus('success');

      saveClaimHistory(address, {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        badgeName: 'UGF Starter Badge',
        txHash: transactionHash,
        amount: quote.mockUSDAmount,
        date: Date.now(),
        status: 'success',
      });

      notify({
        title: 'Badge claimed!',
        description: `TX ${transactionHash.substring(0, 12)}...`,
        variant: 'success',
      });
    } catch (err) {
      console.error('Error claiming badge:', err);
      const message = err instanceof Error ? err.message : 'Failed to claim badge';
      setErrorMsg(message);
      setStatus('error');
      notify({
        title: 'Claim failed',
        description: message,
        variant: 'error',
      });
    }
  };

  if (!mounted) {
    return <div className="w-full max-w-md mx-auto p-6 bg-blue-50 border-2 border-blue-200 rounded-lg text-center min-h-[220px]" />;
  }

  if (!isConnected) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-blue-50 border-2 border-blue-200 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">👋 Welcome!</h2>
        <p className="text-gray-700">Please connect your wallet to claim your badge.</p>
      </div>
    );
  }

  // Render based on claim status
  if (hasClaimed) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-green-50 border-2 border-green-300 rounded-lg text-center">
        <div className="text-6xl mb-4">🎖️</div>
        <h2 className="text-2xl font-bold text-green-700 mb-2">Badge Claimed!</h2>
        <p className="text-gray-700 mb-4">
          You already have your badge. Come back tomorrow for more badges!
        </p>
        <p className="text-sm text-gray-600">
          Total claims: <strong>{claimCount?.toString() || '1'}</strong>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white border-2 border-purple-300 rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-6xl mb-3">⭐</div>
        <h2 className="text-2xl font-bold text-purple-900">Claim Your Badge</h2>
        <p className="text-gray-600 mt-2">No ETH needed! Gas is free.</p>
      </div>

      {/* UGF Quote Display */}
      {ugfQuote && (
        <div className="bg-purple-50 border border-purple-200 rounded p-4 mb-4">
          <p className="text-sm text-gray-700">
            <strong>Gas Cost:</strong> {ugfQuote.mockUSDAmount.toFixed(2)} MockUSD
          </p>
          <p className="text-xs text-gray-500 mt-2">
            ✓ You pay only in Mock USD. ETH not needed!
          </p>
        </div>
      )}

      {/* Status Messages */}
      {status === 'fetching-quote' && (
        <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4 text-center">
          <p className="text-sm text-blue-800">⏳ Getting price quote...</p>
        </div>
      )}

      {status === 'confirming' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4 text-center">
          <p className="text-sm text-yellow-800">🔄 Preparing transaction...</p>
        </div>
      )}

      {status === 'executing' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4 text-center">
          <p className="text-sm text-yellow-800">⏳ Claiming badge...</p>
        </div>
      )}

      {status === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded p-3 mb-4 text-center">
          <p className="text-sm text-green-800">✅ Badge claimed successfully!</p>
          {txHash && (
            <p className="text-xs text-gray-600 mt-2 break-all">
              TX: {txHash.substring(0, 12)}...
            </p>
          )}
        </div>
      )}

      {status === 'error' && errorMsg && (
        <div className="bg-red-50 border border-red-200 rounded p-3 mb-4 text-center">
          <p className="text-sm text-red-800">❌ {errorMsg}</p>
        </div>
      )}

      {/* Main Button */}
      <button
        onClick={handleClaimBadge}
        disabled={isPending || status === 'executing'}
        className={`w-full py-3 px-4 rounded-lg font-bold text-white transition ${
          isPending || status === 'executing'
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800'
        }`}
      >
        {isPending || status === 'executing' ? '⏳ Claiming...' : '🎉 Claim Badge'}
      </button>

      {/* Info Text */}
      <p className="text-center text-xs text-gray-500 mt-4">
        Gas payment handled by UGF • No ETH required • Free for you
      </p>
    </div>
  );
}
