import ProposalsView from "@/components/clients/ProposalsView";
import { getClients, getProposals } from "@/lib/client-queries";

export const metadata = { title: "Proposals" };

export default async function ProposalsPage() {
  const [proposals, clients] = await Promise.all([getProposals(), getClients()]);
  return <ProposalsView proposals={proposals} clients={clients} />;
}
