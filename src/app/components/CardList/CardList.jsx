import React from "react";
import styles from "./cardList.module.css";
import Pagination from "../Pagination/pagination";
import Image from "next/image";
import Card from "../Card/Card";

const getData = async (page, cat) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(
    `${baseUrl}/api/posts?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

const CardList = async ({ page, cat }) => {
  const { posts, count } = await getData(page, cat);

  // const POST_PER_PAGE = 1;

  // const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  // const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Articles</h2>
      <div className={styles.posts}>
        {posts?.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
      <Pagination count={count} />
    </div>
  );
};

export default CardList;