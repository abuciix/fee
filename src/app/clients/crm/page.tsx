import ClientCrmView from "@/components/clients/ClientCrmView";
import { getClients } from "@/lib/client-queries";

export const metadata = { title: "Client CRM" };

export default async function ClientCrmPage() {
  const clients = await getClients();
  return <ClientCrmView clients={clients} />;
}
