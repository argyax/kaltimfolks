import React from "react";
import styles from "./cardList.module.css";
import Pagination from "../Pagination/pagination";
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

  // Filter out posts with the category "follower's insight"
  const filteredPosts = posts.filter(post => post.catSlug !== "follower's insight");

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Articles</h2>
      <div className={styles.posts}>
        {filteredPosts?.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
      <Pagination count={count} />
    </div>
  );
};

export default CardList;
