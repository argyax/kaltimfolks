import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ item }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  // Check if the category is "follower's insight" and skip fetching the post content
  const shouldFetchPostContent = item.catSlug !== "follower's insight";

  return (
    <Link href={`/posts/${item.slug}`}>
      <div className={styles.container} key={item.id}>
        {shouldFetchPostContent && (
          <>
            {item.img && (
              <div className={styles.imageContainer}>
                <Image src={item.imgw} alt="" fill className={styles.image} />
              </div>
            )}
            <div className={styles.textContainer}>
              <div className={styles.detail}>
                <span className={styles.date}>
                  {formatDate(item.createdAt)} {"  "}
                </span>
                <span className={styles.category}>{item.catSlug}</span>
              </div>
              <div className={styles.titleDesc}>
                <h3 className={styles.title}> {item.title}</h3>
                <div
                  className={styles.desc}
                  dangerouslySetInnerHTML={{ __html: item?.desc.substring(0, 90) }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default Card;
