"use client";

import { useMemo, useState } from "react";
import { PROJECTS } from "@/lib/project-data";
import { PageHeader } from "@/components/ui";
import ProjectCard from "./ProjectCard";

const TYPOLOGIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.typology)))];
const LEADS = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.leadArchitect)))];

export default function ActiveProjectsView() {
  const [search, setSearch] = useState("");
  const [typology, setTypology] = useState("All");
  const [lead, setLead] = useState("All");

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      if (typology !== "All" && p.typology !== typology) return false;
      if (lead !== "All" && p.leadArchitect !== lead) return false;
      if (search && !`${p.name} ${p.client}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, typology, lead]);

  return (
    <div>
      <PageHeader
        icon="🏗"
        title="Active Projects"
        description="The live portfolio, grouped by phase, type, and lead architect."
      />

      <div className="mb-5 flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search projects or clients…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-56 rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        />
        <select
          value={typology}
          onChange={(e) => setTypology(e.target.value)}
          className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        >
          {TYPOLOGIES.map((t) => (
            <option key={t} value={t}>
              {t === "All" ? "All typologies" : t}
            </option>
          ))}
        </select>
        <select
          value={lead}
          onChange={(e) => setLead(e.target.value)}
          className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        >
          {LEADS.map((l) => (
            <option key={l} value={l}>
              {l === "All" ? "All leads" : l}
            </option>
          ))}
        </select>
        <div className="flex items-center text-xs text-status-neutral">
          {filtered.length} of {PROJECTS.length} projects
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-surface p-8 text-center text-sm text-status-neutral">
          No projects match these filters.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
