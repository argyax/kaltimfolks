"use client"
import Image from "next/image";
import Link from "next/link";
import styles from "./postDown.module.css";
import { useState, useEffect } from "react";
import { urlFor, client } from '../../../../lib/client';

const PostDown = () => {
  const [postDown, setPostDown] = useState([]);
  const [filterPostDown, setFilterPostDown] = useState([]);

  useEffect(() => {
    const query = '*[_type == "postdown"]';

    client.fetch(query).then((data) => {
      console.log('Works Data:', data); // Log works data
      setPostDown(data);
      setFilterPostDown(data);
    });
  }, []);

  return (
    <div className={styles.items}>
      {filterPostDown.map((postDown) => (
        <Link href={postDown.adsLink} target="_blank" rel="noreferrer" className={styles.item}>
          <div className={styles.textContainer}>
              {postDown.imgUrl && (
                <div className={styles.imageContainer}>
                  <Image
                    src={urlFor(postDown.imgUrl.asset._ref).url()} // Assuming 'asset' contains the 'url' property
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

export default PostDown;