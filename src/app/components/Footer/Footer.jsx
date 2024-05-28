"use client"
import React from "react";
import { useEffect, useState } from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from 'react-icons/fa6'

const Footer = () => {

  const [data, setData] = useState([]);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/categories`, {
          cache: "reload",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await res.json();
        const filteredData = jsonData.filter(item => item.slug !== "follower's insight");
        setData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Contacts</span>
          <div className={styles.list}>
            <Link href="tel:+6283152659353">+62831-5265-9353</Link>
            <Link href="mailto:information.kaltimfolks@gmail.com">information.kaltimfolks@gmail.com</Link>
          </div>
        </div>
        <div className={styles.logo}>
          <h1>
            <Link href="/" className={styles.logo}>KALTIMFOLKS.</Link>
          </h1>
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Category</span>
          {data.map((item) => (
            <Link
              href={`/blog?cat=${item.slug}`}
              className={`${styles.categoryItem} ${styles[item.slug]}`}
              key={item._id}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className={styles.list2}>
          <span className={styles.listTitle}>Follow Us</span>
          <div className={styles.icons}>
            <Link href="https://www.instagram.com/kaltimfolks/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram size={24} /></Link>
            <Link href="https://x.com/kaltimfolks" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaXTwitter size={24} /></Link>
            <Link href="https://www.tiktok.com/@kaltimfolks" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><FaTiktok size={24} /></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
