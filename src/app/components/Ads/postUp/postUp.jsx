"use client"
import Image from "next/image";
import Link from "next/link";
import styles from "./postUp.module.css";
import { useState, useEffect } from "react";
import { urlFor, client } from '../../../../lib/client';

const PostUp = () => {
  const [postUp, setPostUp] = useState([]);
  const [filterPostUp, setFilterPostUp] = useState([]);

  useEffect(() => {
    const query = '*[_type == "postup"]';

    client.fetch(query).then((data) => {
      console.log('Works Data:', data); // Log works data
      setPostUp(data);
      setFilterPostUp(data);
    });
  }, []);

  return (
    <div className={styles.items}>
      {filterPostUp.map((postUp) => (
        <Link href={postUp.adsLink} target="_blank" rel="noreferrer" className={styles.item}>
          <div className={styles.textContainer}>
              {postUp.imgUrl && (
                <div className={styles.imageContainer}>
                  <Image
                    src={urlFor(postUp.imgUrl.asset._ref).url()} // Assuming 'asset' contains the 'url' property
                    fill
                    className={styles.image}
                    unoptimized={true}
                  />
                </div>
              )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostUp;