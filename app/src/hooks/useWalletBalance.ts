import { useQuery } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { lamportsToSol } from "../lib/format";

export function useWalletBalance() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  return useQuery({
    queryKey: ["wallet-balance", publicKey?.toBase58()],
    enabled: !!publicKey,
    refetchInterval: 15_000,
    queryFn: async () => {
      const lamports = await connection.getBalance(publicKey!);
      return lamportsToSol(lamports);
    },
  });
}
