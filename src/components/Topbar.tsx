"use client";

import { usePathname } from "next/navigation";
import { findNavItemByHref } from "@/lib/navigation";

function humanize(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function currentTitle(pathname: string): { title: string; breadcrumb: string } {
  if (pathname === "/") return { title: "Dashboard", breadcrumb: "Studio Management System" };

  const exact = findNavItemByHref(pathname);
  if (exact) {
    const parent = "parent" in exact ? exact.parent : undefined;
    return {
      title: exact.label,
      breadcrumb: parent ? `${parent.icon} ${parent.label}` : "Studio Management System",
    };
  }

  // No exact nav entry (e.g. a dynamic detail page) — fall back to the
  // nearest matching ancestor for the breadcrumb and humanize the rest.
  const segments = pathname.split("/").filter(Boolean);
  for (let i = segments.length - 1; i > 0; i--) {
    const ancestor = findNavItemByHref(`/${segments.slice(0, i).join("/")}`);
    if (ancestor) {
      const ancestorParent = "parent" in ancestor ? ancestor.parent : undefined;
      const icon = ancestorParent ? ancestorParent.icon : "icon" in ancestor ? ancestor.icon : "";
      return {
        title: humanize(segments[segments.length - 1]),
        breadcrumb: `${icon} ${ancestor.label}`.trim(),
      };
    }
  }

  return { title: "Not Found", breadcrumb: "Studio Management System" };
}

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const { title, breadcrumb } = currentTitle(pathname);

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
        <div className="truncate text-xs text-status-neutral">{breadcrumb}</div>
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
