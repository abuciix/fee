import AutomationView from "@/components/tools/AutomationView";
import { getAutomationRules } from "@/lib/tools-queries";

export const metadata = { title: "Automation" };

export default async function AutomationPage() {
  const rules = await getAutomationRules();
  return <AutomationView rules={rules} />;
}
