import AttendanceLeaveView from "@/components/operations/AttendanceLeaveView";
import { getLeaveRequests } from "@/lib/operations-queries";

export const metadata = { title: "Attendance & Leave" };

export default async function AttendanceLeavePage() {
  const leaveRequests = await getLeaveRequests();
  return <AttendanceLeaveView leaveRequests={leaveRequests} />;
}
