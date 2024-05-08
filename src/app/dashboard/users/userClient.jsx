"use server";
import Image from "next/image";
import Link from "next/link";
import styles from "../../components/ui/dashboard/posts/posts.module.css";
import Search from "../../components/ui/dashboard/search/search";
import DeleteUserButton from "../../components/ui/dashboard/delete/deleteUser";
import Pagination from "../../components/ui/dashboard/pagination/pagination";

function UserUi(props) {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for user" />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td></td>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Posts</td>
          </tr>
        </thead>
        <tbody>
          {props.users?.map((item) => (
            <tr key={item.id}>
              <td>
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
              </td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.createdAt?.toString().slice(4, 16)}</td>
              <td>{item.postCount}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/posts/${item.slug}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <input type="hidden" name="id" value={item.id} />
                  <Link href={`http://localhost:3000/api/users/${item.id}`}>
                    <DeleteUserButton value={item.id} />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={props.count} />
    </div>
  );
}

export default UserUi;
