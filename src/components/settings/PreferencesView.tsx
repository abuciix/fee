"use client";

import { useState } from "react";
import { PageHeader, Card } from "@/components/ui";
import {
  DEFAULT_PREFERENCES,
  type CurrencyOption,
  type DateFormatOption,
  type ThemeOption,
  type UnitOption,
} from "@/lib/settings-data";

const THEME_OPTIONS: ThemeOption[] = ["Light", "Dark", "System"];
const DATE_FORMAT_OPTIONS: DateFormatOption[] = ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"];
const CURRENCY_OPTIONS: CurrencyOption[] = ["USD", "EUR", "QAR", "AED", "SAR"];
const UNIT_OPTIONS: UnitOption[] = ["Metric", "Imperial"];

const NOTIFICATION_FIELDS: {
  key: "notifyTaskAssigned" | "notifyInvoiceOverdue" | "notifyProjectMilestone" | "notifyWeeklyDigest";
  label: string;
  description: string;
}[] = [
  {
    key: "notifyTaskAssigned",
    label: "Task assigned to me",
    description: "Notify when a new task is assigned to you.",
  },
  {
    key: "notifyInvoiceOverdue",
    label: "Invoice overdue",
    description: "Notify when a client invoice passes its due date.",
  },
  {
    key: "notifyProjectMilestone",
    label: "Project milestone reached",
    description: "Notify when a project hits a stage gate or milestone.",
  },
  {
    key: "notifyWeeklyDigest",
    label: "Weekly digest email",
    description: "Receive a weekly summary of studio activity by email.",
  },
];

export default function PreferencesView() {
  const [prefs, setPrefs] = useState(DEFAULT_PREFERENCES);
  const [saved, setSaved] = useState(false);

  function update<K extends keyof typeof prefs>(key: K, value: (typeof prefs)[K]) {
    setPrefs((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
  }

  return (
    <div>
      <PageHeader
        icon="⚙"
        title="System Preferences"
        description="General preferences for how the system behaves."
      />

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="mb-4 text-sm font-semibold text-brand-navy">Display</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="theme" className="mb-1 block text-sm font-medium text-brand-navy">
                Theme
              </label>
              <select
                id="theme"
                value={prefs.theme}
                onChange={(e) => update("theme", e.target.value as ThemeOption)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
              >
                {THEME_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="dateFormat" className="mb-1 block text-sm font-medium text-brand-navy">
                Date Format
              </label>
              <select
                id="dateFormat"
                value={prefs.dateFormat}
                onChange={(e) => update("dateFormat", e.target.value as DateFormatOption)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
              >
                {DATE_FORMAT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="currency" className="mb-1 block text-sm font-medium text-brand-navy">
                Currency
              </label>
              <select
                id="currency"
                value={prefs.currency}
                onChange={(e) => update("currency", e.target.value as CurrencyOption)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
              >
                {CURRENCY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="units" className="mb-1 block text-sm font-medium text-brand-navy">
                Unit System
              </label>
              <select
                id="units"
                value={prefs.units}
                onChange={(e) => update("units", e.target.value as UnitOption)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
              >
                {UNIT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 text-sm font-semibold text-brand-navy">Notifications</h3>
          <div className="space-y-4">
            {NOTIFICATION_FIELDS.map((field) => (
              <div key={field.key} className="flex items-start justify-between gap-3 border-b border-border pb-4 last:border-b-0 last:pb-0">
                <div>
                  <div className="text-sm font-medium text-brand-navy">{field.label}</div>
                  <p className="mt-0.5 text-xs text-status-neutral">{field.description}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={prefs[field.key]}
                  onClick={() => update(field.key, !prefs[field.key])}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    prefs[field.key] ? "bg-brand-blue" : "bg-surface-muted"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      prefs[field.key] ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex items-center gap-3 lg:col-span-2">
          <button
            type="submit"
            className="rounded-md bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-navy"
          >
            Save Preferences
          </button>
          {saved && <span className="text-xs text-status-good">Saved (not persisted — demo only)</span>}
        </div>
      </form>
    </div>
  );
}
