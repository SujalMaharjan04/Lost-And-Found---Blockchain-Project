import { useQuery } from "@tanstack/react-query";
import { PublicKey } from "@solana/web3.js";
import { useProgram } from "./useProgram";
import { mapLostItem } from "../lib/mappers";

/** A single LostItem account by its PDA address. */
export function useLostItem(pda: string | undefined) {
  const program = useProgram();

  return useQuery({
    queryKey: ["lost-item", pda],
    enabled: !!program && !!pda,
    queryFn: async () => {
      const publicKey = new PublicKey(pda!);
      const account = await program!.account.lostItem.fetch(publicKey);
      return mapLostItem(publicKey, account);
    },
  });
}
