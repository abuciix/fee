"use client";

import { useMemo, useState } from "react";
import { PageHeader, Card, StatusPill } from "@/components/ui";
import { USER_STATUS_META, ROLE_PERMISSIONS, type StudioUser, type UserRole } from "@/lib/settings-data";

const ROLES: ("All" | UserRole)[] = ["All", "Admin", "Architect", "Accountant", "Intern"];

export default function UsersPermissionsView({ users }: { users: StudioUser[] }) {
  const [role, setRole] = useState<"All" | UserRole>("All");

  const filtered = useMemo(
    () => users.filter((u) => role === "All" || u.role === role),
    [users, role]
  );

  return (
    <div>
      <PageHeader
        icon="⚙"
        title="Users & Permissions"
        description="Manage who has access to what."
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {ROLES.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              role === r
                ? "border-brand-blue bg-brand-blue text-white"
                : "border-border bg-surface text-status-neutral hover:border-brand-tan"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-status-neutral">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((user) => {
              const meta = USER_STATUS_META[user.status];
              return (
                <tr key={user.id}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-brand-navy">{user.name}</div>
                    <div className="text-xs text-status-neutral">{user.email}</div>
                  </td>
                  <td className="px-4 py-3 text-brand-navy">{user.role}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={meta.pill} label={meta.label} />
                  </td>
                  <td className="px-4 py-3 text-status-neutral">
                    {user.lastActive === "—"
                      ? "—"
                      : new Date(user.lastActive).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold text-brand-navy">Role Permissions</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(ROLE_PERMISSIONS) as UserRole[]).map((r) => (
            <Card key={r}>
              <div className="font-medium text-brand-navy">{r}</div>
              <ul className="mt-3 space-y-1.5">
                {ROLE_PERMISSIONS[r].map((permission) => (
                  <li key={permission} className="flex items-start gap-2 text-xs text-status-neutral">
                    <span className="mt-0.5 text-brand-tan">✓</span>
                    <span>{permission}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
