import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PublicKey } from "@solana/web3.js";
import { toast } from "sonner";

import { useProgram } from "./useProgram";
import { deriveClaimPda } from "../lib/pda";
import { explorerUrl } from "../lib/format";

/** Owner-only: approve or reject the pending claim on one of their items. */
export function useClaimActions() {
  const program = useProgram();
  const queryClient = useQueryClient();

  const invalidate = (lostItemPda: string) => {
    queryClient.invalidateQueries({ queryKey: ["lost-item", lostItemPda] });
    queryClient.invalidateQueries({ queryKey: ["claim-for-item", lostItemPda] });
    queryClient.invalidateQueries({ queryKey: ["lost-items"] });
    queryClient.invalidateQueries({ queryKey: ["my-listings"] });
    queryClient.invalidateQueries({ queryKey: ["my-claims"] });
  };

  const approve = useMutation({
    mutationFn: async ({ lostItemPda, finder }: { lostItemPda: string; finder: string }) => {
      if (!program) throw new Error("Connect your wallet first.");
      const owner = program.provider.publicKey!;
      const lostItem = new PublicKey(lostItemPda);
      const [claim] = deriveClaimPda(lostItem);
      return program.methods
        .approveClaim()
        .accountsPartial({ owner, lostItem, claim })
        .rpc();
    },
    onSuccess: (signature, { lostItemPda }) => {
      invalidate(lostItemPda);
      toast.success("Claim approved — item is now ready for pickup", {
        action: { label: "View tx", onClick: () => window.open(explorerUrl(signature), "_blank") },
      });
    },
    onError: (err: Error) => toast.error(err.message ?? "Failed to approve claim"),
  });

  const reject = useMutation({
    mutationFn: async ({ lostItemPda, finder }: { lostItemPda: string; finder: string }) => {
      if (!program) throw new Error("Connect your wallet first.");
      const owner = program.provider.publicKey!;
      const lostItem = new PublicKey(lostItemPda);
      const [claim] = deriveClaimPda(lostItem);
      return program.methods
        .rejectClaim()
        .accountsPartial({ owner, lostItem, finder: new PublicKey(finder), claim })
        .rpc();
    },
    onSuccess: (signature, { lostItemPda }) => {
      invalidate(lostItemPda);
      toast.success("Claim rejected — item is Open again", {
        action: { label: "View tx", onClick: () => window.open(explorerUrl(signature), "_blank") },
      });
    },
    onError: (err: Error) => toast.error(err.message ?? "Failed to reject claim"),
  });

  return { approve, reject };
}
