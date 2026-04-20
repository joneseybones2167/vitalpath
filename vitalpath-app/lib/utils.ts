import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn() — merge Tailwind classes with proper precedence.
 * Lets us do `cn("p-2", condition && "p-4")` safely.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
