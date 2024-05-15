import React from "react";
import styles from "./menu.module.css";
import MenuPosts from "../menuPosts/MenuPosts";
import MenuCategories from "../menuCategories/MenuCategories";

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

const Menu = async ({ page, cat }) => {
  const { posts, count } = await getData(page, cat);

  // Slice the posts array to display only 4 recent articles
  const slicedPosts = posts?.slice(0, 3);

  return (
    <div className={styles.container}>
      <span className={styles.subtitle}>Discover by topic</span>
      <h2 className={styles.title}>Categories</h2>
      <MenuCategories />
      <span className={styles.subtitle}>{"What's hot"}</span>
      <h2 className={styles.title}>Recent Articles</h2>
      {slicedPosts?.map((item, index) => (
        <MenuPosts withImage={true} postId={item._id} item={item} key={index} />
      ))}
    </div>
  );
};

export default Menu;
