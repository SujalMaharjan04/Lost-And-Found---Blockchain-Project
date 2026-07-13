import { Badge } from "./ui/badge";
import { formatSol } from "../lib/format";

export function RewardBadge({ lamports }: { lamports: bigint }) {
  return <Badge tone="info">{formatSol(lamports)} reward</Badge>;
}
