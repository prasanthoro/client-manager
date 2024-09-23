import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

// utils.ts
export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
