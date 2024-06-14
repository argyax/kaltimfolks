"use client"
import Image from "next/image";
import Link from "next/link";
import styles from "./articles.module.css";
import { useState, useEffect } from "react";
import { urlFor, client } from '../../../../lib/client';

const Articles = () => {
  const [articlesAds, setArticlesAds] = useState([]);
  const [filterArticlesAds, setFilterArticlesAds] = useState([]);

  useEffect(() => {
    const query = '*[_type == "articlesads"]';

    client.fetch(query).then((data) => {
      console.log('Works Data:', data); // Log works data
      setArticlesAds(data);
      setFilterArticlesAds(data);
    });
  }, []);

  return (
    <div className={styles.items}>
      {filterArticlesAds.map((articlesAds) => (
        <Link href={articlesAds.adsLink} target="_blank" rel="noreferrer" className={styles.item}>
          <div className={styles.textContainer}>
              {articlesAds.imgUrl && (
                <div className={styles.imageContainer}>
                  <Image
                    src={urlFor(articlesAds.imgUrl.asset._ref).url()} // Assuming 'asset' contains the 'url' property
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

export default Articles;