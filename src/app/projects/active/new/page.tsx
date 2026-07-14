import Link from "next/link";
import { PageHeader } from "@/components/ui";
import ProjectForm from "@/components/projects/ProjectForm";
import { getClientOptions } from "@/lib/client-queries";
import { getUserOptions } from "@/lib/operations-queries";

export const metadata = { title: "New Project" };

export default async function NewProjectPage() {
  const [clients, users] = await Promise.all([getClientOptions(), getUserOptions()]);

  return (
    <div>
      <Link href="/projects/active" className="mb-4 inline-block text-sm text-brand-blue hover:underline">
        ← Active Projects
      </Link>
      <PageHeader icon="🏗" title="New Project" description="Add a new project to the portfolio." />
      <ProjectForm clients={clients} users={users} />
    </div>
  );
}
