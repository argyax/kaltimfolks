"use client"
import Image from "next/image";
import Link from "next/link";
import styles from "./headers.module.css"
import { useState, useEffect } from "react";
import { urlFor, client } from '../../../../lib/client';

const HeaderAds = () => {
  const [header, setHeaderAds] = useState([]);
  const [filterHeaderAds, setFilterHeaderAds] = useState([]);

  useEffect(() => {
    const query = '*[_type == "header"]';

    client.fetch(query).then((data) => {
      console.log('Works Data:', data); // Log works data
      setHeaderAds(data);
      setFilterHeaderAds(data);
    });
  }, []);

  return (
    <div className={styles.items}>
      {filterHeaderAds.map((headerAds) => (
        <Link href={headerAds.adsLink} target="_blank" rel="noreferrer" className={styles.item}>
          <div className={styles.textContainer}>
              {headerAds.imgUrl && (
                <div className={styles.imageContainer}>
                  <Image
                    src={urlFor(headerAds.imgUrl.asset._ref).url()} // Assuming 'asset' contains the 'url' property
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

export default HeaderAds;