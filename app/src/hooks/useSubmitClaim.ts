import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { toast } from "sonner";

import { useProgram } from "./useProgram";
import { deriveClaimPda } from "../lib/pda";
import { explorerUrl } from "../lib/format";

export interface SubmitClaimInput {
  lostItemPda: string;
  imageUrl: string;
  foundLocation: string;
  message: string;
}

export function useSubmitClaim() {
  const program = useProgram();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: SubmitClaimInput) => {
      if (!program) throw new Error("Connect your wallet first.");

      const finder = program.provider.publicKey!;
      const lostItem = new PublicKey(input.lostItemPda);
      const [claimPda] = deriveClaimPda(lostItem);

      const signature = await program.methods
        .submitRecoveryClaim(input.imageUrl, input.foundLocation, input.message)
        .accountsPartial({
          finder,
          lostItem,
          claim: claimPda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      return signature;
    },
    onSuccess: (signature, variables) => {
      queryClient.invalidateQueries({ queryKey: ["lost-item", variables.lostItemPda] });
      queryClient.invalidateQueries({ queryKey: ["claim-for-item", variables.lostItemPda] });
      queryClient.invalidateQueries({ queryKey: ["lost-items"] });
      queryClient.invalidateQueries({ queryKey: ["my-claims"] });
      toast.success("Recovery claim submitted", {
        action: { label: "View tx", onClick: () => window.open(explorerUrl(signature), "_blank") },
      });
    },
    onError: (err: Error) => toast.error(err.message ?? "Failed to submit claim"),
  });
}
