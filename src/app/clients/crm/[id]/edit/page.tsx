import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui";
import ClientForm from "@/components/clients/ClientForm";
import { getClientById } from "@/lib/client-queries";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClientById(id);
  return { title: client ? `Edit ${client.company}` : "Client not found" };
}

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClientById(id);
  if (!client) notFound();

  return (
    <div>
      <Link href={`/clients/crm/${id}`} className="mb-4 inline-block text-sm text-brand-blue hover:underline">
        ← {client.company}
      </Link>
      <PageHeader icon="🤝" title={`Edit ${client.company}`} description="Update this client's details." />
      <ClientForm client={client} />
    </div>
  );
}
