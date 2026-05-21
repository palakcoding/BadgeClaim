/**
 * @file NetworkGuard.tsx
 * @description Detects if user is on Base Sepolia, shows warning and switch button if not
 * 
 * This is CRITICAL for a beginner-friendly app!
 * Most Web3 bugs come from wrong network/chain mismatch
 */

'use client';

import { useChainId, useSwitchChain } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';

export function NetworkGuard({ children }: { children: React.ReactNode }) {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  // Check if on Base Sepolia
  const isCorrectNetwork = chainId === baseSepolia.id;

  if (!isCorrectNetwork) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-red-50 border-2 border-red-200 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-red-700 mb-2">Wrong Network!</h2>
        <p className="text-gray-700 mb-6">
          This app only works on <strong>Base Sepolia Testnet</strong>.
          <br />
          Please switch networks to continue.
        </p>
        <button
          onClick={() => switchChain({ chainId: baseSepolia.id })}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition"
        >
          Switch to Base Sepolia
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
