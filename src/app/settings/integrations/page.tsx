import IntegrationsView from "@/components/settings/IntegrationsView";
import { getIntegrations } from "@/lib/settings-queries";

export const metadata = { title: "Integrations" };

export default async function IntegrationsPage() {
  const integrations = await getIntegrations();
  return <IntegrationsView integrations={integrations} />;
}
