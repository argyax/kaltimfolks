import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ item }) => {
  return (
    <Link href={`/posts/${item.slug}`}>
      <div className={styles.container} key={item.id}>
        {item.img && (
          <div className={styles.imageContainer}>
            <Image src={item.img} alt="" fill className={styles.image} />
          </div>
        )}
        <div className={styles.textContainer}>
          <div className={styles.detail}>
            <span className={styles.date}>
              {item.createdAt.substring(0, 10)} {" "}
            </span>
            <span className={styles.category}>{item.catSlug}</span>
          </div>
          <h3 className={styles.title}> {item.title}</h3>
          <div>
            <div className={styles.desc} dangerouslySetInnerHTML={{ __html: item?.desc.substring(0, 70) }} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;