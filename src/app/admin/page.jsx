import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Sidebar from "../components/sidebar/sidebar";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <Sidebar/>
      {JSON.stringify(session)}
    </div>
  );
};

export default AdminPage;