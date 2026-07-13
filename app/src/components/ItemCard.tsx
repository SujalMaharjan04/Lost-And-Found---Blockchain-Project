import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { StatusBadge } from "./StatusBadge";
import { RewardBadge } from "./RewardBadge";
import { CopyAddress } from "./CopyAddress";
import type { LostItemModel } from "../types/models";
import { formatDate } from "../lib/format";

export function ItemCard({ item }: { item: LostItemModel }) {
  return (
    <Link to={`/items/${item.publicKey.toBase58()}`}>
      <Card className="flex h-full flex-col transition hover:border-brand-500/60">
        <div className="mb-3 aspect-video overflow-hidden rounded-xl bg-neutral-800">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-neutral-500">
              No image
            </div>
          )}
        </div>

        <CardHeader>
          <CardTitle>{item.title}</CardTitle>
          <StatusBadge status={item.status} />
        </CardHeader>

        <CardContent className="flex-1">
          <p className="line-clamp-2">{item.description}</p>
        </CardContent>

        <CardFooter className="flex-col items-start gap-2">
          <div className="flex w-full items-center justify-between">
            <RewardBadge lamports={item.rewardLamports} />
            <span className="text-xs text-neutral-500">{formatDate(item.createdAt)}</span>
          </div>
          <div className="flex w-full items-center justify-between text-xs text-neutral-500">
            <span>Owner</span>
            <CopyAddress address={item.owner.toBase58()} />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
