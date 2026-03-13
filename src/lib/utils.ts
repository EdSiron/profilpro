import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ── Tailwind class merger ──────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Generate unique ID ─────────────────────────────────
export function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// ── Format date from YYYY-MM to "Jan 2024" ─────────────
export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

// ── Capitalize first letter ────────────────────────────
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── Check if resume section is filled ─────────────────
export function isSectionComplete(data: unknown): boolean {
  if (!data) return false;
  if (typeof data === "string") return data.trim().length > 0;
  if (Array.isArray(data)) return data.length > 0;
  if (typeof data === "object") {
    return Object.values(data as Record<string, unknown>).some(
      (v) => v !== "" && v !== null && v !== undefined,
    );
  }
  return false;
}
