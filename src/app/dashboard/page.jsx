import Card from "../components/ui/dashboard/card/card";
import Chart from "../components/ui/dashboard/chart/chart";
import styles from "../components/ui/dashboard/dashboard.module.css";
import Navbar from "../components/ui/dashboard/navbar/navbar";
import Users from "../components/ui/dashboard/userList/userList";

const getData = async (page, cat) => {
  const res = await fetch(
    `http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const Dashboard = async (page, cat) => {
  const { posts, count } = await getData(page, cat);
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <Navbar />
        <div className={styles.cards}>
          {posts?.map((item) => (
            <Card item={item} key={item.role} />
          ))}
        </div>
        <Users />
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
