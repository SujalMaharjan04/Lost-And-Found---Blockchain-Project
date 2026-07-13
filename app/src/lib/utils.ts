import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Standard shadcn/ui helper: merges Tailwind classes while resolving conflicts.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
