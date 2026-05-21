import { createConfig, http } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || 'default_project_id';

export const chains = [baseSepolia] as const;

const { connectors } = getDefaultWallets({
  appName: 'Badge Claim dApp',
  projectId,
});

export const config = createConfig({
  chains,
  connectors,
  transports: {
    [baseSepolia.id]: http('https://sepolia.base.org'),
  },
});

// Base Sepolia Chain ID
export const BASE_SEPOLIA_CHAIN_ID = 84532;

// Mock USD token details (UGF will use this)
export const MOCK_USD_TOKEN = {
  address: '0x0000000000000000000000000000000000000000', // Will be provided by UGF
  decimals: 6,
  symbol: 'MockUSD',
};

// Badge contract address (to be deployed)
export const BADGE_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_BADGE_CONTRACT || '0x';

// ABI for Badge Contract
export const BADGE_CONTRACT_ABI = [
  {
    inputs: [],
    name: 'claimBadge',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'isBadgeClaimed',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getClaimCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'resetClaim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'timestamp', type: 'uint256' },
    ],
    name: 'BadgeClaimed',
    type: 'event',
  },
] as const;
