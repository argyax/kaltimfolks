import styles from "./contentItem.module.css";
import Image from "next/image";

const ContentItem = ({ srcImg, title, description, direction = "row" }) => {
  return (
    <div className={styles["container"]} style={{ flexDirection: direction }}>
      <Image
        className={styles.img}
        src={srcImg}
        alt=""
        width={320}
        height={478}
      />
      <div className={styles["text-content"]}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ContentItem;
