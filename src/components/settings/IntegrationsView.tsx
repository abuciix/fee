"use client";

import { useState } from "react";
import { PageHeader, Card, StatusPill } from "@/components/ui";
import type { Integration } from "@/lib/settings-data";

export default function IntegrationsView({
  integrations: initialIntegrations,
}: {
  integrations: Integration[];
}) {
  const [integrations, setIntegrations] = useState(initialIntegrations);

  function toggle(id: string) {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id ? { ...integration, connected: !integration.connected } : integration
      )
    );
  }

  const connectedCount = integrations.filter((i) => i.connected).length;

  return (
    <div>
      <PageHeader
        icon="⚙"
        title="Integrations"
        description="Connect the system to the other tools the studio uses."
      />

      <div className="mb-5 text-xs text-status-neutral">
        {connectedCount} of {integrations.length} connected
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-surface-muted text-xl">
                  <span aria-hidden>{integration.icon}</span>
                </div>
                <div>
                  <div className="font-medium text-brand-navy">{integration.name}</div>
                  <div className="text-xs text-status-neutral">{integration.category}</div>
                </div>
              </div>
              <StatusPill
                status={integration.connected ? "good" : "neutral"}
                label={integration.connected ? "Connected" : "Not connected"}
              />
            </div>

            <p className="mt-3 text-sm text-status-neutral">{integration.description}</p>

            <button
              type="button"
              onClick={() => toggle(integration.id)}
              className={`mt-4 w-full rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                integration.connected
                  ? "border border-border text-brand-navy hover:border-status-critical hover:text-status-critical"
                  : "bg-brand-blue text-white hover:bg-brand-navy"
              }`}
            >
              {integration.connected ? "Disconnect" : "Connect"}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
