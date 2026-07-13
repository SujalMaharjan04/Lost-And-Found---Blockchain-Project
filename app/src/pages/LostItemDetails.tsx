import type { FormEvent} from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";

import { useLostItem } from "../hooks/useLostItem";
import { useClaimForItem } from "../hooks/useClaimForItem";
import { useSubmitClaim } from "../hooks/useSubmitClaim";
import { useClaimActions } from "../hooks/useClaimActions";
import { useConfirmReceived } from "../hooks/useConfirmReceived";
import { useCancelListing } from "../hooks/useCancelListing";

import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { StatusBadge } from "../components/StatusBadge";
import { RewardBadge } from "../components/RewardBadge";
import { CopyAddress } from "../components/CopyAddress";
import { ClaimReviewCard } from "../components/ClaimReviewCard";
import { Skeleton } from "../components/ui/skeleton";

import { uploadImageToCloudinary } from "../lib/cloudinary";
import { formatDate } from "../lib/format";

export default function LostItemDetails() {
  const { pda } = useParams<{ pda: string }>();
  const { publicKey } = useWallet();

  const { data: item, isLoading } = useLostItem(pda);
  const { data: claim } = useClaimForItem(pda);

  const submitClaim = useSubmitClaim();
  const { approve, reject } = useClaimActions();
  const confirmReceived = useConfirmReceived();
  const cancelListing = useCancelListing();

  const [foundLocation, setFoundLocation] = useState("");
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  if (isLoading || !item) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  const isOwner = publicKey?.toBase58() === item.owner.toBase58();

  const onSubmitClaim = async (e: FormEvent) => {
    e.preventDefault();
    let imageUrl = "";
    if (imageFile) {
      setUploading(true);
      try {
        imageUrl = await uploadImageToCloudinary(imageFile);
      } finally {
        setUploading(false);
      }
    }
    await submitClaim.mutateAsync({
      lostItemPda: item.publicKey.toBase58(),
      imageUrl,
      foundLocation,
      message,
    });
    setFoundLocation("");
    setMessage("");
    setImageFile(null);
  };

  console.log({
  status: item.status,
  isOwner,
  finder: item.finder?.toBase58(),
});

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Card className="mb-6">
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="mb-4 aspect-video w-full rounded-xl object-cover"
          />
        )}

        <div className="mb-2 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{item.title}</h1>
          <StatusBadge status={item.status} />
        </div>

        <p className="mb-4 text-neutral-300">{item.description}</p>

        <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-500">Category</p>
            <p>{item.category}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-500">Last seen</p>
            <p>{item.lastSeenLocation}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-500">Posted</p>
            <p>{formatDate(item.createdAt)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-500">Owner</p>
            <CopyAddress address={item.owner.toBase58()} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-500">Reward</p>
            <RewardBadge lamports={item.rewardLamports} />
          </div>
        </div>
      </Card>

      {/* Owner: cancel an Open listing */}
      {isOwner && item.status === "open" && (
        <Card className="mb-6">
          <p className="mb-3 text-sm text-neutral-400">
            No claims yet. You can cancel this listing any time before someone
            submits a claim, and get the escrowed reward back.
          </p>
          <Button
            variant="destructive"
            disabled={cancelListing.isPending}
            onClick={() => cancelListing.mutate(item.publicKey.toBase58())}
          >
            Cancel Listing & Refund Reward
          </Button>
        </Card>
      )}

      {/* Non-owner: submit a recovery claim on an Open item */}
      {!isOwner && item.status === "open" && publicKey && (
        <Card>
          <h2 className="mb-3 text-lg font-semibold">Found this item?</h2>
          <form className="space-y-4" onSubmit={onSubmitClaim}>
            <div>
              <Label htmlFor="foundLocation">Where did you find it?</Label>
              <Input
                id="foundLocation"
                required
                maxLength={100}
                value={foundLocation}
                onChange={(e) => setFoundLocation(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="message">Message to the owner</Label>
              <Textarea
                id="message"
                maxLength={280}
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="foundImage">Photo of the found item (optional)</Label>
              <Input
                id="foundImage"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={submitClaim.isPending || uploading}
            >
              {uploading
                ? "Uploading photo..."
                : submitClaim.isPending
                ? "Submitting claim..."
                : "Submit Recovery Claim"}
            </Button>
          </form>
        </Card>
      )}

      {/* Owner: review a pending claim */}
      {isOwner && item.status === "claimSubmitted" && claim && (
        <ClaimReviewCard
          claim={claim}
          isBusy={approve.isPending || reject.isPending}
          onApprove={() =>
            approve.mutate({
              lostItemPda: item.publicKey.toBase58(),
              finder: claim.finder.toBase58(),
            })
          }
          onReject={() =>
            reject.mutate({
              lostItemPda: item.publicKey.toBase58(),
              finder: claim.finder.toBase58(),
            })
          }
        />
      )}

      {/* Non-owner finder: their claim is pending review */}
      {!isOwner && item.status === "claimSubmitted" && claim?.finder.toBase58() === publicKey?.toBase58() && (
        <Card>
          <p className="text-neutral-300">
            Your recovery claim is submitted and waiting for the owner to
            review it.
          </p>
        </Card>
      )}

      {/* Owner: confirm physical handoff to release the reward */}
      {isOwner && item.status === "readyForPickUp" && (
        <Card>
          <p className="mb-3 text-neutral-300">
            Claim approved. Once you've physically received the item back from{" "}
            <CopyAddress address={item.finder.toBase58()} />, confirm below to
            release the escrowed reward.
          </p>
          <Button
            disabled={confirmReceived.isPending}
            onClick={() =>
              confirmReceived.mutate({
                lostItemPda: item.publicKey.toBase58(),
                finder: item.finder.toBase58(),
              })
            }
          >
            Item Received — Release Reward
          </Button>
        </Card>
      )}

      {item.status === "completed" && (
        <Card>
          <p className="text-emerald-400">
            This item was returned and the reward was paid out to the finder.
          </p>
        </Card>
      )}

      {item.status === "cancelled" && (
        <Card>
          <p className="text-neutral-400">This listing was cancelled by the owner.</p>
        </Card>
      )}
    </div>
  );
}
