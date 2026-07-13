import { useState } from "react";
import { toast } from "sonner";
import { shortenAddress } from "../lib/format";

export function CopyAddress({ address, chars = 4 }: { address: string; chars?: number }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    toast.success("Address copied");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-xs text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
      title={address}
    >
      {shortenAddress(address, chars)}
      <span aria-hidden>{copied ? "✓" : "⧉"}</span>
    </button>
  );
}
