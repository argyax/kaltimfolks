"use client"
import Image from "next/image";
import Link from "next/link";
import styles from "./menuAds.module.css"
import { useState, useEffect } from "react";
import { urlFor, client } from '../../../lib/client';

const MenuAds = () => {
  const [menuAds, setMenuAds] = useState([]);
  const [filterMenuAds, setFilterMenuAds] = useState([]);

  useEffect(() => {
    const query = '*[_type == "menuads"]';

    client.fetch(query).then((data) => {
      console.log('Works Data:', data); // Log works data
      setMenuAds(data);
      setFilterMenuAds(data);
    });
  }, []);

  return (
    <div className={styles.items}>
      {filterMenuAds.map((menuAds) => (
        <Link href={menuAds.adsLink} target="_blank" rel="noreferrer" className={styles.item}>
          <div className={styles.textContainer}>
              {menuAds.imgUrl && (
                <div className={styles.imageContainer}>
                  <Image
                    src={urlFor(menuAds.imgUrl.asset._ref).url()} // Assuming 'asset' contains the 'url' property
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

export default MenuAds;
