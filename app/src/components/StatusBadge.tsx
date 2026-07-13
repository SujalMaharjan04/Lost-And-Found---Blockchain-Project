import { Badge } from "./ui/badge";
import type { ItemStatusKey } from "../types/models";

const STATUS_LABEL: Record<ItemStatusKey, string> = {
  open: "Open",
  claimSubmitted: "Claim Submitted",
  readyForPickup: "Ready for Pickup",
  completed: "Completed",
  cancelled: "Cancelled",
};

const STATUS_TONE: Record<ItemStatusKey, "neutral" | "success" | "warning" | "info" | "danger"> = {
  open: "success",
  claimSubmitted: "warning",
  readyForPickup: "info",
  completed: "neutral",
  cancelled: "danger",
};

export function StatusBadge({ status }: { status: ItemStatusKey }) {
  return <Badge tone={STATUS_TONE[status]}>{STATUS_LABEL[status]}</Badge>;
}
