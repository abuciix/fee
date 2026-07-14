"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/project-data";
import { PageHeader } from "@/components/ui";
import ProjectCard from "./ProjectCard";

export default function ActiveProjectsView({ projects }: { projects: Project[] }) {
  const [search, setSearch] = useState("");
  const [typology, setTypology] = useState("All");
  const [lead, setLead] = useState("All");

  const typologies = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.typology)))],
    [projects]
  );
  const leads = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.leadArchitect)))],
    [projects]
  );

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (typology !== "All" && p.typology !== typology) return false;
      if (lead !== "All" && p.leadArchitect !== lead) return false;
      if (search && !`${p.name} ${p.client}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [projects, search, typology, lead]);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <PageHeader
          icon="🏗"
          title="Active Projects"
          description="The live portfolio, grouped by phase, type, and lead architect."
        />
        <Link
          href="/projects/active/new"
          className="rounded-md bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-navy"
        >
          + New Project
        </Link>
      </div>

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
          {typologies.map((t) => (
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
          {leads.map((l) => (
            <option key={l} value={l}>
              {l === "All" ? "All leads" : l}
            </option>
          ))}
        </select>
        <div className="flex items-center text-xs text-status-neutral">
          {filtered.length} of {projects.length} projects
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
