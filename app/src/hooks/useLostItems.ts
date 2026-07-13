import { useQuery } from "@tanstack/react-query";
import { useProgram } from "./useProgram";
import { mapLostItem } from "../lib/mappers";
import type { LostItemModel } from "../types/models";

/** All LostItem accounts that exist for this program, newest first. */
export function useLostItems() {
  const program = useProgram();

  return useQuery({
    queryKey: ["lost-items", program?.programId.toBase58()],
    enabled: !!program,
    queryFn: async (): Promise<LostItemModel[]> => {
      const accounts = await program!.account.lostItem.all();
      return accounts
        .map((a) => mapLostItem(a.publicKey, a.account))
        .sort((a, b) => b.createdAt - a.createdAt);
    },
  });
}
