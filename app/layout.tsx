import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { ToastProvider } from "@/components/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Badge Claim - Gas-Free Web3 dApp",
  description: "Claim your badge without needing ETH. UGF handles gas with Mock USD.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body 
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50"
      >
        <ToastProvider>
          <Providers>{children}</Providers>
        </ToastProvider>
      </body>
    </html>
  );
}
