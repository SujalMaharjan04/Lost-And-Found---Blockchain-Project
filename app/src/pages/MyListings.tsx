import { useWallet } from "@solana/wallet-adapter-react";
import { useMyListings } from "../hooks/useMyListings";
import { ItemCard } from "../components/ItemCard";
import { LoadingGrid } from "../components/LoadingGrid";

export default function MyListings() {
  const { connected } = useWallet();
  const { data: items, isLoading } = useMyListings();

  if (!connected) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="mb-2 text-2xl font-bold">Connect your wallet</h1>
        <p className="text-neutral-400">Connect to see the items you've listed.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">My Listings</h1>
      {isLoading && <LoadingGrid />}
      {!isLoading && (items?.length ?? 0) === 0 && (
        <p className="text-neutral-500">You haven't posted any lost items yet.</p>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items?.map((item) => (
          <ItemCard key={item.publicKey.toBase58()} item={item} />
        ))}
      </div>
    </div>
  );
}
