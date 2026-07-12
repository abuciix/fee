import TemplatesView from "@/components/tools/TemplatesView";
import { getTemplates } from "@/lib/tools-queries";

export const metadata = { title: "Templates" };

export default async function TemplatesPage() {
  const templates = await getTemplates();
  return <TemplatesView templates={templates} />;
}
