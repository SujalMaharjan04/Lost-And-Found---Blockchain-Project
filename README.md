#  Solana Campus Lost & Found

A decentralized Lost & Found application built on the **Solana Blockchain** using **Anchor** and **React**. The platform allows users to report lost items, offer a SOL reward, and securely reward honest finders once the item has been returned.

This project was built for the **Blockchain 101 Workshop (July 4–5, Kathmandu)** beginner Solana hackathon.

---

##  Features

*  Connect with Phantom Wallet
*  Create a lost item listing
*  Offer a SOL reward
*  Upload item images (off-chain)
*  Browse available lost items
*  Submit a recovery claim with proof
*  Owner approves or rejects recovery claims
*  Confirm item has been received
*  Automatic SOL reward transfer using the Solana program
*  
---

##  Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Solana Wallet Adapter

### Blockchain

* Solana
* Anchor Framework
* Rust
* Program Derived Addresses (PDAs)

### Storage

* Cloudinary
* Only image URLs and metadata are stored on-chain

---

## ⚙️ How It Works

1. The owner connects their Phantom wallet.
2. The owner creates a lost item listing with a reward.
3. The reward is locked in escrow by the Solana program.
4. A finder submits a recovery claim with a photo and message.
5. The owner reviews the submitted claim.
6. After the physical item is returned, the owner confirms receipt.
7. The smart contract releases the escrowed SOL reward to the finder.

---

##  Project Structure

```text
lost-found-dapp/
├── app/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── idl/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── providers/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
├── programs/
│   └── lost-found-dapp/
│       ├── src/
│       └── Cargo.toml
├── migrations/
│   └── deploy.ts
├── tests/
│   └── lost-found-dapp.ts
├── Anchor.toml
├── Cargo.toml
├── package.json
├── rust-toolchain.toml
└── tsconfig.json
```
---

##  Getting Started

### Prerequisites

* Node.js
* Rust
* Solana CLI
* Anchor CLI
* Phantom Wallet

### Clone the repository

git clone https://github.com/SujalMaharjan04/Lost-And-Found---Blockchain-Project.git

cd to the root directory where the project was cloned to


### Install frontend dependencies

cd frontend
npm install


### Run the frontend

npm run dev


### Build the Solana program

anchor build

### Deploy to Devnet

anchor deploy



##  Author

**Sujal Maharjan**

Built as a beginner Solana dApp for the Blockchain 101 Workshop hackathon.
