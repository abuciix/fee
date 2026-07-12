"use client";

import { useState } from "react";
import { PageHeader, Card } from "@/components/ui";
import { COMPANY_PROFILE } from "@/lib/settings-data";

export default function CompanyProfileView() {
  const [profile, setProfile] = useState(COMPANY_PROFILE);
  const [saved, setSaved] = useState(false);

  function update<K extends keyof typeof profile>(key: K, value: (typeof profile)[K]) {
    setProfile((prev) => ({ ...prev, [key]: value }));
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
        title="Company Profile"
        description="The studio's core details, branding, and contact information."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,220px)_1fr]">
        <Card className="flex flex-col items-center text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-navy text-3xl font-semibold text-white">
            {profile.studioName
              .split(" ")
              .map((word) => word[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div className="mt-3 text-sm font-medium text-brand-navy">{profile.studioName}</div>
          <p className="mt-1 text-xs text-status-neutral">Logo placeholder — upload not wired up.</p>
          <button
            type="button"
            className="mt-3 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-brand-navy transition-colors hover:border-brand-tan"
          >
            Upload logo
          </button>
          <a
            href={profile.brandGuidelinesUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 text-xs text-brand-blue hover:underline"
          >
            View Brand Guidelines ↗
          </a>
        </Card>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Studio Name" value={profile.studioName} onChange={(v) => update("studioName", v)} />
              <Field label="Legal Entity" value={profile.legalEntity} onChange={(v) => update("legalEntity", v)} />
            </div>

            <Field label="Address" value={profile.address} onChange={(v) => update("address", v)} />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="City" value={profile.city} onChange={(v) => update("city", v)} />
              <Field label="Country" value={profile.country} onChange={(v) => update("country", v)} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Phone" value={profile.phone} onChange={(v) => update("phone", v)} />
              <Field label="Email" value={profile.email} onChange={(v) => update("email", v)} type="email" />
            </div>

            <Field label="Website" value={profile.website} onChange={(v) => update("website", v)} />

            <div>
              <label htmlFor="brandUrl" className="mb-1 block text-sm font-medium text-brand-navy">
                Brand Guidelines Link
              </label>
              <input
                id="brandUrl"
                type="url"
                value={profile.brandGuidelinesUrl}
                onChange={(e) => update("brandGuidelinesUrl", e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="rounded-md bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-navy"
              >
                Save Changes
              </button>
              {saved && <span className="text-xs text-status-good">Saved (not persisted — demo only)</span>}
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-brand-navy">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
      />
    </div>
  );
}
