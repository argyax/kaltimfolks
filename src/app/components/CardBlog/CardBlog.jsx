import Image from "next/image";
import styles from "./cardBlog.module.css";
import Link from "next/link";

const CardBlog = ({ item }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  const sanitizeAndTrim = (htmlString) => {
    htmlString = htmlString.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
    let sanitizedText = htmlString.replace(/<[^>]*>?/gm, ' ').replace(/&nbsp;/g, ' ');

    sanitizedText = sanitizedText.slice(0, 150); // Limit to 90 characters

    sanitizedText = sanitizedText.trim().split(' ').slice(0, -1).join(' '); // Remove the last word

    if (sanitizedText.length < htmlString.length) {
      sanitizedText += ' ...';
    }

    return sanitizedText
  };

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
              {formatDate(item.createdAt)} {"  "}
            </span>
            <span className={styles.category}>{item.catSlug}</span>
          </div>
          <div className={styles.titleDesc}>
            <h3 className={styles.title}> {item.title}</h3>
            <div
              className={styles.desc}
            />
            <p>{sanitizeAndTrim(item.desc)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardBlog;