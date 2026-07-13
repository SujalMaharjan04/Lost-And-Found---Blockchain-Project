import type { TextareaHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm",
        "placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-500",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
