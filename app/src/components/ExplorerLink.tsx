import { explorerUrl } from "../lib/format";

export function ExplorerLink({
  value,
  kind = "tx",
  children = "View on Explorer",
}: {
  value: string;
  kind?: "tx" | "address";
  children?: React.ReactNode;
}) {
  return (
    <a
      href={explorerUrl(value, kind)}
      target="_blank"
      rel="noreferrer"
      className="text-xs font-medium text-brand-500 hover:underline"
    >
      {children}
    </a>
  );
}
