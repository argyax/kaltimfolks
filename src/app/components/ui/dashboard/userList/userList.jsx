import Image from "next/image";
import styles from "./userList.module.css";

const getData = async (page) => {
  const res = await fetch(`http://localhost:3000/api/users?page=${page}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const Users = async ({ page }) => {
  const { users } = await getData(page);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Users</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Status</td>
            <td>Created At</td>
            <td>Posts</td>
          </tr>
        </thead>
        <tbody>
          {users?.map((item) => (
            <>
              <tr>
                <td>
                  <div className={styles.user}>
                    {item.image && (
                      <div className={styles.product}>
                        <Image
                          src={item.image || "/noproduct.jpg"}
                          alt=""
                          width={40}
                          height={40}
                          className={styles.productImage}
                        />
                      </div>
                    )}
                    {item.name}
                  </div>
                </td>
                <td>{item.email}</td>
                <td>
                  <span className={`${styles.status} ${styles.pending}`}>
                    Pending
                  </span>
                </td>
                <td>{item.createdAt.substring(0, 10)}</td>
                <td>{item.postCount}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
