import Link from "next/link";
import { PageHeader } from "@/components/ui";
import ClientForm from "@/components/clients/ClientForm";

export const metadata = { title: "New Client" };

export default function NewClientPage() {
  return (
    <div>
      <Link href="/clients/crm" className="mb-4 inline-block text-sm text-brand-blue hover:underline">
        ← Client CRM
      </Link>
      <PageHeader icon="🤝" title="New Client" description="Add a new client to the CRM." />
      <ClientForm />
    </div>
  );
}
