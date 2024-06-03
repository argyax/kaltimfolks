"use server";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../components/ui/dashboard/posts/posts.module.css";
import Search from "../../../components/ui/dashboard/search/search";
import DeleteButton from "../../../components/ui/dashboard/delete/page";
import Pagination from "../../../components/ui/dashboard/pagination/pagination";
import { PrismaClient } from "@prisma/client";
// import { mydelete } from "./func.js";

function ClientUi(props) {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a post..." />
        <Link href="/write">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      {/* <Postclient /> */}
      <table className={styles.table}>
        <thead className={styles.titles}>
          <tr>
            <td>Title</td>
            {/*<td>Description</td>*/}
            <td>Created At</td>
            <td>Category</td>
            <td>Views</td>
          </tr>
        </thead>
        <tbody>
          {props.posts?.map((item) => (
            <tr key={item.id}>
              <td>
                {item.img && (
                  <div className={styles.product}>
                    <Link href={`/posts/${item.slug}`}>
                      <Image
                        src={item.img || "/noproduct.jpg"}
                        alt=""
                        width={40}
                        height={40}
                        className={styles.productImage}
                      />
                    </Link>
                    <Link href={`/posts/${item.slug}`}>
                      {item.title}
                    </Link>
                  </div>
                )}
              </td>
              {/*<td>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item?.desc.substring(0, 70),
                  }}
                />
                <Link href={`/posts/${item.slug}`}></Link>
                </td>*/}
              <td>
                <Link href={`/posts/${item.slug}`}>
                  {formatDate(item.createdAt)} {"  "}
                </Link>
              </td>
              <td className={styles.category}>
                <Link href={`/posts/${item.slug}`}>
                  {item.catSlug}
                </Link>
              </td>
              <td>
                <Link href={`/posts/${item.slug}`}>
                  {item.views}
                </Link>
              </td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/edit/${item.slug}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Edit
                    </button>
                  </Link>
                  <input type="hidden" name="id" value={item.slug} />
                  <DeleteButton value={item.slug} />
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
