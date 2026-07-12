import InternshipRosterView from "@/components/operations/InternshipRosterView";
import { getInterns } from "@/lib/operations-queries";

export const metadata = { title: "Internship Management" };

export default async function InternshipManagementPage() {
  const interns = await getInterns();
  return <InternshipRosterView interns={interns} />;
}
