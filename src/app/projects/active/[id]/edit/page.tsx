import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui";
import ProjectForm from "@/components/projects/ProjectForm";
import { getProjectForEdit } from "@/lib/project-queries";
import { getClientOptions } from "@/lib/client-queries";
import { getUserOptions } from "@/lib/operations-queries";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectForEdit(id);
  return { title: project ? `Edit ${project.name}` : "Project not found" };
}

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, clients, users] = await Promise.all([
    getProjectForEdit(id),
    getClientOptions(),
    getUserOptions(),
  ]);
  if (!project) notFound();

  return (
    <div>
      <Link href={`/projects/active/${id}`} className="mb-4 inline-block text-sm text-brand-blue hover:underline">
        ← {project.name}
      </Link>
      <PageHeader icon="🏗" title={`Edit ${project.name}`} description="Update this project's details." />
      <ProjectForm project={project} clients={clients} users={users} />
    </div>
  );
}
