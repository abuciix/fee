"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation } from "@/lib/navigation";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const section of navigation) {
      initial[section.label] = isActive(pathname, section.href);
    }
    return initial;
  });

  function toggle(label: string) {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
  }

  return (
    <nav className="flex h-full w-full flex-col bg-brand-navy text-white">
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-tan text-sm font-bold text-brand-navy">
          A
        </div>
        <div>
          <div className="text-sm font-semibold leading-tight">Andalus Studio</div>
          <div className="text-xs leading-tight text-brand-tan">Management System</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-3">
        <ul className="space-y-0.5">
          {navigation.map((section) => {
            const active = isActive(pathname, section.href);
            const hasChildren = !!section.children?.length;
            const open = openSections[section.label] ?? active;

            return (
              <li key={section.label}>
                <div
                  className={`flex items-center rounded-md text-sm transition-colors ${
                    active && !hasChildren
                      ? "bg-brand-tan text-brand-navy font-semibold"
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  <Link
                    href={section.href}
                    onClick={onNavigate}
                    className="flex flex-1 items-center gap-2.5 px-3 py-2"
                  >
                    <span className="text-base leading-none">{section.icon}</span>
                    <span>{section.label}</span>
                  </Link>
                  {hasChildren && (
                    <button
                      type="button"
                      aria-label={open ? `Collapse ${section.label}` : `Expand ${section.label}`}
                      aria-expanded={open}
                      onClick={() => toggle(section.label)}
                      className="px-2 py-2 text-white/60 hover:text-white"
                    >
                      <span
                        className={`inline-block text-xs transition-transform ${open ? "rotate-90" : ""}`}
                      >
                        ▶
                      </span>
                    </button>
                  )}
                </div>

                {hasChildren && open && (
                  <ul className="mt-0.5 mb-1 space-y-0.5 border-l border-white/10 pl-4">
                    {section.children!.map((child) => {
                      const childActive = isActive(pathname, child.href);
                      return (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onNavigate}
                            className={`block rounded-md px-3 py-1.5 text-[13px] transition-colors ${
                              childActive
                                ? "bg-brand-tan text-brand-navy font-semibold"
                                : "text-white/75 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-white/10 px-4 py-3 text-xs text-white/50">
        <a
          href="https://www.behance.net/gallery/183000731/Andalus-Architecture-Brand-Identity"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-brand-tan"
        >
          Brand Guidelines ↗
        </a>
      </div>
    </nav>
  );
}
