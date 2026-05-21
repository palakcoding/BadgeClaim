'use client';

import { useEffect, useState } from 'react';
import { useReadContract, useAccount } from 'wagmi';
import { BADGE_CONTRACT_ADDRESS, BADGE_CONTRACT_ABI } from '@/lib/web3-config';

const badgeCollection = [
  {
    name: 'UGF Starter',
    description: 'Claim your first gas-free badge and join the UGF community.',
    color: 'from-violet-500 to-fuchsia-500',
  },
  {
    name: 'Web3 Pioneer',
    description: 'Earned by early adopters building the next generation of Web3 UX.',
    color: 'from-indigo-500 to-cyan-500',
  },
  {
    name: 'Community Builder',
    description: 'Reserved for users who help make Web3 accessible to everyone.',
    color: 'from-emerald-500 to-lime-500',
  },
  {
    name: 'Gas-Free Guru',
    description: 'Unlocked by mastering UGF-powered transactions and fast onboarding.',
    color: 'from-orange-500 to-amber-500',
  },
];

export function BadgeGallery() {
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const { data: hasClaimed } = useReadContract({
    address: BADGE_CONTRACT_ADDRESS as `0x${string}`,
    abi: BADGE_CONTRACT_ABI,
    functionName: 'isBadgeClaimed',
    args: [address as `0x${string}`],
    query: { enabled: mounted && !!address && isConnected },
  });

  const ownedIndex = hasClaimed ? 0 : -1;

  if (!mounted) {
    return <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 min-h-[260px]" />;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Badge Gallery</h2>
          <p className="text-sm text-slate-600">See your earned badges and upcoming rewards.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {hasClaimed ? '1 unlocked' : '0 unlocked'}
        </span>
      </div>

      <div className="grid gap-4">
        {badgeCollection.map((badge, index) => {
          const isOwned = index === ownedIndex;
          return (
            <div
              key={badge.name}
              className={`rounded-3xl border p-4 transition ${
                isOwned
                  ? 'border-purple-300 bg-purple-50 shadow-sm'
                  : 'border-slate-200 bg-slate-50/70'
              }`}
            >
              <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r ${badge.color}`}>
                {isOwned ? 'Owned' : index === 0 ? 'Available' : 'Locked'}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{badge.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{badge.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
