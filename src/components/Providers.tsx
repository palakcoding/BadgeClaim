/**
 * @file Providers.tsx
 * @description Client-side providers for wallet connection and Web3
 * Sets up wagmi, RainbowKit, and other Web3 infrastructure
 */

'use client';

import React, { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { config } from '@/lib/web3-config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      gcTime: 1_000 * 60 * 60 * 24, // 24 hours
    },
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
