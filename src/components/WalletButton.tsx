/**
 * @file WalletButton.tsx
 * @description Simple wallet connection button with status display
 * Shows connected wallet address in beginner-friendly way
 */

'use client';

import { useAccount, useDisconnect } from 'wagmi';
import { useEffect, useState } from 'react';

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  // Prevent hydration mismatch by rendering dynamic wallet UI
  // only after the component is mounted on the client.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  if (!isConnected) {
    return null; // RainbowKit will handle the initial connection
  }

  const displayAddress = address
    ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
    : 'Not connected';

  return (
    <div className="flex items-center justify-between gap-2 bg-green-100 border border-green-300 rounded-lg px-4 py-2">
      <span className="text-sm font-medium text-green-800">✓ {displayAddress}</span>
      <button
        onClick={() => disconnect()}
        className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition"
      >
        Disconnect
      </button>
    </div>
  );
}
