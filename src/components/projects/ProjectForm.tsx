"use client";

import { useActionState } from "react";
import { Card } from "@/components/ui";
import { STAGES, type Project } from "@/lib/project-data";
import type { ProjectEditData } from "@/lib/project-queries";
import type { ClientOption } from "@/lib/client-queries";
import type { UserOption } from "@/lib/operations-queries";
import { createProject, updateProject, type ProjectFormState } from "@/app/actions/projects";

const STATUS_OPTIONS: { value: Project["status"]; label: string }[] = [
  { value: "on_track", label: "On track" },
  { value: "at_risk", label: "At risk" },
  { value: "delayed", label: "Delayed" },
];

export default function ProjectForm({
  project,
  clients,
  users,
}: {
  project?: ProjectEditData;
  clients: ClientOption[];
  users: UserOption[];
}) {
  const action = project ? updateProject.bind(null, project.id) : createProject;
  const [state, formAction, pending] = useActionState<ProjectFormState, FormData>(action, undefined);

  const clientId = project?.clientId ?? "";
  const leadArchitectId = project?.leadArchitectId ?? "";

  return (
    <Card className="max-w-2xl">
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-brand-navy">
            Project Name
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={project?.name}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="clientId" className="mb-1 block text-sm font-medium text-brand-navy">
              Client
            </label>
            <select
              id="clientId"
              name="clientId"
              defaultValue={clientId}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
            >
              <option value="">Unassigned</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.company}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="leadArchitectId" className="mb-1 block text-sm font-medium text-brand-navy">
              Lead Architect
            </label>
            <select
              id="leadArchitectId"
              name="leadArchitectId"
              defaultValue={leadArchitectId}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
            >
              <option value="">Unassigned</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} — {u.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="typology" className="mb-1 block text-sm font-medium text-brand-navy">
              Typology
            </label>
            <input
              id="typology"
              name="typology"
              required
              defaultValue={project?.typology}
              placeholder="e.g. Mixed-Use, Residential"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
            />
          </div>
          <div>
            <label htmlFor="location" className="mb-1 block text-sm font-medium text-brand-navy">
              Location
            </label>
            <input
              id="location"
              name="location"
              required
              defaultValue={project?.location}
              placeholder="e.g. Doha, QA"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="stage" className="mb-1 block text-sm font-medium text-brand-navy">
              Stage
            </label>
            <select
              id="stage"
              name="stage"
              defaultValue={project?.stage ?? STAGES[0]}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
            >
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="status" className="mb-1 block text-sm font-medium text-brand-navy">
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={project?.status ?? "on_track"}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="budget" className="mb-1 block text-sm font-medium text-brand-navy">
              Budget (USD)
            </label>
            <input
              id="budget"
              name="budget"
              type="number"
              min="0"
              step="1000"
              required
              defaultValue={project?.budget}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
            />
          </div>
          <div>
            <label htmlFor="budgetSpent" className="mb-1 block text-sm font-medium text-brand-navy">
              Budget Spent (USD)
            </label>
            <input
              id="budgetSpent"
              name="budgetSpent"
              type="number"
              min="0"
              step="1000"
              required
              defaultValue={project?.budgetSpent ?? 0}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="nextMilestone" className="mb-1 block text-sm font-medium text-brand-navy">
              Next Milestone
            </label>
            <input
              id="nextMilestone"
              name="nextMilestone"
              required
              defaultValue={project?.nextMilestone}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
            />
          </div>
          <div>
            <label htmlFor="dueDate" className="mb-1 block text-sm font-medium text-brand-navy">
              Due Date
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              required
              defaultValue={project?.dueDate}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        {state?.error && <p className="text-sm text-status-critical">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-navy disabled:opacity-60"
        >
          {pending ? "Saving…" : project ? "Save Changes" : "Create Project"}
        </button>
      </form>
    </Card>
  );
}
