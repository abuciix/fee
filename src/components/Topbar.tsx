"use client";

import { usePathname } from "next/navigation";
import { findNavItemByHref } from "@/lib/navigation";

function currentTitle(pathname: string) {
  const exact = findNavItemByHref(pathname);
  if (exact) return { title: exact.label, parent: "parent" in exact ? exact.parent : undefined };
  if (pathname === "/") return { title: "Dashboard", parent: undefined };
  return { title: "Not Found", parent: undefined };
}

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const { title, parent } = currentTitle(pathname);

  return (
    <header className="flex h-16 items-center gap-3 border-b border-border bg-surface px-4 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-md p-2 text-brand-navy hover:bg-surface-muted lg:hidden"
        aria-label="Open navigation"
      >
        <span className="block text-xl leading-none">☰</span>
      </button>

      <div className="min-w-0 flex-1">
        <div className="truncate text-xs text-status-neutral">
          {parent ? `${parent.icon} ${parent.label}` : "Studio Management System"}
        </div>
        <h1 className="truncate text-lg font-semibold text-brand-navy">{title}</h1>
      </div>

      <div className="hidden items-center gap-2 sm:flex">
        <input
          type="search"
          placeholder="Search…"
          className="w-56 rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        />
      </div>

      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy text-sm font-semibold text-white">
        AA
      </div>
    </header>
  );
}
