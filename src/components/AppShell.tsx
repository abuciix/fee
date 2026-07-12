"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  title: string;
  systemRole: string;
} | null;

export default function AppShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: CurrentUser;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-full min-h-screen">
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="fixed h-screen w-64">
          <Sidebar />
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative h-full w-64">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar onMenuClick={() => setMobileOpen(true)} user={user} />
        <main className="flex-1 bg-background p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
