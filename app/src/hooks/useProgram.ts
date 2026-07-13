import { useMemo } from "react";
import { AnchorProvider, Program, setProvider } from "@anchor-lang/core";
import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";

import idl from "../idl/lost_found_dapp.json";
import type { LostFoundDapp } from "../types/lost_found_dapp";

/**
 * Returns an Anchor `Program` wired to the connected wallet, or `null` if no
 * wallet is connected yet. Every mutation hook (useCreateLostItem, etc.)
 * builds on top of this so there's exactly one place that constructs the
 * provider.
 */
export function useProgram(): Program<LostFoundDapp> | null {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  return useMemo(() => {
    if (!wallet) return null;

    const provider = new AnchorProvider(connection, wallet, {
      preflightCommitment: "confirmed",
      commitment: "confirmed",
    });
    setProvider(provider);

    return new Program(idl as unknown as LostFoundDapp, provider);
  }, [connection, wallet]);
}
