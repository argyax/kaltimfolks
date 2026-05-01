import Menu from "@/app/components/Menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/app/components/comments/Comments";
import PostDown from "../../components/Ads/postDown/postDown";
import PostUp from "../../components/Ads/postUp/postUp";

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch post: ${res.status}`);
  }

  return res.json();
};

const SinglePage = async ({ params }) => {
  const { slug } = params;
  const data = await getData(slug);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.textContainer}>
            <PostUp />

            <h1 className={styles.title}>{data?.title}</h1>

            <div className={styles.user}>
              {data?.user?.image && (
                <div className={styles.userImageContainer}>
                  <Image
                    src={data.user.image}
                    alt=""
                    fill
                    className={styles.avatar}
                  />
                </div>
              )}

              <div className={styles.userTextContainer}>
                <div className={styles.profileContainer}>
                  <p className={styles.metadata}>{data?.user?.name}</p>
                  <p className={styles.metadata}>
                    {formatDate(data.createdAt)}
                  </p>
                </div>
                <p className={styles.metadata}>{data?.catSlug}</p>
              </div>
            </div>

            {data?.img && (
              <div className={styles.imageContainer}>
                <Image
                  src={data.img}
                  alt=""
                  fill
                  className={styles.image}
                />
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />

          {/* 🔥 EDITORIAL */}
          {data?.editorial && (
            <div className={styles.editorial}>
              <h3 className={styles.editorialTitle}>Redaksi</h3>

              {data.editorial.director && (
                <p>
                  <strong>Pimpinan Redaksi:</strong>{" "}
                  {data.editorial.director}
                </p>
              )}

              {data.editorial.chief && (
                <p>
                  <strong>Redaktur Pelaksana:</strong>{" "}
                  {data.editorial.chief}
                </p>
              )}

              {data.editorial.reporters && (
                <p>
                  <strong>Reporter:</strong>{" "}
                  {data.editorial.reporters}
                </p>
              )}

              {data.editorial.editors && (
                <p>
                  <strong>Editor:</strong> {data.editorial.editors}
                </p>
              )}

              {data.editorial.phone && (
                <p>
                  <strong>Kontak:</strong> {data.editorial.phone}
                </p>
              )}

              {data.editorial.email && (
                <p>
                  <strong>Email:</strong> {data.editorial.email}
                </p>
              )}
            </div>
          )}

          {/* COMMENTS */}
          <div className={styles.comment}>
            <PostDown />
            <Comments postSlug={slug} />
          </div>
        </div>

        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;