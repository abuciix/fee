"use client";

import { useMemo, useState } from "react";
import { PageHeader, Card, StatusPill } from "@/components/ui";
import { LEAVE_REQUESTS, LEAVE_STATUS_META, type LeaveStatus, overlapsRange } from "@/lib/operations-data";

// Fixed "today" for this demo dataset, keeping the attendance overview consistent
// regardless of when the app is actually run.
const TODAY = "2026-07-12";
const WEEK_END = "2026-07-18";
const UPCOMING_END = "2026-08-11";

const STATUS_FILTERS: ("All" | LeaveStatus)[] = ["All", "pending", "approved", "denied"];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function AttendanceLeaveView() {
  const [statusFilter, setStatusFilter] = useState<"All" | LeaveStatus>("All");

  const onLeaveThisWeek = useMemo(
    () =>
      LEAVE_REQUESTS.filter(
        (l) => l.status === "approved" && overlapsRange(l.startDate, l.endDate, TODAY, WEEK_END)
      ),
    []
  );

  const upcomingLeave = useMemo(
    () =>
      LEAVE_REQUESTS.filter(
        (l) =>
          l.status === "approved" &&
          l.startDate > WEEK_END &&
          overlapsRange(l.startDate, l.endDate, TODAY, UPCOMING_END)
      ).sort((a, b) => a.startDate.localeCompare(b.startDate)),
    []
  );

  const filteredRequests = useMemo(
    () => (statusFilter === "All" ? LEAVE_REQUESTS : LEAVE_REQUESTS.filter((l) => l.status === statusFilter)),
    [statusFilter]
  );

  return (
    <div>
      <PageHeader
        icon="🏢"
        title="Attendance & Leave"
        description="Time tracking, leave requests, and approvals."
      />

      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="mb-3 text-sm font-semibold text-brand-navy">On Leave This Week</h3>
          {onLeaveThisWeek.length === 0 ? (
            <p className="text-sm text-status-neutral">No one is on approved leave this week.</p>
          ) : (
            <ul className="divide-y divide-border">
              {onLeaveThisWeek.map((l) => (
                <li key={l.id} className="flex items-center justify-between gap-3 py-2.5">
                  <div>
                    <div className="text-sm text-brand-navy">{l.name}</div>
                    <div className="text-xs text-status-neutral">{l.type}</div>
                  </div>
                  <div className="text-xs text-status-neutral">
                    {formatDate(l.startDate)} – {formatDate(l.endDate)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h3 className="mb-3 text-sm font-semibold text-brand-navy">Upcoming Leave</h3>
          {upcomingLeave.length === 0 ? (
            <p className="text-sm text-status-neutral">No approved leave scheduled in the next few weeks.</p>
          ) : (
            <ul className="divide-y divide-border">
              {upcomingLeave.map((l) => (
                <li key={l.id} className="flex items-center justify-between gap-3 py-2.5">
                  <div>
                    <div className="text-sm text-brand-navy">{l.name}</div>
                    <div className="text-xs text-status-neutral">{l.type}</div>
                  </div>
                  <div className="text-xs text-status-neutral">
                    {formatDate(l.startDate)} – {formatDate(l.endDate)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-brand-navy">Leave Requests</h3>
        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "All" | LeaveStatus)}
            className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
          >
            {STATUS_FILTERS.map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All statuses" : LEAVE_STATUS_META[s].label}
              </option>
            ))}
          </select>
          <div className="text-xs text-status-neutral">{filteredRequests.length} requests</div>
        </div>
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-status-neutral">
              <th className="px-4 py-3 font-medium">Team Member</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Dates</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredRequests.map((l) => {
              const meta = LEAVE_STATUS_META[l.status];
              return (
                <tr key={l.id}>
                  <td className="px-4 py-3 text-brand-navy">{l.name}</td>
                  <td className="px-4 py-3 text-status-neutral">{l.type}</td>
                  <td className="px-4 py-3 text-status-neutral">
                    {formatDate(l.startDate)} – {formatDate(l.endDate)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill status={meta.pill} label={meta.label} />
                  </td>
                  <td className="px-4 py-3 text-status-neutral">{l.notes ?? "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredRequests.length === 0 && (
          <div className="p-8 text-center text-sm text-status-neutral">No leave requests match this filter.</div>
        )}
      </Card>
    </div>
  );
}
