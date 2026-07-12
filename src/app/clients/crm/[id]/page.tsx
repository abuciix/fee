import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, StatusPill } from "@/components/ui";
import { CLIENT_STATUS_META, CONTRACT_STATUS_META, PROPOSAL_STATUS_META } from "@/lib/client-data";
import { getClientById, getClientContracts, getClientProposals } from "@/lib/client-queries";
import { getProjects } from "@/lib/project-queries";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClientById(id);
  return { title: client?.company ?? "Client not found" };
}

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClientById(id);
  if (!client) notFound();

  const [proposals, contracts, projects] = await Promise.all([
    getClientProposals(id),
    getClientContracts(id),
    getProjects(),
  ]);
  const linkedProjects = projects.filter((p) => client.linkedProjectIds.includes(p.id));
  const meta = CLIENT_STATUS_META[client.status];

  return (
    <div>
      <Link href="/clients/crm" className="mb-4 inline-block text-sm text-brand-blue hover:underline">
        ← Client CRM
      </Link>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-brand-navy">{client.company}</h2>
          <p className="mt-1 text-sm text-status-neutral">
            {client.industry} · {client.location}
          </p>
        </div>
        <StatusPill status={meta.pill} label={meta.label} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <h3 className="mb-3 text-sm font-semibold text-brand-navy">Primary Contact</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-status-neutral">Name</dt>
              <dd className="text-brand-navy">{client.primaryContact.name}</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-status-neutral">Role</dt>
              <dd className="text-brand-navy">{client.primaryContact.role}</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-status-neutral">Email</dt>
              <dd className="text-brand-navy">{client.primaryContact.email}</dd>
            </div>
            <div className="flex justify-between pb-2">
              <dt className="text-status-neutral">Phone</dt>
              <dd className="text-brand-navy">{client.primaryContact.phone}</dd>
            </div>
          </dl>

          <div className="mt-5">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-status-neutral">
              Linked Projects
            </h4>
            {linkedProjects.length === 0 ? (
              <p className="text-sm text-status-neutral">No projects linked yet.</p>
            ) : (
              <ul className="space-y-1">
                {linkedProjects.map((project) => (
                  <li key={project.id}>
                    <Link
                      href={`/projects/active/${project.id}`}
                      className="text-sm text-brand-blue hover:underline"
                    >
                      {project.name} →
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-5">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-status-neutral">
              Last Interaction
            </h4>
            <p className="text-sm text-brand-navy">
              {new Date(client.lastInteraction).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </Card>

        <div className="space-y-4 lg:col-span-2">
          <Card>
            <h3 className="mb-3 text-sm font-semibold text-brand-navy">Notes</h3>
            {client.notes.length === 0 ? (
              <p className="text-sm text-status-neutral">No notes logged for this client yet.</p>
            ) : (
              <ul className="space-y-3">
                {client.notes.map((note, idx) => (
                  <li key={idx} className="border-b border-border pb-3 last:border-b-0 last:pb-0">
                    <p className="text-sm text-brand-navy">{note.note}</p>
                    <p className="mt-1 text-xs text-status-neutral">
                      {note.author} ·{" "}
                      {new Date(note.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card>
            <h3 className="mb-3 text-sm font-semibold text-brand-navy">Proposals</h3>
            {proposals.length === 0 ? (
              <p className="text-sm text-status-neutral">No proposals on file for this client.</p>
            ) : (
              <ul className="divide-y divide-border">
                {proposals.map((proposal) => {
                  const pMeta = PROPOSAL_STATUS_META[proposal.status];
                  return (
                    <li key={proposal.id} className="flex items-center justify-between gap-3 py-2.5">
                      <div>
                        <div className="text-sm text-brand-navy">{proposal.title}</div>
                        <div className="text-xs text-status-neutral">
                          ${proposal.value.toLocaleString()}
                        </div>
                      </div>
                      <StatusPill status={pMeta.pill} label={pMeta.label} />
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>

          <Card>
            <h3 className="mb-3 text-sm font-semibold text-brand-navy">Contracts</h3>
            {contracts.length === 0 ? (
              <p className="text-sm text-status-neutral">No contracts on file for this client.</p>
            ) : (
              <ul className="divide-y divide-border">
                {contracts.map((contract) => {
                  const cMeta = CONTRACT_STATUS_META[contract.status];
                  return (
                    <li key={contract.id} className="flex items-center justify-between gap-3 py-2.5">
                      <div>
                        <div className="text-sm text-brand-navy">{contract.title}</div>
                        <div className="text-xs text-status-neutral">
                          ${contract.value.toLocaleString()}
                        </div>
                      </div>
                      <StatusPill status={cMeta.pill} label={cMeta.label} />
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
