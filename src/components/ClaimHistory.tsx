'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { loadClaimHistory, type ClaimHistoryEntry } from '@/lib/storage';

export function ClaimHistory() {
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);
  const [history, setHistory] = useState<ClaimHistoryEntry[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!mounted || !address || !isConnected) {
        setHistory([]);
        return;
      }

      setHistory(loadClaimHistory(address));
    }, 0);

    return () => window.clearTimeout(timer);
  }, [address, isConnected, mounted]);

  if (!mounted) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm min-h-[220px]" />;
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Claim History</h2>
          <p className="text-sm text-slate-600">Track your previous badge claims and transaction receipts.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {history.length} entries
        </span>
      </div>

      {history.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-600">
          No claim history yet. Claim a badge and the entry will appear here.
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((entry) => (
            <div key={entry.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-slate-900">{entry.badgeName}</div>
                  <div className="text-xs text-slate-500">{new Date(entry.date).toLocaleString()}</div>
                </div>
                <span className="rounded-full bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
                  {entry.status}
                </span>
              </div>
              <div className="mt-3 flex flex-col gap-1 text-xs text-slate-600">
                <a
                  href={`https://sepolia.basescan.org/tx/${entry.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  TX: {entry.txHash.substring(0, 12)}...
                </a>
                <span>Paid: {entry.amount.toFixed(2)} MockUSD</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
