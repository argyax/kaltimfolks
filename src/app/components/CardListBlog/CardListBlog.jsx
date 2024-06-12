import React from "react";
import styles from "./cardListBlog.module.css";
import Pagination from "../Pagination/pagination";
import Image from "next/image";
import CardBlog from "../CardBlog/CardBlog";

const getData = async (page, cat) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(
    `${baseUrl}/api/posts?page=${page}&cat=${cat || ""}&includeFollowerInsight=true`,
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

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Articles</h2>
      <div className={styles.posts}>
        {posts?.map((item) => (
          <CardBlog item={item} key={item._id} />
        ))}
      </div>
      <Pagination count={count} />
    </div>
  );
};

export default CardList;
