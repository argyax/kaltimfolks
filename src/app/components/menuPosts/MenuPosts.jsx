import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./menuPosts.module.css"

const MenuPosts = ({ withImage, postId, item }) => {
  return (
    <div className={styles.items} key={postId}>
      <Link href={`/posts/${item.slug}`} className={styles.item}>
        <div className={styles.textContainer}>
          {item.img && (
            <div className={styles.imageContainer}>
              <Image src={item.img} alt="" fill className={styles.image} />
            </div>
          )}
          <div className={styles.postTitle}>
            <h3 className={styles.title}>{item.title}</h3>
          </div>
          <div className={styles.detail}>
            <span className={styles.date}>
              {item.createdAt.substring(0, 10)} | {" "}
            </span>
            <span className={styles.username}>{item.catSlug}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MenuPosts;
