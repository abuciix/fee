"use client";

import { useState } from "react";
import { PageHeader, Card } from "@/components/ui";
import type { AutomationRule } from "@/lib/tools-data";

export default function AutomationView({ rules: initialRules }: { rules: AutomationRule[] }) {
  const [rules, setRules] = useState(initialRules);

  function toggleRule(id: string) {
    setRules((prev) =>
      prev.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule))
    );
  }

  const activeCount = rules.filter((r) => r.enabled).length;

  return (
    <div>
      <PageHeader
        icon="⚡"
        title="Automation"
        description="Automated workflows that remove repetitive studio tasks."
      />

      <div className="mb-5 text-xs text-status-neutral">
        {activeCount} of {rules.length} rules active
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {rules.map((rule) => (
          <Card key={rule.id}>
            <div className="flex items-start justify-between gap-3">
              <div className="font-medium text-brand-navy">{rule.name}</div>
              <button
                type="button"
                role="switch"
                aria-checked={rule.enabled}
                onClick={() => toggleRule(rule.id)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  rule.enabled ? "bg-brand-blue" : "bg-surface-muted"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    rule.enabled ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            <p className="mt-2 text-sm text-status-neutral">{rule.description}</p>

            <dl className="mt-4 space-y-2 border-t border-border pt-3 text-xs">
              <div className="flex justify-between gap-3">
                <dt className="shrink-0 font-medium uppercase tracking-wide text-status-neutral">
                  Trigger
                </dt>
                <dd className="text-right text-brand-navy">{rule.trigger}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="shrink-0 font-medium uppercase tracking-wide text-status-neutral">
                  Action
                </dt>
                <dd className="text-right text-brand-navy">{rule.action}</dd>
              </div>
            </dl>
          </Card>
        ))}
      </div>
    </div>
  );
}
