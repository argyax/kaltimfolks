"use client"
import Image from "next/image";
import Link from "next/link";
import styles from "./menuAdsUp.module.css"
import { useState, useEffect } from "react";
import { urlFor, client } from '../../../../lib/client';

const MenuAdsUp = () => {
  const [menuAds, setMenuAdsUp] = useState([]);
  const [filterMenuAdsUp, setFilterMenuAdsUp] = useState([]);

  useEffect(() => {
    const query = '*[_type == "menuadsup"]';

    client.fetch(query).then((data) => {
      console.log('Works Data:', data); // Log works data
      setMenuAdsUp(data);
      setFilterMenuAdsUp(data);
    });
  }, []);

  return (
    <div className={styles.items}>
      {filterMenuAdsUp.map((menuAdsUp) => (
        <Link href={menuAdsUp.adsLink} target="_blank" rel="noreferrer" className={styles.item}>
          <div className={styles.textContainer}>
              {menuAdsUp.imgUrl && (
                <div className={styles.imageContainer}>
                  <Image
                    src={urlFor(menuAdsUp.imgUrl.asset._ref).url()} // Assuming 'asset' contains the 'url' property
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

export default MenuAdsUp;
