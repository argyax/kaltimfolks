import React from "react";
import styles from "./menu.module.css";
import Link from "next/link";
import Image from "next/image";
import MenuPosts from "../menuPosts/MenuPosts";
import MenuCategories from "../menuCategories/MenuCategories";

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

const Menu = async ({ page, cat}) => {
  const { posts, count } = await getData(page, cat);

  // Slice the posts array to display only 4 recent articles
  const slicedPosts = posts?.slice(0, 4);

  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>Discover by topic</h2>
      <h1 className={styles.title}>Categories</h1>
      <MenuCategories />
      <h2 className={styles.subtitle}>{"What's hot"}</h2>
      <h1 className={styles.title}>Recent Articles</h1>
      {slicedPosts?.map((item, index) => (
        <MenuPosts withImage={true} postId={item._id} item={item} key={index}/>
      ))}
    </div>
  );
};

export default Menu;
