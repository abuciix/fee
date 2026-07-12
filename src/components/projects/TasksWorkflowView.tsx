"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui";
import { PROJECTS, TASKS, TASK_STATUS_META, type TaskStatus } from "@/lib/project-data";

const COLUMNS: TaskStatus[] = ["todo", "in_progress", "done"];

export default function TasksWorkflowView() {
  const [projectFilter, setProjectFilter] = useState("All");

  const filteredTasks = useMemo(
    () => TASKS.filter((t) => projectFilter === "All" || t.projectId === projectFilter),
    [projectFilter]
  );

  return (
    <div>
      <PageHeader
        icon="🏗"
        title="Tasks & Workflow"
        description="What the team is working on, across every active project."
      />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <select
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
          className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        >
          <option value="All">All projects</option>
          {PROJECTS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <div className="text-xs text-status-neutral">{filteredTasks.length} tasks</div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {COLUMNS.map((status) => {
          const tasks = filteredTasks.filter((t) => t.status === status);
          return (
            <div key={status} className="rounded-lg border border-border bg-surface-muted/40">
              <div className="flex items-center justify-between border-b border-border p-3">
                <h3 className="text-sm font-semibold text-brand-navy">
                  {TASK_STATUS_META[status].label}
                </h3>
                <span className="rounded-full bg-surface px-2 py-0.5 text-xs font-medium text-brand-navy">
                  {tasks.length}
                </span>
              </div>
              <ul className="space-y-2 p-2">
                {tasks.length === 0 && (
                  <li className="p-2 text-center text-xs text-status-neutral">No tasks here.</li>
                )}
                {tasks.map((task) => {
                  const project = PROJECTS.find((p) => p.id === task.projectId);
                  return (
                    <li key={task.id} className="rounded-md border border-border bg-surface p-3 shadow-sm">
                      <div className="text-sm text-brand-navy">{task.title}</div>
                      {project && (
                        <Link
                          href={`/projects/active/${project.id}`}
                          className="mt-1 inline-block text-xs text-brand-blue hover:underline"
                        >
                          {project.name}
                        </Link>
                      )}
                      <div className="mt-2 flex items-center justify-between text-xs text-status-neutral">
                        <span>{task.assignee}</span>
                        <span>
                          {new Date(task.dueDate).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
