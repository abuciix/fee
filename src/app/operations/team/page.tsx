import TeamDirectoryView from "@/components/operations/TeamDirectoryView";
import { getTeamMembers } from "@/lib/operations-queries";

export const metadata = { title: "Team Management" };

export default async function TeamManagementPage() {
  const members = await getTeamMembers();
  return <TeamDirectoryView members={members} />;
}
