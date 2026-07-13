import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type Tone = "neutral" | "success" | "warning" | "info" | "danger";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-neutral-800 text-neutral-300",
  success: "bg-emerald-500/15 text-emerald-400",
  warning: "bg-amber-500/15 text-amber-400",
  info: "bg-sky-500/15 text-sky-400",
  danger: "bg-red-500/15 text-red-400",
};

export function Badge({
  className,
  tone = "neutral",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        toneClasses[tone],
        className
      )}
      {...props}
    />
  );
}
