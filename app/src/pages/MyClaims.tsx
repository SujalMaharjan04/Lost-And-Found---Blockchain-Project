import { Link } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMyClaims } from "../hooks/useMyClaims";
import { Card } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { formatDate } from "../lib/format";

export default function MyClaims() {
  const { connected } = useWallet();
  const { data: claims, isLoading } = useMyClaims();

  if (!connected) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="mb-2 text-2xl font-bold">Connect your wallet</h1>
        <p className="text-neutral-400">Connect to see claims you've submitted.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">My Claims</h1>

      {isLoading && (
        <div className="space-y-3">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      )}

      {!isLoading && (claims?.length ?? 0) === 0 && (
        <p className="text-neutral-500">
          You haven't submitted any recovery claims yet. Browse lost items to
          get started.
        </p>
      )}

      <div className="space-y-3">
        {claims?.map((claim) => (
          <Link key={claim.publicKey.toBase58()} to={`/items/${claim.lostItem.toBase58()}`}>
            <Card className="transition hover:border-brand-500/60">
              <p className="mb-1 text-sm text-neutral-500">
                Submitted {formatDate(claim.createdAt)}
              </p>
              <p className="line-clamp-2">{claim.message || "No message included."}</p>
              <p className="mt-1 text-xs text-neutral-500">Found at: {claim.foundLocation}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
