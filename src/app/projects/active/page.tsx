import ActiveProjectsView from "@/components/projects/ActiveProjectsView";
import { getProjects } from "@/lib/project-queries";

export const metadata = { title: "Active Projects" };

export default async function ActiveProjectsPage() {
  const projects = await getProjects();
  return <ActiveProjectsView projects={projects} />;
}
