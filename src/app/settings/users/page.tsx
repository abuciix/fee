import UsersPermissionsView from "@/components/settings/UsersPermissionsView";
import { getStudioUsers } from "@/lib/settings-queries";

export const metadata = { title: "Users & Permissions" };

export default async function UsersPermissionsPage() {
  const users = await getStudioUsers();
  return <UsersPermissionsView users={users} />;
}
