import { useQuery } from "@tanstack/react-query";
import { useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "./useProgram";
import { mapRecoveryClaim } from "../lib/mappers";

/** RecoveryClaim accounts submitted by the connected wallet. */
export function useMyClaims() {
  const program = useProgram();
  const { publicKey } = useWallet();

  return useQuery({
    queryKey: ["my-claims", program?.programId.toBase58(), publicKey?.toBase58()],
    enabled: !!program && !!publicKey,
    queryFn: async () => {
      const accounts = await program!.account.recoveryClaim.all([
        { memcmp: { offset: 8 + 32, bytes: publicKey!.toBase58() } }, // skip discriminator (8) + lostItem pubkey (32) to reach `finder`
      ]);
      return accounts
        .map((a) => mapRecoveryClaim(a.publicKey, a.account))
        .sort((a, b) => b.createdAt - a.createdAt);
    },
  });
}
