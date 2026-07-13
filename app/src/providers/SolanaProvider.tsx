import { useMemo } from "react";
import type {  ReactNode} from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";

import { RPC_ENDPOINT } from "../lib/constants";

interface Props {
    children: ReactNode
}

export function SolanaProvider({children}: Props) {
  // Most wallets (including Phantom) now auto-register via the Wallet
  // Standard, but listing adapters explicitly keeps older wallet versions
  // and non-standard wallets working too.
  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={RPC_ENDPOINT}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
