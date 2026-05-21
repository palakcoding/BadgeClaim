export interface ClaimHistoryEntry {
  id: string;
  badgeName: string;
  txHash: string;
  amount: number;
  date: number;
  status: 'success' | 'failed' | 'pending';
}

const storageKey = (address: string) => `badgeClaimHistory:${address}`;

export function loadClaimHistory(address: string): ClaimHistoryEntry[] {
  if (!address) return [];

  try {
    const item = window.localStorage.getItem(storageKey(address));
    if (!item) return [];
    const parsed = JSON.parse(item) as ClaimHistoryEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load claim history:', error);
    return [];
  }
}

export function saveClaimHistory(address: string, entry: ClaimHistoryEntry) {
  if (!address) return;

  try {
    const current = loadClaimHistory(address);
    const next = [entry, ...current].slice(0, 20);
    window.localStorage.setItem(storageKey(address), JSON.stringify(next));
  } catch (error) {
    console.error('Failed to save claim history:', error);
  }
}
