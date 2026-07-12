import ContractsView from "@/components/clients/ContractsView";
import { getClients, getContracts } from "@/lib/client-queries";
import { getProjects } from "@/lib/project-queries";

export const metadata = { title: "Contracts" };

export default async function ContractsPage() {
  const [contracts, clients, projects] = await Promise.all([
    getContracts(),
    getClients(),
    getProjects(),
  ]);
  return <ContractsView contracts={contracts} clients={clients} projects={projects} />;
}
