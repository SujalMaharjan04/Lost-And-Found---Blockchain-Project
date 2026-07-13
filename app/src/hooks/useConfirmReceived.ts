import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PublicKey } from "@solana/web3.js";
import { toast } from "sonner";

import { useProgram } from "./useProgram";
import { deriveClaimPda } from "../lib/pda";
import { explorerUrl } from "../lib/format";

export function useConfirmReceived() {
  const program = useProgram();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lostItemPda, finder }: { lostItemPda: string; finder: string }) => {
      if (!program) throw new Error("Connect your wallet first.");
      const owner = program.provider.publicKey!;
      const lostItem = new PublicKey(lostItemPda);
      const [claim] = deriveClaimPda(lostItem);

      return program.methods
        .confirmReceived()
        .accountsPartial({ owner, lostItem, finder: new PublicKey(finder), claim })
        .rpc();
    },
    onSuccess: (signature, { lostItemPda }) => {
      queryClient.invalidateQueries({ queryKey: ["lost-item", lostItemPda] });
      queryClient.invalidateQueries({ queryKey: ["lost-items"] });
      queryClient.invalidateQueries({ queryKey: ["my-listings"] });
      queryClient.invalidateQueries({ queryKey: ["my-claims"] });
      toast.success("Reward released to the finder \u2014 item Completed", {
        action: { label: "View tx", onClick: () => window.open(explorerUrl(signature), "_blank") },
      });
    },
    onError: (err: Error) => toast.error(err.message ?? "Failed to confirm receipt"),
  });
}
