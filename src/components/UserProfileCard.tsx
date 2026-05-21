'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { BADGE_CONTRACT_ADDRESS, BADGE_CONTRACT_ABI } from '@/lib/web3-config';
import { ugfClient } from '@/lib/ugf-client';

function getUserTier(claimCount: number) {
  if (claimCount >= 5) return 'Gas-Free Guru';
  if (claimCount >= 3) return 'Web3 Pioneer';
  if (claimCount >= 1) return 'UGF Explorer';
  return 'New Member';
}

export function UserProfileCard() {
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const { data: claimCount } = useReadContract({
    address: BADGE_CONTRACT_ADDRESS as `0x${string}`,
    abi: BADGE_CONTRACT_ABI,
    functionName: 'getClaimCount',
    args: [address as `0x${string}`],
    query: { enabled: mounted && !!address && isConnected },
  });

  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!address || !isConnected) return;
    ugfClient.getMockUSDBalance(address).then(setBalance).catch(() => setBalance(null));
  }, [address, isConnected]);

  const displayAddress = useMemo(() => {
    if (!address) return 'No wallet connected';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }, [address]);

  const tier = getUserTier(Number(claimCount ?? 0));

  if (!mounted) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm min-h-[200px]" />
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Your Profile</h2>
          <p className="text-sm text-slate-600">Live wallet, network and reward status.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{tier}</span>
      </div>

      <div className="space-y-4 text-sm text-slate-700">
        <div>
          <div className="uppercase tracking-[0.2em] text-[10px] text-slate-500">Wallet</div>
          <div className="mt-1 font-medium text-slate-900">{displayAddress}</div>
        </div>

          <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Badge claims</div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">{claimCount?.toString() ?? '0'}</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Mock USD balance</div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">
              {balance !== null ? `${balance.toFixed(0)} MOCK` : '—'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
