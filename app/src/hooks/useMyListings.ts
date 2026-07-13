import { useQuery } from "@tanstack/react-query";
import { useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "./useProgram";
import { mapLostItem } from "../lib/mappers";

/** LostItem accounts where `owner` is the connected wallet. */
export function useMyListings() {
  const program = useProgram();
  const { publicKey } = useWallet();

  return useQuery({
    queryKey: ["my-listings", program?.programId.toBase58(), publicKey?.toBase58()],
    enabled: !!program && !!publicKey,
    queryFn: async () => {
      const accounts = await program!.account.lostItem.all([
        { memcmp: { offset: 8, bytes: publicKey!.toBase58() } }, // `owner` is the first field after the 8-byte discriminator
      ]);
      return accounts
        .map((a) => mapLostItem(a.publicKey, a.account))
        .sort((a, b) => b.createdAt - a.createdAt);
    },
  });
}
