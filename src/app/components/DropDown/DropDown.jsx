"use client"
import React from "react";
import { useState, useEffect } from "react";
import styles from "./dropDown.module.css";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import Link from "next/link";
// import { Montserrat } from 'next/font/google';

// const montserrat = Montserrat({ subsets: ['latin'] });

const CustomDropdown = () => {
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
    <Popover>
      <PopoverButton className={styles.btn}>
        Categories
      </PopoverButton>
      <PopoverPanel anchor="bottom" className={styles.bg}>
        {data?.map((item) => (
          <Link
            href={`/blog?cat=${item.slug}`}
            className={`${styles.categoryItem} ${styles[item.slug]}`}
            key={item.id}
          >
            {item.title}
          </Link>
        ))}
      </PopoverPanel>
    </Popover>
  );
};

export default CustomDropdown;
