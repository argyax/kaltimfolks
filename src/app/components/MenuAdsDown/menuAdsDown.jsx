"use client"
import Image from "next/image";
import Link from "next/link";
import styles from "./MenuAdsDown.module.css"
import { useState, useEffect } from "react";
import { urlFor, client } from '../../../lib/client';

const MenuAdsDown = () => {
  const [menuAdsDown, setMenuAdsDown] = useState([]);
  const [filterMenuAdsDown, setFilterMenuAdsDown] = useState([]);

  useEffect(() => {
    const query = '*[_type == "menuadsdown"]';

    client.fetch(query).then((data) => {
      console.log('Works Data:', data); // Log works data
      setMenuAdsDown(data);
      setFilterMenuAdsDown(data);
    });
  }, []);

  return (
    <div className={styles.items}>
      {filterMenuAdsDown.map((menuAdsDown) => (
        <Link href={menuAdsDown.adsLink} target="_blank" rel="noreferrer" className={styles.item}>
          <div className={styles.textContainer}>
              {menuAdsDown.imgUrl && (
                <div className={styles.imageContainer}>
                  <Image
                    src={urlFor(menuAdsDown.imgUrl.asset._ref).url()} // Assuming 'asset' contains the 'url' property
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

export default MenuAdsDown;
