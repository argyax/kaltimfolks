import Menu from "../../components/Menu/Menu.jsx";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "../../components/comments/Comments.jsx";

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const SinglePage = async ({ searchParams, params, item}) => {
  const { slug } = params;

  const page = parseInt(searchParams.page) || 1;

  const data = await getData(slug);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.user}>
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image src={data.user.image} alt="" fill className={styles.avatar} />
              </div>
            )}
          <div className={styles.userTextContainer}>
            {data.user && (
              <span className={styles.username}>{data.user.name}</span>
            )}
            {data.post && data.post.createdAt && (
              <span className={styles.date}>{data.post.createdAt.substring(0, 10)} -{" "}</span>
            )}
          </div>
          </div>
        </div>
        {data?.img && (
          <div className={styles.imageContainer}>
            <Image src={data.img} alt="" fill className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: data?.desc || "" }}
        />
          <div className={styles.comment}>
            <Comments postSlug={slug}/>
          </div>
        </div>
        <Menu page={page}/>
      </div>
    </div>
  );
  
};

export default SinglePage;