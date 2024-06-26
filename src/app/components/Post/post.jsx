import Image from "next/image";
import Link from "next/link";
import styles from "./postPage.module.css";

const Posts = ({ posts }) => {
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
    <div key={posts.id}>
      {posts.map((post) => (
        <Link href={`/posts/${post.slug}`} key={post.id}>
          <div className={styles.container}>
            {post.img && (
              <div className={styles.imageContainer}>
                <Image src={post.img} alt="" fill className={styles.image} />
              </div>
            )}
            <div className={styles.textContainer}>
              <div className={styles.textContainer}>
                <div className={styles.detail}>
                  <span className={styles.date}>
                    {formatDate(post.createdAt)} {"  "}
                  </span>
                  <span className={styles.category}>{post.catSlug}</span>
                </div>
                <h3>{post.title}</h3>
                <div
                  className={styles.desc}
                />
                <p>{sanitizeAndTrim(post.desc)}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
    // <div className={styles.container} key={posts.id}>
    //   {posts.map((post) => (
    //     <div key={post.id} className={styles.textContainer}>
    //       {post.img && (
    //         <div className={styles.imageContainer}>
    //           <Image src={post.img} alt="" fill className={styles.image} />
    //         </div>
    //       )}
    //       <div className={styles.textContainer}> 
    //         <div className={styles.detail}>
    //           <span className={styles.date}>
    //             {post.createdAt.slice(0, 10)} -{" "}
    //           </span>
    //           <span className={styles.category}>{post.catSlug}</span>
    //         </div>
    //         <Link href={`/posts/${post.slug}`}>
    //           <h1>{post.title}</h1>
    //         </Link>
    //         <div
    //           className={styles.desc}
    //           dangerouslySetInnerHTML={{ __html: post.desc.substring(0, 60) }}
    //         />
    //         <span>Author: {post.user?.name}</span>
    //         <Link href={`/posts/${post.slug}`} className={styles.link}>
    //           Read More
    //         </Link>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
};

export default Posts;