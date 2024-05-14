import Menu from "@/app/components/Menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/app/components/comments/Comments";

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const SinglePage = async ({ params }) => {
  const { slug } = params;

  const data = await getData(slug);

  return (
    <div className={styles.container}>

      {/*Header*/}
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>{data?.title}</h1>
            <div className={styles.user}>
              {data?.user?.image && (
                <div className={styles.userImageContainer}>
                  <Image src={data.user.image} alt="" fill className={styles.avatar} />
                </div>
              )}
              <div className={styles.userTextContainer}>
                <div className={styles.profileContainer}>
                  <p className={styles.metadata}>{data?.user.name}</p>
                  <p className={styles.metadata}>{data?.createdAt.substring(0, 10)}</p>
                </div>
                <p className={styles.metadata}>{data?.catSlug}</p>
              </div>
            </div>
            {data?.img && (
              <div className={styles.imageContainer}>
                <Image src={data.img} alt="" fill className={styles.image} />
              </div>
            )}
          </div>
          {/* End of Header*/}

          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />
          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;