# BadgeClaim
# 🏅 Gasless Badge Claim dApp

A next-generation full-stack Web3 application that completely abstracts blockchain friction. Built for the hackathon track, this dApp allows users to mint verifiable, on-chain achievements directly to **Base Sepolia** with **zero native ETH requirements**, routing gas fee sponsorship seamlessly using **Mock USD** via the **Universal Gas Framework (UGF)**.

![DApp Dashboard Status](https://img.shields.io/badge/Blockchain-Base_Sepolia-blue.svg)
![Framework](https://img.shields.io/badge/Frontend-Next.js_14-purple.svg)
![UX](https://img.shields.io/badge/UX-Gas_Abstraction-emerald.svg)

---

## 🚀 The Core Problem & Our Solution

### The Friction
Traditional onboarding into Web3 is fundamentally broken for beginners. To claim a simple on-chain badge or interaction, a new user must:
1. Set up a wallet.
2. Go to a centralized exchange to complete KYC.
3. Purchase native network gas tokens ($ETH$).
4. Bridge assets over to the target Layer 2 network.
5. Pay volatile, confusing gas fees just to execute a transaction.

### The Solution: Universal Gas Framework (UGF)
This application eliminates the onboarding barrier entirely. By integrating the **Universal Gas Framework**, the native gas requirements are completely hidden under the hood. 
* Users collateralize and pay for transactions using a standard test asset (**Mock USD**) claimed directly from an ecosystem faucet.
* The application requests a gas sponsorship quote, handles the gas translation relay, and signs a gasless execution sequence.
* **Result:** A seamless, single-click Web3 user experience that mimics traditional web applications.

---

## 🛠️ Tech Stack & Architecture

* **Smart Contract Layer:** Written in Solidity, compiled, verified, and deployed on the **Base Sepolia Testnet** via Remix. It features secure state-mapping guards to enforce fair claim distributions.
* **Frontend Framework:** Next.js 14 utilizing React server-side hydration optimizations for ultra-fast load times.
* **Styling & UI:** Tailwind CSS tailored with a clean, responsive dark-mode dashboard interface built to display badge tier progressions natively.
* **Web3 Connect Layer:** RainbowKit paired with Wagmi for secure, bulletproof browser extension wallet discovery.

---

## 📦 Quickstart & Local Installation

### Prerequisites
Make sure you have [Node.js (v18+)](https://nodejs.org/) and `npm` installed on your machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/badge-dapp.git](https://github.com/your-username/badge-dapp.git)
cd badge-dapp
