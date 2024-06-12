import React from "react";
import styles from "./cardList.module.css";
import Pagination from "../Pagination/pagination";
import Card from "../Card/Card";
import Articles from "../Ads/articles/articles"

const getData = async (page, cat) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(
    `${baseUrl}/api/posts?page=${page}&cat=${cat || ""}&includeFollowerInsight=false`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
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
          <Card item={item} key={item.id} />
        ))}
      </div>
      <Pagination count={count} />
      <Articles />
    </div>
  );
};

export default CardList;
