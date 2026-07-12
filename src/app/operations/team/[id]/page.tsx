import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, StatusPill } from "@/components/ui";
import { getUtilizationMeta } from "@/lib/operations-data";
import { getTeamMemberById, getTeamMembers } from "@/lib/operations-queries";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await getTeamMemberById(id);
  return { title: member?.name ?? "Team member not found" };
}

export default async function TeamMemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await getTeamMemberById(id);
  if (!member) notFound();

  const meta = getUtilizationMeta(member.utilization);
  const allMembers = await getTeamMembers();
  const peers = allMembers.filter((m) => m.discipline === member.discipline && m.id !== member.id);

  return (
    <div>
      <Link href="/operations/team" className="mb-4 inline-block text-sm text-brand-blue hover:underline">
        ← Team Management
      </Link>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-brand-navy">{member.name}</h2>
          <p className="mt-1 text-sm text-status-neutral">
            {member.role} · {member.discipline} · {member.location}
          </p>
        </div>
        <StatusPill status={meta.pill} label={meta.label} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <h3 className="mb-3 text-sm font-semibold text-brand-navy">Contact & Details</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-status-neutral">Email</dt>
              <dd className="text-brand-navy">{member.email}</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-status-neutral">Phone</dt>
              <dd className="text-brand-navy">{member.phone}</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-status-neutral">Location</dt>
              <dd className="text-brand-navy">{member.location}</dd>
            </div>
            <div className="flex justify-between pb-2">
              <dt className="text-status-neutral">Joined</dt>
              <dd className="text-brand-navy">
                {new Date(member.joinDate).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </dd>
            </div>
          </dl>

          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs text-status-neutral">
              <span>Utilization</span>
              <span>{member.utilization}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-muted">
              <div
                className={`h-full rounded-full ${meta.band === "high" ? "bg-status-warning" : "bg-brand-blue"}`}
                style={{ width: `${Math.min(member.utilization, 100)}%` }}
              />
            </div>
          </div>

          {peers.length > 0 && (
            <div className="mt-5">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-status-neutral">
                Other {member.discipline}
              </h4>
              <ul className="space-y-1">
                {peers.map((peer) => (
                  <li key={peer.id}>
                    <Link href={`/operations/team/${peer.id}`} className="text-sm text-brand-blue hover:underline">
                      {peer.name} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="mb-3 text-sm font-semibold text-brand-navy">Active Projects</h3>
          {member.activeProjects.length === 0 ? (
            <p className="text-sm text-status-neutral">No active project assignments right now.</p>
          ) : (
            <ul className="divide-y divide-border">
              {member.activeProjects.map((project) => (
                <li key={project} className="flex items-center justify-between gap-3 py-2.5">
                  <div className="text-sm text-brand-navy">{project}</div>
                  <Link href="/projects/active" className="text-xs text-brand-blue hover:underline">
                    View in Projects →
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
