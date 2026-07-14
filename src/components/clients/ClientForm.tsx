"use client";

import { useActionState } from "react";
import { Card } from "@/components/ui";
import type { Client, ClientStatus } from "@/lib/client-data";
import { createClient, updateClient, type ClientFormState } from "@/app/actions/clients";

const STATUS_OPTIONS: { value: ClientStatus; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "prospect", label: "Prospect" },
  { value: "past", label: "Past client" },
];

export default function ClientForm({ client }: { client?: Client }) {
  const action = client ? updateClient.bind(null, client.id) : createClient;
  const [state, formAction, pending] = useActionState<ClientFormState, FormData>(action, undefined);

  return (
    <Card className="max-w-2xl">
      <form action={formAction} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="company" className="mb-1 block text-sm font-medium text-brand-navy">
              Company
            </label>
            <input
              id="company"
              name="company"
              required
              defaultValue={client?.company}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
            />
          </div>
          <div>
            <label htmlFor="industry" className="mb-1 block text-sm font-medium text-brand-navy">
              Industry
            </label>
            <input
              id="industry"
              name="industry"
              required
              defaultValue={client?.industry}
              placeholder="e.g. Hospitality, Retail"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="status" className="mb-1 block text-sm font-medium text-brand-navy">
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={client?.status ?? "prospect"}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="location" className="mb-1 block text-sm font-medium text-brand-navy">
              Location
            </label>
            <input
              id="location"
              name="location"
              required
              defaultValue={client?.location}
              placeholder="e.g. Doha, QA"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <h3 className="mb-3 text-sm font-semibold text-brand-navy">Primary Contact</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contactName" className="mb-1 block text-sm font-medium text-brand-navy">
                Name
              </label>
              <input
                id="contactName"
                name="contactName"
                required
                defaultValue={client?.primaryContact.name}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
              />
            </div>
            <div>
              <label htmlFor="contactRole" className="mb-1 block text-sm font-medium text-brand-navy">
                Role
              </label>
              <input
                id="contactRole"
                name="contactRole"
                required
                defaultValue={client?.primaryContact.role}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
              />
            </div>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contactEmail" className="mb-1 block text-sm font-medium text-brand-navy">
                Email
              </label>
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                required
                defaultValue={client?.primaryContact.email}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
              />
            </div>
            <div>
              <label htmlFor="contactPhone" className="mb-1 block text-sm font-medium text-brand-navy">
                Phone
              </label>
              <input
                id="contactPhone"
                name="contactPhone"
                required
                defaultValue={client?.primaryContact.phone}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="lastInteraction" className="mb-1 block text-sm font-medium text-brand-navy">
            Last Interaction
          </label>
          <input
            id="lastInteraction"
            name="lastInteraction"
            type="date"
            required
            defaultValue={client?.lastInteraction ?? new Date().toISOString().slice(0, 10)}
            className="w-full max-w-xs rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
          />
        </div>

        {state?.error && <p className="text-sm text-status-critical">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-navy disabled:opacity-60"
        >
          {pending ? "Saving…" : client ? "Save Changes" : "Add Client"}
        </button>
      </form>
    </Card>
  );
}
