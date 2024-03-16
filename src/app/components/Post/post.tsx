import { Post, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import styles from "./postPage.module.css"

interface PostsProps {
  posts: Array<Post & { author: User }>;
}

const Query = ({ posts }: PostsProps) => {
  return (
    <>
    <div className={styles.container}>
      {posts.map((post) => (
        <div key={post.id} className={styles.textContainer}>
          <div className={styles.imageContainer}>
            <Image
              src={post.author.image || ""} // Update to use 'image' property instead of 'imageUrl'
              alt="avatar"
              height={52}
              width={52}
              className={styles.image}
            />
          </div>
          <div className={styles.detail}>
            <Link href={`/posts/${post.slug}`} >{post.title}</Link>
            <div className={styles.desc} dangerouslySetInnerHTML={{ __html: post.desc.substring(0,60) }}/>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Query;
