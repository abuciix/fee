import TasksWorkflowView from "@/components/projects/TasksWorkflowView";
import { getProjects, getTasks } from "@/lib/project-queries";

export const metadata = { title: "Tasks & Workflow" };

export default async function TasksWorkflowPage() {
  const [projects, tasks] = await Promise.all([getProjects(), getTasks()]);
  return <TasksWorkflowView projects={projects} tasks={tasks} />;
}
