// pages/dashboard.js
import Card from "../../components/ui/dashboard/card/card";
import Chart from "../../components/ui/dashboard/chart/chart";
import styles from "../../components/ui/dashboard/dashboard.module.css";
import Navbar from "../../components/ui/dashboard/navbar/navbar";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  const dashboardContent = await prisma.post.findMany({
    take: 4,
    orderBy: {
      views: "desc",
    },
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <Navbar />
        {/*{JSON.stringify(session)}*/}
        <h1>Welcome {session?.user?.role} to Kaltimfolks Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;