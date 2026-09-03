import {clsx, type ClassValue} from "clsx";

export function cn(...values: ClassValue[]) {
  return clsx(values);
}

export function normalizePhoneNumber(input: string): string {
  return input.replace(/[^\d]/g, "");
}
