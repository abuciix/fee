import ResourcesAssetsView from "@/components/operations/ResourcesAssetsView";
import { getAssets } from "@/lib/operations-queries";

export const metadata = { title: "Resources & Assets" };

export default async function ResourcesAssetsPage() {
  const assets = await getAssets();
  return <ResourcesAssetsView assets={assets} />;
}
