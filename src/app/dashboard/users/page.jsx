"use server";
import { fetchUsers } from "../../../lib/dashboardData";
import UserUi from "./userClient";
const userDashboard = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, users } = await fetchUsers(q, page);

  return <UserUi users={users} count={count} />;
};

export default userDashboard;
