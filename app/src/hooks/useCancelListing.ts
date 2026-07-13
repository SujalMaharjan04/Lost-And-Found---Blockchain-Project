import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PublicKey } from "@solana/web3.js";
import { toast } from "sonner";

import { useProgram } from "./useProgram";
import { explorerUrl } from "../lib/format";

export function useCancelListing() {
  const program = useProgram();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lostItemPda: string) => {
      if (!program) throw new Error("Connect your wallet first.");
      // const owner = program.provider.publicKey!;
      return program.methods
        .cancelListing()
        .accounts({ lostItem: new PublicKey(lostItemPda) })
        .rpc();
    },
    onSuccess: (signature, lostItemPda) => {
      queryClient.invalidateQueries({ queryKey: ["lost-item", lostItemPda] });
      queryClient.invalidateQueries({ queryKey: ["lost-items"] });
      queryClient.invalidateQueries({ queryKey: ["my-listings"] });
      toast.success("Listing cancelled and reward refunded", {
        action: { label: "View tx", onClick: () => window.open(explorerUrl(signature), "_blank") },
      });
    },
    onError: (err: Error) => toast.error(err.message ?? "Failed to cancel listing"),
  });
}
