import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BN } from "@anchor-lang/core";
import { SystemProgram } from "@solana/web3.js";
import { toast } from "sonner";

import { useProgram } from "./useProgram";
import { deriveLostItemPda } from "../lib/pda";
import { solToLamports, explorerUrl } from "../lib/format";

export interface CreateLostItemInput {
  title: string;
  description: string;
  category: string;
  lastSeenLocation: string;
  imageUrl: string;
  rewardSol: number;
}

export function useCreateLostItem() {
  const program = useProgram();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateLostItemInput) => {
      if (!program) throw new Error("Connect your wallet first.");

      const owner = program.provider.publicKey!;
      const itemId = BigInt(Date.now());
      const [lostItemPda] = deriveLostItemPda(owner, itemId);
      const rewardLamports = solToLamports(input.rewardSol);

      const signature = await program.methods
        .initializeLostItem(
          new BN(itemId.toString()),
          input.title,
          input.description,
          input.category,
          input.lastSeenLocation,
          input.imageUrl,
          new BN(rewardLamports)
        )
        .accountsPartial({
          owner,
          lostItem: lostItemPda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      return { signature, lostItemPda };
    },
    onSuccess: ({ signature }) => {
      queryClient.invalidateQueries({ queryKey: ["lost-items"] });
      queryClient.invalidateQueries({ queryKey: ["my-listings"] });
      toast.success("Listing created and reward escrowed", {
        action: { label: "View tx", onClick: () => window.open(explorerUrl(signature), "_blank") },
      });
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Failed to create listing");
    },
  });
}
