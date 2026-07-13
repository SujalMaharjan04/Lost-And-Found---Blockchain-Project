import { useQuery } from "@tanstack/react-query";
import { PublicKey } from "@solana/web3.js";
import { useProgram } from "./useProgram";
import { deriveClaimPda } from "../lib/pda";
import { mapRecoveryClaim } from "../lib/mappers";

/**
 * Fetches the RecoveryClaim PDA for a given item, if one currently exists.
 * Returns `null` (not an error) when there's no active claim — that's the
 * normal state for an Open item.
 */
export function useClaimForItem(lostItemPda: string | undefined) {
  const program = useProgram();

  return useQuery({
    queryKey: ["claim-for-item", lostItemPda],
    enabled: !!program && !!lostItemPda,
    queryFn: async () => {
      const lostItem = new PublicKey(lostItemPda!);
      const [claimPda] = deriveClaimPda(lostItem);
      try {
        const account = await program!.account.recoveryClaim.fetch(claimPda);
        return mapRecoveryClaim(claimPda, account);
      } catch {
        return null;
      }
    },
  });
}
