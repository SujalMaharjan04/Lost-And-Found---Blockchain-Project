import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { CopyAddress } from "./CopyAddress";
import type { RecoveryClaimModel } from "../types/models";
import { formatDate } from "../lib/format";

export function ClaimReviewCard({
  claim,
  onApprove,
  onReject,
  isBusy,
}: {
  claim: RecoveryClaimModel;
  onApprove: () => void;
  onReject: () => void;
  isBusy?: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recovery Claim</CardTitle>
        <CopyAddress address={claim.finder.toBase58()} />
      </CardHeader>

      <CardContent className="space-y-3">
        {claim.imageUrl && (
          <img
            src={claim.imageUrl}
            alt="Found item"
            className="aspect-video w-full rounded-xl object-cover"
          />
        )}
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-500">Found location</p>
          <p>{claim.foundLocation}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-500">Message from finder</p>
          <p>{claim.message || "—"}</p>
        </div>
        <p className="text-xs text-neutral-500">Submitted {formatDate(claim.createdAt)}</p>
      </CardContent>

      <CardFooter>
        <Button variant="outline" onClick={onReject} disabled={isBusy}>
          Reject
        </Button>
        <Button onClick={onApprove} disabled={isBusy}>
          Approve Claim
        </Button>
      </CardFooter>
    </Card>
  );
}
