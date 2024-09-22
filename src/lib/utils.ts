import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatLog(message: string): string {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] ${message}`;
}
