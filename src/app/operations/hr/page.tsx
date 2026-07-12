import HrRecruitmentView from "@/components/operations/HrRecruitmentView";
import { getCandidates, getOpenRoles } from "@/lib/operations-queries";

export const metadata = { title: "HR & Recruitment" };

export default async function HrRecruitmentPage() {
  const [roles, candidates] = await Promise.all([getOpenRoles(), getCandidates()]);
  return <HrRecruitmentView roles={roles} candidates={candidates} />;
}
