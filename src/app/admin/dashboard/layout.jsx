import Sidebar from "../../components/ui/dashboard/sidebar/sidebar";
import styles from "../../components/ui/dashboard/dashboard.module.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
//import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const Layout = async ({ children }) => {

  const session = await getServerSession(authOptions);
  if (session?.user.role !== 'ADMIN') {
    return (
      <div className={styles.containerunauthorized}>
        <h1 className={styles.logo}>Access Denied!</h1> 
        <p className={styles.desc}>You do not have the necessary permissions to access this page.</p>
        <Link className={styles.link} href="/">Back to Homepage</Link>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Layout;
