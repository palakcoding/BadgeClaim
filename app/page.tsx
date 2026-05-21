'use client';

import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NetworkGuard } from '@/components/NetworkGuard';
import { BadgeClaimCard } from '@/components/BadgeClaimCard';
import { WalletButton } from '@/components/WalletButton';
import { BadgeGallery } from '@/components/BadgeGallery';
import { ClaimHistory } from '@/components/ClaimHistory';
import { UserProfileCard } from '@/components/UserProfileCard';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-slate-100/60">
      <div className="w-full max-w-6xl rounded-[2rem] border border-slate-200/80 bg-white/95 p-6 shadow-2xl shadow-slate-300/20 backdrop-blur-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">🎖️ Badge Claim</h1>
            <p className="mt-2 text-gray-600 max-w-2xl">
              A gas-free Web3 dashboard powered by UGF. Claim badges, track your history, and explore the gallery.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <WalletButton />
            {!isConnected && <ConnectButton />}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <UserProfileCard />
              <BadgeGallery />
            </div>

            <NetworkGuard>
              <BadgeClaimCard />
            </NetworkGuard>

            <ClaimHistory />
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-3">How it works</h2>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>1. Connect your wallet using RainbowKit.</li>
                <li>2. Switch to Base Sepolia if needed.</li>
                <li>3. Get a MockUSD quote from UGF.</li>
                <li>4. Claim your badge with a gas-free transaction.</li>
                <li>5. Track your claim history and badge collection.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-gray-600 text-sm">
          <p>🚀 Built for the Hackathon | Powered by UGF (Universal Gas Framework)</p>
          <p className="mt-2">This is a Base Sepolia testnet application.</p>
        </div>
      </div>
    </div>
  );
}
