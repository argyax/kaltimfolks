"use server";
import Image from "next/image";
import Link from "next/link";
import styles from "../../components/ui/dashboard/posts/posts.module.css";
import Search from "../../components/ui/dashboard/search/search";
import DeleteButton from "../../components/ui/dashboard/delete/page";
import Pagination from "../../components/ui/dashboard/pagination/pagination";
import { PrismaClient } from "@prisma/client";
// import { mydelete } from "./func.js";

function ClientUi(props) {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a post..." />
        <Link href="/dashboard/posts/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      {/* <Postclient /> */}
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Created At</td>
            <td>Category</td>
          </tr>
        </thead>
        <tbody>
          {props.posts?.map((item) => (
            <tr key={item.id}>
              <td>
                {item.img && (
                  <div className={styles.product}>
                    <Image
                      src={item.img || "/noproduct.jpg"}
                      alt=""
                      width={40}
                      height={40}
                      className={styles.productImage}
                    />
                    {item.title}
                  </div>
                )}
              </td>
              <td>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item?.desc.substring(0, 70),
                  }}
                />
                <Link href={`/posts/${item.slug}`}></Link>
              </td>
              <td>
                <Link href={`/posts/${item.slug}`}>
                  {item.createdAt?.toString().slice(4, 16)}
                </Link>
              </td>
              <td>{item.catSlug}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/posts/${item.slug}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <input type="hidden" name="id" value={item.slug} />
                  <Link href={`http://localhost:3000/api/posts/${item.slug}`}>
                    <DeleteButton value={item.slug} />
                  </Link>
                  {/* <button className={`${styles.button} ${styles.buttons}`}>
                    Delete
                  </button> */}
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

export default ClientUi;
